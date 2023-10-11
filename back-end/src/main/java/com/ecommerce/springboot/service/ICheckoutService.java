package com.ecommerce.springboot.service;

import com.ecommerce.springboot.dto.Purchase;
import com.ecommerce.springboot.dto.PurchaseResponse;

public interface ICheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
