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
            
            String query = "SELECT id, nombre , telefono, email FROM clientes;";
            
            PreparedStatement statement = conn.prepareStatement(query);
            
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Cliente cliente = new Cliente();
                
                
                
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
