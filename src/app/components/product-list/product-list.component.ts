// Core Modules
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef; // ViewChild for input element

  // Private Members
  private readonly subscription: Subscription = new Subscription();

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
      this.onSearch();
    } catch (error) {
      console.error('Error while loading products:', error);
      this.errorMessage = 'Failed to load products. Please try again later.';
    }
  }

  private onSearch(): void {
    this.subscription.add(
      fromEvent(this.searchInput.nativeElement, 'keyup')
        .pipe(
          debounceTime(300), // Wait for 300ms between keystrokes
          map((event: any) => event.target.value.trim().toLowerCase())
        )
        .subscribe({
          next: (query: string) => {
            this.filterProducts(query);
          },
          error: (error: HttpErrorResponse) => {
            console.error('<ProductListComponent> - <onSearch> : Error occurred during search...', error);
            this.errorMessage = 'An error occurred while processing the search. Please try again.';
          },
          complete: () => {
            console.log('Search processing completed!');
          }
        })
    );
  }
  

  private filterProducts(query: string): void {
    try {
      if (!query) {
        // Reset filtered products if query is empty
        this.filteredProducts = [...this.products];
        this.errorMessage = '';
        return;
      }

      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );

      // Show error message if no products match
      this.errorMessage =
        this.filteredProducts.length === 0 ? 'No products match your search..., Please try again!' : '';
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
