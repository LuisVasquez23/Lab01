const pedidoTableId = "#pedidoTable";
const pedidoTable = $(pedidoTableId);

// Datos del pedido
let nombreCliente = $("#cliente");
let fecha = $("#fecha");
let total = $("#total");
let estado = $("#estado");

document.addEventListener("DOMContentLoaded" , ()=>{
    
    let ultimoElemento = document.querySelector(".filters").lastElementChild;
    
    ultimoElemento.classList.add("d-none");
    
    GetPedidos();
});

const GetPedidos = () => {
    axios.get('/Lab01/Pedido')
    .then(function (response) {
        RenderTableData(response.data);
    })
    .then(function(){
        setTimeout(() => {
         
        }, 1000);
    })
    .catch(function (error) {
        console.log(error);
    });
}

const RenderTableData = (data) => {
    $(pedidoTable).DataTable().clear().draw();

    data.forEach((pedido) => {
        $(pedidoTable).DataTable()
        .row.add([
            pedido.id_cliente,
            pedido.fecha,
            pedido.total,
            pedido.estado,
            `
            <div class="btn-group text-center">
                <button class="btn btn-primary">Actualizar</button>
                <button class="btn btn-danger" onclick="DeletePedido(${pedido.id})">Eliminar</button>
            </div>
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
    let fechaC = fecha.val();
    let totalC = total.val();
    let estadoC = estado.val();
        
    fetch("/Lab01/Pedido", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nombre=${nombreC}&fecha=${fechaC}&total=${totalC}&estado=${estadoC}`
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        if(data.length != 0){
            Swal.fire({
                title: '¡Agregado!',
                text: '¡El pedido se agrego correctamente!',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });
            return;
        }
         Swal.fire({
            title: '¡Error!',
            text: '¡Pedido duplicado!',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        
    })
    .then(function(){
        GetPedidos();
        
        nombreCliente.val("");
        fecha.val("");
        total.val("");
        estado.val("");
        
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
    
    if(fecha.val() == ""){
        showAlert("La fecha esta vacia","Cuidado","warning");
        return valido;
    }
    
    if(total.val() == ""){
        showAlert("El total esta vacio","Cuidado","warning");
        return valido;
    }
    
    if(estado.val() == ""){
        showAlert("El estado esta vacio","Cuidado","warning");
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

const DeletePedido = (idPedido)=>{
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
        
        fetch(`/Lab01/Pedido?id=${idPedido}`, {
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
            GetPedidos();
            $('#addModal').modal('hide');
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error); // Manejar errores
        });

        hiddeLoader();
        
        
      }
    });
}