// Core Modules
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Models
import { CartItem, Product } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Private Members
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    const existingItem = this.cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.cartSubject.next(this.cart);
    console.log('Current Cart: ', this.cart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    this.cartSubject.next(this.cart);
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  removeItem(productId: number): void {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.cartSubject.next(this.cart);
  }

  toggleFavorite(productId: number, isFavorite: boolean): void {
    const item = this.cart.find((item) => item.product.id === productId);
    if (item) {
      item.product.isFavorite = isFavorite;
    }
    this.cartSubject.next(this.cart);
  }
}
