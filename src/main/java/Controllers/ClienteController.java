package Controllers;

import Models.Cliente;
import ModelsDao.ClienteDao;
import Utils.General;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(name = "ClienteController", urlPatterns = {"/Cliente"})
public class ClienteController extends HttpServlet {

    ClienteDao clienteService;

    public ClienteController() {
        clienteService = new ClienteDao();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        List<Cliente> clientes = clienteService.ListClientes();
        
        General.sendAsJson(response, General.ObjectToJson(clientes));
        return;
        
    }

   @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String nombre = request.getParameter("nombre");
        
        Cliente cliente = new Cliente();
        
        cliente.setNombreCliente(nombre);
        
        General.sendAsJson(response, General.ObjectToJson(cliente));
        return;
       
//        if(clienteService){
//            General.sendAsJson(resp, General.ObjectToJson(instituto));
//            return;
//        }else{
//            General.sendAsJson(resp, "[]");
//            return; 
//        }
    }


}
