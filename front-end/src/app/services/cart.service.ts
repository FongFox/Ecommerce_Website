import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[]= [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    // check if we already having the item in a cart

    let existingCartItem: CartItem | undefined;

    existingCartItem = this.cartItems.find((tempCartItem) => {
      return tempCartItem.id === theCartItem.id;
    });

    // check if the existingCartItem is instance of CartItem
    // if not then that will return undefined

    if (existingCartItem instanceof CartItem) {
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem) {
    //get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem =>
      tempCartItem.id === cartItem.id)
    //if found, remove the item from the array at the give index
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values ... all subcribers will receive this newest data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purpose
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let cartItem of this.cartItems) {
      const subTotalvalue = cartItem.quantity * cartItem.unitPrice;
      console.log(`name: ${cartItem.name}, unitPrice: ${cartItem.unitPrice}, subTotalPrice: ${subTotalvalue}`);
      console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
      console.log('----------');
    }
  }

}
