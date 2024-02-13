/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Utils;

/**
 *
 * @author bryanmejia
 */
public class GraficoViewModel {
    private String campo; 
    private int cantidadCampo;
    private int anio; 
    private int mes; 

    public GraficoViewModel() {
    }


    public GraficoViewModel(String campo, int cantidadCampo) {
        this.campo = campo;
        this.cantidadCampo = cantidadCampo;
    }

    // Getters y setters
    public String getCampo() {
        return campo;
    }

    public void setCampo(String campo) {
        this.campo = campo;
    }

    public int getCantidadCampo() {
        return cantidadCampo;
    }

    public void setCantidadCampo(int cantidadCampo) {
        this.cantidadCampo = cantidadCampo;
    }

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public int getMes() {
        return mes;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }
    
    
}
