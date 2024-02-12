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
        <h1>Pedidos</h1>
        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" id="closeModal" data-bs-target="#addModal">
            Agregar
        </button>
        <div class="table-responsive">
            <table class="table table-striped table-bordered text-nowrap" id="pedidoTable">
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
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar pedido</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <form action="/Lab01/Pedido" method="POST" >
                  <div class="mt-2 mb-3">
                        <label class="text-muted fw-bold" for="cliente">Cliente</label>
                        <select class="form-control" name="cliente" id="cliente" required>
                           
                         
                          
                        </select>
                    </div>
                    <div class="mt-2 mb-3">
                        <label class="text-muted fw-bold" for="fecha">Fecha</label>
                        <input type="date" class="form-control" name="fecha" id="fecha" required>
                    </div>
                    <div class="mt-2 mb-3">
                        <label class="text-muted fw-bold" for="total">Total</label>
                        <input type="number" class="form-control" placeholder="Total" name="total" id="total" required>
                    </div>
                    <div class="mt-2 mb-3">
                        <label class="text-muted fw-bold" for="estado">Estado</label>
                        <select class="form-control" name="estado" id="estado" required>
                          
                            <option value="1">Pendiente</option>
                            <option value="2">Pagado</option>
                            <option value="3">Cancelado</option>
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
    <script src="../../public/js/Pedido.js" type="text/javascript"></script>
    <script>
        initDataTable("#pedidoTable", {"columns": [
        { "width": "90%" }, // Columna para el nombre del instituto
        { "width": "10%" } // Columna para los botones
    ]});
    </script>
  </body>
</html>