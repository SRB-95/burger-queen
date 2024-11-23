// Core Modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from '../../services/product.service';

// Models
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  // Public Members
  product!: Product;
  isDescriptionTruncated: boolean = true;
  selectedQuantity: number = 1;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const foundProduct = this.productService.getProductById(+productId); // Fetch product
      if (foundProduct) {
        this.product = foundProduct;
      } else {
        console.error('Product not found.');
      }
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

  toggleDescription(): void {
    this.isDescriptionTruncated = !this.isDescriptionTruncated;
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.selectedQuantity = quantity;

      // Update quantity in the cart
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.product.isFavorite = this.isFavorite
  }
}
