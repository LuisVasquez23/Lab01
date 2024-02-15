package ModelsDao;

import Models.Cliente;
import Persistencia.MySQLConnection;
import Utils.GraficoViewModel;
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
    
    public boolean AddCliente(Cliente cliente){
        boolean IsAdded = false;
    
        try {
            
            MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();
            
            String query = "INSERT INTO `clientes` (`id`, `nombre`, `direccion`, `telefono`, `email`) VALUES (NULL, ?, ?, ?, ?);";
            
            PreparedStatement statement = conn.prepareStatement(query);
            
            statement.setString(1, cliente.getNombreCliente());
            statement.setString(2, cliente.getDireccion());
            statement.setString(3, cliente.getTelefono());
            statement.setString(4, cliente.getEmail());
            
            int rowsAffected = statement.executeUpdate();
            
            if(rowsAffected > 0){
                IsAdded = true;
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return IsAdded;
    }
    
    public boolean DeleteCliente(int id){
        boolean isDeleted = false;
        
        try{
              MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();
            
            String query = "DELETE FROM `clientes` WHERE id = ?;";
            
            PreparedStatement statement = conn.prepareStatement(query);
            
            statement.setInt(1, id);
            
            int rowsAffected = statement.executeUpdate();
            
            if(rowsAffected > 0){
                isDeleted = true;
            }
        }catch(Exception error){
            error.printStackTrace();
        }
        
        return isDeleted;
    }
    
    public List<GraficoViewModel> obtenerClientesConMasPedidos() {
        List<GraficoViewModel> clientesConMasPedidos = new ArrayList<>();

        try {
            MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();

            String sql = "SELECT c.nombre AS nombre_cliente, COUNT(*) AS cantidad_pedidos " +
                         "FROM clientes c " +
                         "INNER JOIN pedidos p ON c.id = p.id_cliente " +
                         "GROUP BY c.nombre " +
                         "ORDER BY cantidad_pedidos DESC " +
                         "LIMIT 10;";

            PreparedStatement statement = conn.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                String nombreCliente = resultSet.getString("nombre_cliente");
                int cantidadPedidos = resultSet.getInt("cantidad_pedidos");
                
                
                GraficoViewModel clienteConMasPedidos = new GraficoViewModel(nombreCliente, cantidadPedidos);
                clientesConMasPedidos.add(clienteConMasPedidos);
            }

            resultSet.close();
            statement.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return clientesConMasPedidos;
    }
    
    public boolean UpdateCliente(Cliente cliente){
        
        boolean IsUpdated = false;
    
        try {
            
            MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();
            
            String query = "UPDATE `clientes` SET `nombre` = ?, `direccion` = ?, `telefono` = ?, `email` = ? WHERE `id` = ?";

            PreparedStatement statement = conn.prepareStatement(query);
            
            statement.setString(1, cliente.getNombreCliente());
            statement.setString(2, cliente.getDireccion());
            statement.setString(3, cliente.getTelefono());
            statement.setString(4, cliente.getEmail());
            statement.setInt(5, cliente.getClienteId());
            
            int rowsAffected = statement.executeUpdate();
            
            if(rowsAffected > 0){
                IsUpdated = true;
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return IsUpdated;
    }
}
