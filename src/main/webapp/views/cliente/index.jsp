<%@page contentType="text/html" pageEncoding="UTF-8"%><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Practica02</title>
    
   <jsp:include page="/layout/css.jsp" />
    
  </head>
  <body>
      
    <jsp:include page="/layout/navbar.jsp" />
    
    <div class="container pt-4">
        <h1>Clientes</h1>
        <div class="table-responsive">
            <table class="table table-striped table-bordered text-nowrap" id="clienteTable">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    
   
    
    <jsp:include page="/layout/js.jsp" />
   
    <script>
        initDataTable("#clienteTable");
    </script>
    
    <script src="../../public/js/Cliente.js" type="text/javascript"></script>
  </body>
</html>