 <!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" 
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

<link rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.21/css/dataTables.bootstrap.min.css" 
      integrity="sha512-BMbq2It2D3J17/C7aRklzOODG1IQ3+MHw3ifzBHMBwGO/0yUqYmsStgBjI0z5EYlaDEFnvYV7gNYdD3vFLRKsA==" 
      crossorigin="anonymous" referrerpolicy="no-referrer" />

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.5/dist/sweetalert2.all.min.js"></script>

 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
 
 <link rel="stylesheet" href="http://localhost:8080/lab01/public/css/style.css"/>
 
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

<style>



    /* Desactivar los estilos de las flechas de ordenamiento en el encabezado */
    table.dataTable thead .sorting:after,
    table.dataTable thead .sorting_asc:after,
    table.dataTable thead .sorting_desc:after,
    table.dataTable thead .sorting_asc_disabled:after,
    table.dataTable thead .sorting_desc_disabled:after {
        content: "\2193 \2191";
    }

    /* Asegúrate de que los estilos del fondo de la columna de ordenamiento se desactiven */
    thead .sorting, 
    thead .sorting_asc, 
    thead .sorting_desc, 
    thead .sorting_asc_disabled,
    thead .sorting_desc_disabled {
        background-image: none !important;
    }
    
    .loader-container{
        width: 100%;
        height: 100%;
        max-height: 100vh;
        min-height: 100vh;
        position: absolute;
        background: #e8e8e8a6;
        top: 0;
        bottom:0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .loader {
      width: 48px;
      height: 48px;
      border: 3px solid #FFF;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }


    .loader::after {
        content: '';  
      box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-bottom-color: #FF3D00;
    }
    
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }



</style>