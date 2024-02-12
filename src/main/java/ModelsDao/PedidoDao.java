package ModelsDao;

import Models.Pedido;
import Persistencia.MySQLConnection;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


public class PedidoDao {
    
        public List<Pedido> ListPedidos() {
        List<Pedido> pedidos = new ArrayList<>();

        try {
            MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();

            String query = "SELECT * FROM pedidos;";

            PreparedStatement statement = conn.prepareStatement(query);

            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Pedido pedido = new Pedido();

                pedido.setId(resultSet.getInt("id"));
                pedido.setId_cliente(resultSet.getInt("id_cliente"));
                pedido.setFecha(resultSet.getDate("fecha"));
                pedido.setTotal(resultSet.getFloat("total"));
                pedido.setEstado(resultSet.getInt("estado"));

                pedidos.add(pedido);
            }

            resultSet.close();
            statement.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return pedidos;   
    }

    
    public boolean AddPedido(Pedido pedido){
        boolean IsAdded = false;
    
        try {
            
            MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();
            
            String query = "INSERT INTO `pedidos` (`id`, `id_cliente`, `fecha`, `total`, `estado`) VALUES (NULL, ?, ?, ?, ?);";
            
            PreparedStatement statement = conn.prepareStatement(query);
            
            statement.setInt(1, pedido.getId_cliente());
            statement.setDate(2, (Date) pedido.getFecha());
            statement.setFloat(3, pedido.getTotal());
            statement.setInt(4, pedido.getEstado());
            
            int rowsAffected = statement.executeUpdate();
            
            if(rowsAffected > 0){
                IsAdded = true;
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return IsAdded;
    }
    
    public boolean DeletePedido(int id){
        boolean isDeleted = false;
        
        try{
              MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();
            
            String query = "DELETE FROM `pedidos` WHERE id = ?;";
            
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

    
}
