package Persistencia;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySQLConnection {
    
    private static final String URL = "jdbc:mysql://localhost:3306/lab01";
    private static final String USER = "root";
    private static final String PASSWORD = "";
    
    private static MySQLConnection instance;
    private Connection connection;

    private MySQLConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
    
    public static MySQLConnection getInstance() {
        if (instance == null) {
            synchronized (MySQLConnection.class) {
                if (instance == null) {
                    instance = new MySQLConnection();
                }
            }
        }
        return instance;
    }
    
    public Connection getConnection() {
        return connection;
    }
    
    public void closeConnection() {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
