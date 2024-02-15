const pedidoTablaId = "#pedidoTabla";
const pedidoTabla = $(pedidoTablaId);
let clienteId = $("#clientes");
let fecha = $("#fecha");
let total = $("#total");
let estado = $("#estado");


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
                    <button class="btn btn-primary">Actualizar</button>
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
        
        $("#clientes").val("").trigger();
        $("#estado").val("").trigger();
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
            GetPedidos()();
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error); // Manejar errores
        });

        hiddeLoader();
        
        
      }
    });
}