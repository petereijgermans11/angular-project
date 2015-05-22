package ordina.nl.angulardemo.model;


public class Order {
	
	private int ordernummer = (int) Math.abs((Math.random() * 100));
	
	private Adress adress;



	public void setAdress(Adress adress) {
		this.adress = adress;
	}

	public Adress getAdress() {
		return adress;
	}

	public void setOrdernummer(int ordernummer) {
		this.ordernummer = ordernummer;
	}

	public int getOrdernummer() {
		return ordernummer;
	}
	
	
	
	
	
	

}
