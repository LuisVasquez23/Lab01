/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import ModelsDao.ClienteDao;
import ModelsDao.PedidoDao;

import Utils.GraficoViewModel;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author bryanmejia
 */
@WebServlet(name = "GraficaController", urlPatterns = {"/Grafica"})
public class GraficaController extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
         String accion = request.getParameter("accion");
        
        
        try {
            if (accion != null) {
                switch (accion) {
                    case "Graficas":
                        Graficas(request, response);
                        break;   
                   
                    default:
                        response.sendRedirect("/views/graficas/index.jsp");
                        break;
                }
            } else {
                response.sendRedirect("/views/graficas/index.jsp");
            }
        } catch (Exception e) {
         
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String errorMessage = "Error inesperado. Detalles del error: " + sw.toString();
            request.setAttribute("error_message", errorMessage);

        }
       
    }

  
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

 
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    
    
    private void Graficas(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    try {
         ClienteDao clientedao = new ClienteDao();
         PedidoDao pedidodao = new PedidoDao();
        
        List<GraficoViewModel> mesesConMasPedidos = pedidodao.obtenerMesesConMasPedidosPorAnio();
        List<GraficoViewModel> clientesConMasPedidos = clientedao.obtenerClientesConMasPedidos();

        JsonArray mesesConMasPedidosJSON = convertirDatosAJson(mesesConMasPedidos);
        JsonArray clientesConMasPedidosJSON = convertirDatosAJson(clientesConMasPedidos);

        request.setAttribute("mesesConMasPedidosJSON", mesesConMasPedidosJSON);
        request.setAttribute("clientesConMasPedidosJSON", clientesConMasPedidosJSON);

        RequestDispatcher dispatcher = request.getRequestDispatcher("/views/graficas/index.jsp");
        dispatcher.forward(request, response);
        
    } catch (Exception e) {
        e.printStackTrace();
    }
}
    

    private JsonArray convertirDatosAJson(List<GraficoViewModel> datos) {
        JsonArray JsonArray = new JsonArray();

        for (GraficoViewModel grafica : datos) {
            JsonObject encuestaJson = new JsonObject();

            encuestaJson.addProperty("anio", grafica.getAnio());
            encuestaJson.addProperty("mes", grafica.getMes());
            encuestaJson.addProperty("campo", grafica.getCampo());
            encuestaJson.addProperty("cantidadCampo", grafica.getCantidadCampo());

           JsonArray.add(encuestaJson);
        }

        return JsonArray;
    }

}
