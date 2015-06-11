package nl.ordina.sample.grocerylist.presentation.controller;

import java.util.List;

import nl.ordina.sample.grocerylist.presentation.model.Grocery;
import nl.ordina.sample.grocerylist.service.GroceryListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GroceryListController {

	
	@Autowired
	private GroceryListService groceryListService;
	
	@RequestMapping(value="/grocery", method= RequestMethod.GET)
	public List<Grocery> getGroceries() {
		return groceryListService.getGroceries();
	}
	
	@RequestMapping(value="/grocery", method= RequestMethod.POST)
	public Grocery save(@RequestBody Grocery grocery) {
		groceryListService.save(grocery);
		return grocery;
	}
	
	@RequestMapping(value="/grocery", method= RequestMethod.PUT)
	public Grocery update(@RequestBody Grocery grocery) {
		groceryListService.save(grocery);
		return grocery;
	}
	
	@RequestMapping(value="/grocery/{id}", method= RequestMethod.DELETE)
	public void remove(@PathVariable("id") Integer id) {
		groceryListService.delete(id);
		
	}
	
}
