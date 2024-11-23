// Core Modules
import { Component, OnInit } from '@angular/core';

// Services
import { CartService } from '../../services/cart.service';

// Models
import { CartItem } from '../../models/product.models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  // Public Members
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  discount: number = 0;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart updates
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cartItems = cart;
      this.calculateTotals();
    });
  }

  /**
   * Updates the quantity of a specific product in the cart.
   * @param productId - The ID of the product to update.
   * @param quantity - The new quantity for the product.
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  /**
   * Removes an item from the cart.
   * @param productId - The ID of the product to remove.
   */
  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  /**
   * Calculates the cart totals: subtotal, discount, and total.
   */
  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    this.discount = this.subtotal > 1000 ? this.subtotal * 0.1 : 0; // 10% discount for orders over ₹1000
    this.total = this.subtotal - this.discount;
  }

  /**
   * Processes the "Buy Now" action by logging order details to the console.
   */
  buyNow(): void {
    const cartData = this.cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    console.log('Order Data:', JSON.stringify(cartData));
    alert('Your order has been placed!');
  }
}
