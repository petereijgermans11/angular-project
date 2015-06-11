package nl.ordina.sample.grocerylist.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import nl.ordina.sample.grocerylist.presentation.model.Grocery;

import org.springframework.stereotype.Service;

@Service
public class GroceryListService {

	private List<Grocery> groceries = new ArrayList<>();
	private AtomicInteger index = new AtomicInteger(1);
	
	@PostConstruct
	public void init() {
		Grocery oranges = new Grocery("apples", 1);
		oranges.setRemarks("please bring the green ones");
		oranges.setId(index.getAndIncrement());
		groceries.add(oranges);
	}
	public List<Grocery> getGroceries() {
		return this.groceries; 
	}
	
	public Grocery save(Grocery grocery) {
		if (grocery.getId() == null) {
			int newid = index.getAndIncrement();
			grocery.setId(newid);
			groceries.add(grocery);
		} else {
			Grocery storedGrocery = groceries.get(groceries.indexOf(grocery));
			storedGrocery.setName(grocery.getName());
			storedGrocery.setQuantity(grocery.getQuantity());
			storedGrocery.setRemarks(grocery.getRemarks());
		}
		return grocery;
	}
	
	public void delete(Integer id) {
		if (id != null) {
			Grocery grocery = new Grocery();
			grocery.setId(id);
			groceries.remove(grocery);
		}
	}
}
