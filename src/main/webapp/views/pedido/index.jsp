<%@page contentType="text/html" pageEncoding="UTF-8"%><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Practica02 - Pedidos</title>
    
   <jsp:include page="/layout/css.jsp" />
    
  </head>
  <body>
      
    <jsp:include page="/layout/navbar.jsp" />
    
    <div class="container pt-4">
        <h1>Pedidos</h1>
        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" id="closeModal" data-bs-target="#addModal">
            Agregar
        </button>
       
        <div class="table-responsive">
            <table class="table table-striped table-bordered text-nowrap" id="pedidoTabla">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    
   <!-- Modal agregar -->
    <div class="modal fade" id="addModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar pedidos</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <form action="/practica02/Instituto" method="POST" >
                  <div class="mt-2 mb-3">
                      <label class="text-muted fw-bold" for="cliente">Cliente </label>
                        <select id="clientes" class="form-control" style="width: 100%;">
                            <option value="">Seleccionar ...</option>
                        </select>
                  </div>
                  <div class="mt-2 mb-3">
                      <label class="text-muted fw-bold" for="fecha">Fecha </label>
                      <input type="date" class="form-control" placeholder="fecha" name="fecha" id="fecha" required>
                  </div>
                  <div class="mt-2 mb-3">
                      <label class="text-muted fw-bold" for="Telefono">Total </label>
                      <input type="number" class="form-control" min="0" step="0.01" placeholder="0.00" name="total" id="total" required>
                  </div>
                  <div class="mt-2 mb-3">
                      <label class="text-muted fw-bold" for="estado">Estado </label>
                        <select id="estado" class="form-control w-100">
                           <option value="">Seleccionar ...</option>
                           <option value="0">Entregado</option>
                           <option value="1">En espera</option>
                       </select>
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
    
    <jsp:include page="/layout/js.jsp" />
   
    <script>
        
        initDataTable("#pedidoTabla");
       
        $(document).ready(function() {
            $("#clientes").select2({
                dropdownParent: $("#addModal"),
                ajax: {
                    url: '/lab01/Cliente', // URL donde enviar la solicitud AJAX para recuperar datos
                    dataType: 'json',
                    processResults: function(data) {
                        var formattedData = data.map(function(item) {
                            return {
                                id: item.clienteId,
                                text: item.nombreCliente
                            };
                        });
                        return {
                            results: formattedData
                        };
                    },
                    cache: true // Cache para reducir el número de solicitudes
                }
            });
        });

        
    </script>
    
    <script src="../../public/js/Pedidos.js" type="text/javascript"></script>
  </body>
</html>