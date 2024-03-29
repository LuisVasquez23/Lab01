const clienteTableId = "#clienteTable";
const clienteTable = $(clienteTableId);
const updateModal = $("#updateModal");

// Datos del cliente
let nombreCliente = $("#nombreCliente");
let direccion = $("#Direccion");
let telefono = $("#Telefono");
let email = $("#Email");

let clienteUpdate = $("#clienteUpdate");
let direccionUpdate = $("#direccionUpdate");
let telefonoUpdate = $("#telefonoUpdate");
let emailUpdate = $("#emailUpdate")
let idUpdate = $("#idUpdate");

document.addEventListener("DOMContentLoaded" , ()=>{
    
    let ultimoElemento = document.querySelector(".filters").lastElementChild;
    
    ultimoElemento.classList.add("d-none");
    
    GetClientes();
});

const GetClientes = () =>{
    axios.get('/lab01/Cliente')
    .then(function (response) {
        RenderTableData(response);
    })
    .then(function(){
         setTimeout(()=>{
            hiddeLoader();
        },1000);
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

const RenderTableData = ({data})=>{
    
    $(clienteTable).DataTable().clear().draw();

    data.forEach( (cliente) =>{
        
       let clienteUpdate = {
           id: cliente.clienteId,
           nombre:  cliente.nombreCliente,
           direccion: cliente.direccion,
           telefono : cliente.telefono,
           email : cliente.email
       }
        
        $(clienteTable).DataTable()
        .row.add([
            cliente.nombreCliente,
            cliente.direccion,
            cliente.telefono,
            cliente.email,
             `
                <div class="btn-group text-center">
                    <button class="btn btn-primary" onclick="UpdateCliente(${cliente.clienteId} ,'${cliente.nombreCliente}' , '${cliente.direccion}' , '${cliente.telefono}' ,'${cliente.email}' )">Actualizar</button>
                    <button class="btn btn-danger" onclick="DeleteCliente(${cliente.clienteId})">Eliminar</button>
                <div>
            `
        ]).draw();

    });
    
}

$("#btnAdd").click(function(){
    
    if(!ValidateInputs()){
        return;
    }
    
    // Obtener los valores a enviar
    let nombreC = nombreCliente.val();
    let direccionC = direccion.val();
    let telefonoC = telefono.val();
    let emailC = email.val();
        
    fetch("/lab01/Cliente", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nombre=${nombreC}&direccion=${direccionC}&telefono=${telefonoC}&email=${emailC}`
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        
        if(data.length != 0){
            Swal.fire({
                title: '¡Agregado!',
                text: '¡El cliente se agrego correctamente!',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });
            return;
        }
        
         Swal.fire({
            title: '¡Error!',
            text: '¡Cliente duplicado!',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        
    })
    .then(function(){
        GetClientes();
        
        nombreCliente.val("");
        direccion.val("");
        telefono.val("");
        email.val("");
        
        $('#addModal').modal('hide');
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error); // Manejar errores
    });
    
    hiddeLoader();
    
});

const ValidateInputs = () =>{
    
    let valido = false;
    
    if(nombreCliente.val() == ""){
        showAlert("El nombre esta vacio","Cuidado","warning");
        return valido;
    }
    
    if(direccion.val() == ""){
        showAlert("La direccion esta vacio","Cuidado","warning");
        return valido;
    }
    
    if(telefono.val() == ""){
        showAlert("El telefono esta vacio","Cuidado","warning");
        return valido;
    }
    
    if(!validarTelefono(telefono.val())){
        showAlert("El telefono no tiene el formato correcto xxxx-xxxx","Cuidado","warning");
        return valido;
    }
    
    if(email.val() == ""){
        showAlert("El email esta vacio","Cuidado","warning");
        return valido;
    }
    
    return true;
}

function showAlert(message,title, type) {
    Swal.fire({
        title:title,
        text: message,
        icon: type,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    });
}

function validarTelefono(telefono) {
    
    // Eliminamos espacios en blanco y guiones si están presentes
    var telefonoSinFormato = telefono.replace(/\s/g, "").replace(/-/g, "");
    
    // Verificamos si el número de teléfono tiene exactamente 8 dígitos
    if (telefonoSinFormato.length === 8 && !isNaN(telefonoSinFormato)) {
        return true;
    } else {
        return false;
    }
}

const DeleteCliente = (idCliente)=>{
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Una vez eliminado, no podrás recuperar este registro.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        fetch(`/lab01/Cliente?id=${idCliente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) 
    .then(data => {
            console.log(data.length)
            if(data.length != 0){
             Swal.fire(
                '¡Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              );
                return;
            }
            
            Swal.fire({
                title: '¡Error!',
                text: '¡No se puede eliminar el cliente!',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });

        })
        .then(function(){
            GetClientes();
            $('#addModal').modal('hide');
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error); // Manejar errores
        });

        hiddeLoader();
        
        
      }
    });
}

function UpdateCliente(id , nombre , direccion , telefono , email) {
    
    idUpdate.val(id);
    clienteUpdate.val(nombre);
    direccionUpdate.val(direccion);
    telefonoUpdate.val(telefono);
    emailUpdate.val(email);
    
    $('#updateModal').modal('show');
}

$("#btnUpdate").click(function(){
    
    // Obtener los valores a enviar
    let nombreC = clienteUpdate.val();
    let direccionC = direccionUpdate.val();
    let telefonoC = telefonoUpdate.val();
    let emailC = emailUpdate.val();
    let id = idUpdate.val();
    
    console.log(nombreC , direccionC , telefonoC , emailC , id)
    
    fetch(`/lab01/Cliente?id=${id}&nombre=${nombreC}&direccion=${direccionC}&telefono=${telefonoC}&email=${emailC}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        
        if(data.length != 0){
            Swal.fire({
                title: '¡Actualizado!',
                text: '¡El cliente se actualizo correctamente!',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });
            return;
        }
         Swal.fire({
            title: '¡Error!',
            text: '¡No se pudo actualizar el cliente!',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        
    })
    .then(function(){
        GetClientes();
        
        clienteUpdate.val("");
        direccionUpdate.val("");
        telefonoUpdate.val("");
        emailUpdate.val("");
        idUpdate.val("");
        
        $('#updateModal').modal('hide');
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error); // Manejar errores
    });
    
    hiddeLoader();
    
});
