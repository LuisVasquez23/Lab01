package ModelsDao;

import Models.Pedido;
import Persistencia.MySQLConnection;
import Utils.GraficoViewModel;
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
    
    
    
    public boolean UpdatePedido(Pedido pedido) {
    boolean isUpdated = false;

    try {
        MySQLConnection connection = MySQLConnection.getInstance();
        Connection conn = connection.getConnection();

        String query = "UPDATE pedidos SET id_cliente = ?, fecha = ?, total = ?, estado = ? WHERE id = ?;";

        PreparedStatement statement = conn.prepareStatement(query);

        statement.setInt(1, pedido.getId_cliente());
        statement.setDate(2, (Date) pedido.getFecha());
        statement.setFloat(3, pedido.getTotal());
        statement.setInt(4, pedido.getEstado());
        statement.setInt(5, pedido.getId());

        int rowsAffected = statement.executeUpdate();

        if (rowsAffected > 0) {
            isUpdated = true;
        }

        statement.close();
    } catch (Exception e) {
        e.printStackTrace();
    }

    return isUpdated;
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
    
    
    
     public List<GraficoViewModel> obtenerMesesConMasPedidosPorAnio() {
        List<GraficoViewModel> mesesConMasPedidos = new ArrayList<>();

        try {
            MySQLConnection connection = MySQLConnection.getInstance();
            Connection conn = connection.getConnection();

         
            String sql = "SELECT YEAR(fecha) AS anio, MONTH(fecha) AS mes, COUNT(*) AS cantidad_pedidos " +
                         "FROM pedidos " +
                         "GROUP BY YEAR(fecha), MONTH(fecha) " +
                         "ORDER BY anio DESC, cantidad_pedidos DESC " +
                         "LIMIT 3;";

            PreparedStatement statement = conn.prepareStatement(sql);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                GraficoViewModel mesConMasPedidos = new GraficoViewModel();
                mesConMasPedidos.setAnio(resultSet.getInt("anio"));
                mesConMasPedidos.setMes(resultSet.getInt("mes"));
                mesConMasPedidos.setCantidadCampo(resultSet.getInt("cantidad_pedidos"));
                mesesConMasPedidos.add(mesConMasPedidos);
            }

            resultSet.close();
            statement.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return mesesConMasPedidos;
    }

    
}
