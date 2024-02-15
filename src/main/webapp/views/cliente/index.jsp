<%@page contentType="text/html" pageEncoding="UTF-8"%><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Lab01 - Clientes</title>
    
   <jsp:include page="/layout/css.jsp" />
    
  </head>
  <body>
      
    <jsp:include page="/layout/navbar.jsp" />
    
    <div class="container pt-4">
        <h1>Clientes</h1>
        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" id="closeModal" data-bs-target="#addModal">
            Agregar
        </button>
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
    
   <!-- Modal agregar -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar cliente</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <form action="/practica02/Instituto" method="POST" >
                  <div class="mt-2 mb-3">
                      <label class="text-muted fw-bold" for="nombreCliente">Nombre </label>
                      <input type="text" class="form-control" placeholder="Nombre del cliente" name="nombreCliente" id="nombreCliente" required>
                  </div>
                  <div class="mt-2 mb-3">
                      <label class="text-muted fw-bold" for="Direccion">Dirección </label>
                      <input type="text" class="form-control" placeholder="Direccion" name="Direccion" id="Direccion" required>
                  </div>
                  <div class="mt-2 mb-3">
                      <label class="text-muted fw-bold" for="Telefono">Telefono </label>
                      <input type="text" class="form-control" pattern="\d{4}-\d{4}" placeholder="Telefono" name="Telefono" id="Telefono" required>
                  </div>
                  <div class="mt-2 mb-3">
                      <label class="text-muted fw-bold" for="Email">Email </label>
                      <input type="email" class="form-control" placeholder="Email" name="Email" id="Email" required>
                  </div>
                  <div class="mt-2 mb-3">
                      <button type="button" id="btnAdd" class="btn btn-primary btn-sm">Agregar</button>
                  </div>
              </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    
   <!-- Update modal -->
     <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Actualizar cliente</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
                 <div class="mt-2 mb-3">
                  <input type="hidden"  name="idUpdate" id="idUpdate" required>
                </div>
                <div class="mt-2 mb-3">
                  <label class="text-muted fw-bold" for="nombreCliente">Nombre </label>
                  <input type="text" class="form-control"  name="clienteUpdate" id="clienteUpdate" required>
                </div>
                <div class="mt-2 mb-3">
                    <label class="text-muted fw-bold" for="Direccion">Dirección </label>
                    <input type="text" class="form-control"  name="direccionUpdate" id="direccionUpdate" required>
                </div>
                <div class="mt-2 mb-3">
                    <label class="text-muted fw-bold" for="Telefono">Telefono </label>
                    <input type="text" class="form-control"  name="telefonoUpdate" id="telefonoUpdate" required>
                </div>
                <div class="mt-2 mb-3">
                    <label class="text-muted fw-bold" for="Email">Email </label>
                    <input type="email" class="form-control"  name="emailUpdate" id="emailUpdate" required>
                </div>
                <div class="mt-2 mb-3">
                    <button type="button" id="btnUpdate" class="btn btn-primary btn-sm">Actualizar</button>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
   
   
    <jsp:include page="/layout/js.jsp" />
   
    <script>
        initDataTable("#clienteTable");
    </script>
    
    <script src="../../public/js/Cliente.js" type="text/javascript"></script>
  </body>
</html>