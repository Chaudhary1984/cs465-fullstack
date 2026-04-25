import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
  standalone: false
})
export class CheckoutComponent {
  cartItems = [
    { name: 'Cancun Beach Package', quantity: 1, price: 799 },
    { name: 'Bahamas Cruise', quantity: 2, price: 1299 }
  ];
  
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  onCheckout(): void {
    alert('Checkout functionality would process payment here.');
  }
}
