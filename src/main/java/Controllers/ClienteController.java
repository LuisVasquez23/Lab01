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
        String direccion = request.getParameter("direccion");
        String telefono = request.getParameter("telefono");
        String email = request.getParameter("email");
        
        Cliente cliente = new Cliente();
        
        cliente.setNombreCliente(nombre);
        cliente.setDireccion(direccion);
        cliente.setTelefono(telefono);
        cliente.setEmail(email);
        
        if(clienteService.AddCliente(cliente)){
            General.sendAsJson(response, General.ObjectToJson(cliente));
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
        
        if(clienteService.DeleteCliente(Integer.parseInt(id))){
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
            
            String nombre = request.getParameter("nombre");
            String direccion = request.getParameter("direccion");
            String telefono = request.getParameter("telefono");
            String email = request.getParameter("email");
            String id = request.getParameter("id");

            Cliente cliente = new Cliente();
            cliente.setClienteId(Integer.parseInt(id));
            cliente.setNombreCliente(nombre);
            cliente.setDireccion(direccion);
            cliente.setTelefono(telefono);
            cliente.setEmail(email);

            if(clienteService.UpdateCliente(cliente)){
                General.sendAsJson(response, General.ObjectToJson(cliente));
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
