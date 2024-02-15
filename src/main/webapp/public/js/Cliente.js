const clienteTableId = "#clienteTable";
const clienteTable = $(clienteTableId);

// Datos del cliente
let nombreCliente = $("#nombreCliente");
let direccion = $("#Direccion");
let telefono = $("#Telefono");
let email = $("#Email");

document.addEventListener("DOMContentLoaded" , ()=>{
    
    let ultimoElemento = document.querySelector(".filters").lastElementChild;
    
    ultimoElemento.classList.add("d-none");
    
    GetClientes();
});

const GetClientes = () =>{
    axios.get('/lab01/Cliente')
    .then(function (response) {

        console.log(response);

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

                
        console.log(cliente);

        $(clienteTable).DataTable()
        .row.add([
            cliente.nombreCliente,
            cliente.direccion,
            cliente.telefono,
            cliente.email,
             `
                <div class="btn-group text-center">
                    <button class="btn btn-primary">Actualizar</button>
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
        if(data.length != 0){
             Swal.fire(
                '¡Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              );
                return;
            }

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