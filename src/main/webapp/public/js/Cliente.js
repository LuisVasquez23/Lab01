const clienteTableId = "#clienteTable";
const clienteTable = $(clienteTableId);

document.addEventListener("DOMContentLoaded" , ()=>{
    
    let ultimoElemento = document.querySelector(".filters").lastElementChild;
    
    ultimoElemento.classList.add("d-none");
    
    GetClientes();
});

const GetClientes = () =>{
    axios.get('/Lab01/Cliente')
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
    });
    
}