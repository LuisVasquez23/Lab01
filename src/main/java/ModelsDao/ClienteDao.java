package ModelsDao;

import Models.Cliente;
import Persistencia.MySQLConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ClienteDao {
    
    public List<Cliente> ListClientes(){
        List<Cliente> clientes = new ArrayList<>();
        
        try {
            
            MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();
            
            String query = "SELECT * FROM clientes;";
            
            PreparedStatement statement = conn.prepareStatement(query);
            
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Cliente cliente = new Cliente();
                
                cliente.setClienteId(resultSet.getInt("id"));
                cliente.setNombreCliente(resultSet.getString("nombre"));
                cliente.setDireccion(resultSet.getString("direccion"));
                cliente.setTelefono(resultSet.getString("telefono"));
                cliente.setEmail(resultSet.getString("email"));
                
                clientes.add(cliente);
                
            }

            resultSet.close();
            statement.close();
            
        } catch (Exception e) {
            e.printStackTrace();
            return clientes;
        }
        
        return clientes;   
    }
    
}
