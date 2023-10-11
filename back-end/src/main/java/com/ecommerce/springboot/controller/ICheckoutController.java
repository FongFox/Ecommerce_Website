package com.ecommerce.springboot.controller;

import com.ecommerce.springboot.dto.Purchase;
import com.ecommerce.springboot.dto.PurchaseResponse;
import com.ecommerce.springboot.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/api/checkout")
public interface ICheckoutController {
    @PostMapping("/purchase")
    PurchaseResponse placeOrder(@RequestBody Purchase purchase);
}
