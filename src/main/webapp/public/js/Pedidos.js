const pedidoTablaId = "#pedidoTabla";
const pedidoTabla = $(pedidoTablaId);

let clienteId = $("#clientes");
let fecha = $("#fecha");
let total = $("#total");
let estado = $("#estado");

let clientesUpdate = $("#clientesUpdate");
let fechaUpdate = $("#fechaUpdate");
let totalUpdate = $("#totalUpdate");
let estadoUpdate = $("#estadoUpdate");
let idUpdate = $("#id");


document.addEventListener("DOMContentLoaded" , ()=>{
    
    let ultimoElemento = document.querySelector(".filters").lastElementChild;
    
    ultimoElemento.classList.add("d-none");
    
    GetPedidos();
});

const GetPedidos = () =>{
    axios.get('/lab01/Pedido')
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
    
    $(pedidoTabla).DataTable().clear().draw();
    

    data.forEach( (pedido) =>{
        
        let dateString =  pedido.fecha;
        let dateObj = new Date(dateString);
        
        let formattedDate = dateObj.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            separator: '/'
          });
        
        $(pedidoTabla).DataTable()
        .row.add([
            pedido.nombreCliente,
            formattedDate,
            `$ ${pedido.total.toFixed(2)}`,
            getBadgeHtml(pedido.estado),
             `
                <div class="btn-group text-center">
                    <button class="btn btn-primary" onclick="UpdatePedido(${pedido.id} ,'${pedido.id_cliente}' , '${pedido.fecha}' , '${pedido.total}' ,'${pedido.estado}' )">Actualizar</button>
                    <button class="btn btn-danger" onclick="DeletePedido(${pedido.id})">Eliminar</button>
                <div>
            `
        ]).draw();

    });
    
}

$("#btnAdd").click(function(){
    
    fetch("/lab01/Pedido", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `cliente=${clienteId.val()}&fecha=${fecha.val()}&total=${total.val()}&estado=${estado.val()}`
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        
        if(data.length != 0){
            Swal.fire({
                title: '¡Pedido!',
                text: '¡El Pedido se agrego correctamente!',
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
        $('#addModal').modal('hide');
        
        $("#clientes").val("").trigger('change');
        $("#estado").val("").trigger('change');
        $("#fecha").val("");
        $("#total").val("");
        
        
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error); // Manejar errores
    });
    
    
    hiddeLoader();
    
});

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

function getBadgeHtml(estado) {
  let badgeHtml = '';

  if (estado === 0) {
    badgeHtml = '<span class="badge badge-success text-success">Entregado</span>';
  } else if (estado === 1) {
    badgeHtml = '<span class="badge badge-warning text-warning">En espera</span>';
  } 

  return badgeHtml;
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
        
        fetch(`/lab01/Pedido?id=${idPedido}`, {
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
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error); // Manejar errores
        });

        hiddeLoader();
        
        
      }
    });
}

function UpdatePedido(id , idCliente , fecha , total , estado) {
 
    idUpdate.val(id);
    fechaUpdate.val(fecha)
    estadoUpdate.val(estado);
    totalUpdate.val(total);
    initSelect2(idCliente);
    
    $('#updateModal').modal('show');
    
    
}

function initSelect2 (id ){
    $.ajax({
    url: '/lab01/Cliente',
    dataType: 'json',
    success: function(data) {
        // Formatea los datos en el formato requerido por select2
        var formattedData = data.map(function(item) {
            return {
                id: item.clienteId,
                text: item.nombreCliente
            };
        });

        // Inicializa select2 y pasa los datos formateados
        $("#clientesUpdate").select2({
            dropdownParent: $("#updateModal"),
            data: formattedData // Pasa los datos ya formateados
        });

        // Establece el valor predeterminado seleccionado
        $("#clientesUpdate").val(id).trigger('change');
    }
});
    
}

$("#btnUpdate").click(function(){
    
    // Obtener los valores a enviar
    let idCliente = clientesUpdate.val();
    let fecha = fechaUpdate.val();
    let total = totalUpdate.val();
    let estado = estadoUpdate.val();
    let id = idUpdate.val();
    
    
    fetch(`/lab01/Pedido?id=${id}&idCliente=${idCliente}&fecha=${fecha}&total=${total}&estado=${estado}`, {
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
                text: '¡El pedido se actualizo correctamente!',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });
            return;
        }
         Swal.fire({
            title: '¡Error!',
            text: '¡No se pudo actualizar el pedido!',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        
    })
    .then(function(){
        GetPedidos();
        
        clientesUpdate.val("");
        fechaUpdate.val("");
        totalUpdate.val("");
        estadoUpdate.val("");
        idUpdate.val("");
        
        $('#updateModal').modal('hide');
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error); // Manejar errores
    });
    
    hiddeLoader();
    
});
