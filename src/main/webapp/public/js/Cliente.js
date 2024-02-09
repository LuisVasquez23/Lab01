const clienteTableId = "#clienteTable";
const clienteTable = $(clienteTableId);

document.addEventListener("DOMContentLoaded" , ()=>{
    
    let ultimoElemento = document.querySelector(".filters").lastElementChild;
    
    ultimoElemento.classList.add("d-none");
    
    GetClientes();
});

const GetClientes = () =>{
    axios.get('/lab01/Cliente')
    .then(function (response) {
        console.log(response)
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
        $(clienteTable).DataTable()
        .row.add([
            cliente.nombreCliente,
            cliente.direccion,
            cliente.telefono,
            cliente.email,
             `
                <div class="btn-group text-center">
                    <button class="btn btn-primary">Actualizar</button>
                    <button class="btn btn-danger">Eliminar</button>
                <div>
            `
        ]).draw();
    });
    
}