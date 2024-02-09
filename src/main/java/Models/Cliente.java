package Models;

public class Cliente {
    
    private int ClienteId;
    private String NombreCliente;
    private String Direccion;
    private String Telefono;
    private String Email;

    public Cliente() {
    }

    public void setClienteId(int ClienteId) {
        this.ClienteId = ClienteId;
    }

    public void setDireccion(String Direccion) {
        this.Direccion = Direccion;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

    public void setNombreCliente(String NombreCliente) {
        this.NombreCliente = NombreCliente;
    }

    public void setTelefono(String Telefono) {
        this.Telefono = Telefono;
    }

    public int getClienteId() {
        return ClienteId;
    }

    public String getDireccion() {
        return Direccion;
    }

    public String getEmail() {
        return Email;
    }

    public String getNombreCliente() {
        return NombreCliente;
    }

    public String getTelefono() {
        return Telefono;
    }
    
    
    
}
