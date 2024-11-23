// Core Modules
import { Injectable } from '@angular/core';

// Models
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Private Members
  private products: Product[] = [
    { id: 1, name: 'Cheese Burger', price: 389, imageUrl: '../assets/images/cheeseBurger.jpeg', description: 'A cheeseburger is a hamburger with a slice of melted cheese on top of the meat patty. Cheeseburgers can include a variety of toppings and condiments, such as lettuce, tomato, onion, pickles, bacon, avocado, mushrooms, mayonnaise, ketchup, and mustard.', inStock: true, isFavorite: false },
    { id: 2, name: 'Chicken Burger', price: 299, imageUrl: '../assets/images/chickenBurger.jpeg', description: 'A chicken burger makes for a quick midweek meal or weekend BBQs with friends! Crispy seasoned chicken breast, topped with mandatory melted cheese, piled onto soft rolls with onion, avocado, lettuce, tomato and garlic mayo.', inStock: true, isFavorite: false },
    { id: 3, name: 'Paneer Burger', price: 499, imageUrl: '../assets/images/paneerBurger.jpeg', description: 'A crispy paneer patty filled with cheese that is air fried and coated in a tikka masala sauce in a burger bun- tell me that sounds awesome right?! If you are a paneer lover this is a burger you need in your life! The flavors of the tikka masala sauce add so much to this recipe especially paired with a brioche bun!', inStock: false, isFavorite: false },
    { id: 4, name: 'Mexican Burger', price: 399, imageUrl: '../assets/images/mexicanBurger.jpeg', description: 'A burger is a patty of ground beef grilled and placed between two halves of a bun. Slices of raw onion, lettuce, bacon, mayonnaise, and other ingredients add flavor. Burgers are considered an American food but are popular around the world.', inStock: true, isFavorite: false },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
