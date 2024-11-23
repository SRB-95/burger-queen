// Core odules
import { Component, OnInit } from '@angular/core';

// Services
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

// Models
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // Public Members
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    try {
      // Fetch products from the service
      this.products = this.productService.getProducts();
      this.filteredProducts = [...this.products];
    } catch (error) {
      console.error('Error loading products:', error);
      this.errorMessage = 'Failed to load products. Please try again later.';
    }
  }

  onSearch(): void {
    try {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        // If the search query is empty, reset the filteredProducts
        this.filteredProducts = [...this.products];
        this.errorMessage = '';
        return;
      }

      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );

      if (this.filteredProducts.length === 0) {
        this.errorMessage = 'No products match your search.';
      } else {
        this.errorMessage = '';
      }
    } catch (error) {
      console.error('Error during search:', error);
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    }
  }

  addToCart(product: Product): void {
    try {
      this.cartService.addToCart(product);
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  }
}
