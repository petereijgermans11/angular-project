package ordina.nl.angulardemo.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import ordina.nl.angulardemo.model.Order;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/orders")
public class OrderService {
	
	private List<Order> orders = new ArrayList<Order>(); 
	
	//http://localhost:8081/angularcursus/rest/orders/order
	@RequestMapping(value = "/order", method = RequestMethod.GET)
	public @ResponseBody Order getNewOrder() {
 
		return new Order();
 
	}
	
	@RequestMapping(value = "/order", method = RequestMethod.PUT)
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void saveOrder(@RequestBody String order) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Order orderx = mapper.readValue(order, Order.class);
			orders.add(orderx);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	//http://localhost:8081/rest/tests/testList
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody List<Order> getTestList() {		

		return orders;
 
	}
	
	

}
