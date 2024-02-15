<%@page import="com.google.gson.JsonArray"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Graficas</title>
    
   <jsp:include page="/layout/css.jsp" />
    
   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
      
    <jsp:include page="/layout/navbar.jsp" />
    
     <main class="d-flex w-100 mb-5 mt-5">     
         <div class="container d-flex flex-column">
             
             <div class="container-fluid p-0 mt-5">
    <div class="row">
    
     
            <div class="col-md-6">
                <h3 class="text-center mt-1 mb-2">Cantidad de pedidos por año</h3>
                    <div class="chart-container">
                        <canvas id="graficaMesesConMasPedidos" width="600" height="400"></canvas>
                    </div>

            </div>
        
        <div class="col-md-6">
                 <h3 class="text-center mt-1 mb-2">Clientes con más pedidos</h3>
                    <div class="chart-container">
                        <canvas id="graficaClientesConMasPedidos" width="600" height="400"></canvas>
                    </div>

            </div>
            
            
    <%
        // Obtener los arreglos JSON desde el atributo de solicitud
        JsonArray mesesConMasPedidosJSON = (JsonArray) request.getAttribute("mesesConMasPedidosJSON");
        JsonArray clientesConMasPedidosJSON = (JsonArray) request.getAttribute("clientesConMasPedidosJSON");

    %>


<script>
        
        function getRandomColor() {
                        var letters = '0123456789ABCDEF';
                        var color = '#';
                        for (var i = 0; i < 6; i++) {
                            color += letters[Math.floor(Math.random() * 16)];
                        }
                        return color;
        }
        
        
         var ctxMesesConMasPedidos = document.getElementById('graficaMesesConMasPedidos').getContext('2d');
                    var mesesLabels = [];
                    var mesesData = [];
                    <% for (int i = 0; i < mesesConMasPedidosJSON.size(); i++) { %>
                        var mesConMasPedidos = <%= mesesConMasPedidosJSON.get(i) %>;
                        mesesLabels.push(mesConMasPedidos.mes + '/' + mesConMasPedidos.anio );
                        mesesData.push(mesConMasPedidos.cantidadCampo);
                    <% } %>
                    var graficaMesesConMasPedidos = new Chart(ctxMesesConMasPedidos, {
                        type: 'bar',
                        data: {
                            labels: mesesLabels,
                            datasets: [{
                                label: 'Cantidad de pedidos',
                                data: mesesData,
                                backgroundColor: mesesLabels.map(label => getRandomColor()),
                                borderColor: 'rgba(255, 255, 255, 1)',
                                borderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false
                        }
                    });
          
       
</script>
   
      
<script>
 var ctxClientesConMasPedidos = document.getElementById('graficaClientesConMasPedidos').getContext('2d');
    var clientesLabels = [];
    var clientesData = [];
    <% for (int i = 0; i < clientesConMasPedidosJSON.size(); i++) { %>
        var clienteConMasPedidos = <%= clientesConMasPedidosJSON.get(i) %>;
        clientesLabels.push(clienteConMasPedidos.campo);
        clientesData.push(clienteConMasPedidos.cantidadCampo);
    <% } %>
    var graficaClientesConMasPedidos = new Chart(ctxClientesConMasPedidos, {
        type: 'pie',
        data: {
            labels: clientesLabels,
            datasets: [{
                label: 'Cantidad de pedidos',
                data: clientesData,
                backgroundColor: clientesLabels.map(label => getRandomColor()),
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });            
</script>




    </div>
</div>
    
         </div>
     </main>

   
  </body>
</html>
