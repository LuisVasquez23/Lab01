package Controllers;

import Models.Pedido;
import ModelsDao.PedidoDao;
import Utils.General;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(name = "PedidoController", urlPatterns = {"/Pedido"})
public class PedidoController extends HttpServlet {
    
    
    PedidoDao pedidoService;
    
    public PedidoController(){
        
        pedidoService = new PedidoDao();
        
    }

 

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
         
        List<Pedido> pedidos = pedidoService.ListPedidos();
        
        General.sendAsJson(response, General.ObjectToJson(pedidos));

        return;
        
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        
        String idCliente = request.getParameter("cliente");
        String fechaString = request.getParameter("fecha");
        String total = request.getParameter("total");
        String estado = request.getParameter("estado");
        
        Pedido pedido = new Pedido();
       
        pedido.setId_cliente(Integer.parseInt(idCliente));

        
        pedido.setFecha(fechaString);
        pedido.setTotal(Float.parseFloat(total));
        pedido.setEstado(Integer.parseInt(estado));
        
        if(pedidoService.AddPedido(pedido)){
            General.sendAsJson(response, General.ObjectToJson(pedido));
            return;
        }
        
        General.sendAsJson(response, "[]");
        return;
       
    }
    
    
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        String id = req.getParameter("id");
        
        if(id=="" || id == null){
            General.sendAsJson(resp, "[{}]");
            return;
        }
        
        if(pedidoService.DeletePedido(Integer.parseInt(id))){
            General.sendAsJson(resp, "[{\"id\": " + id + "}]");
            return;
        }else{
            General.sendAsJson(resp, "[{}]");
            return;
        }
        
        
    
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        try {
            String idCliente = request.getParameter("idCliente");
            String fechaString = request.getParameter("fecha");
            String total = request.getParameter("total");
            String estado = request.getParameter("estado");
            String id = request.getParameter("id");

            Pedido pedido = new Pedido();

            pedido.setId_cliente(Integer.parseInt(idCliente));

            pedido.setId(Integer.parseInt(id));
            pedido.setFecha(fechaString);
            pedido.setTotal(Float.parseFloat(total));
            pedido.setEstado(Integer.parseInt(estado));

            if(pedidoService.UpdatePedido(pedido)){
                General.sendAsJson(response, General.ObjectToJson(pedido));
                return;
            }
        
            General.sendAsJson(response, "[]");
            return;
        } catch (Exception e) {
            General.sendAsJson(response, "[]");
            return;
        }

    }
    
    


  

}
