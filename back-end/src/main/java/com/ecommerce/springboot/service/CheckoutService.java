package com.ecommerce.springboot.service;

import com.ecommerce.springboot.dto.Purchase;
import com.ecommerce.springboot.dto.PurchaseResponse;
import com.ecommerce.springboot.entity.Customer;
import com.ecommerce.springboot.entity.Order;
import com.ecommerce.springboot.entity.OrderItem;
import com.ecommerce.springboot.repository.ICustomerDAO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutService implements ICheckoutService {
    private final ICustomerDAO customerDAO;

    @Autowired
    public CheckoutService(ICustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve the order info from dto
        Order order = purchase.getOrder();
        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        //populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));
        //populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        //populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);
        //save to the database
        customerDAO.save(customer);
        //return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        //generate a random UUID number (UUID version-4)
        //for details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
        //
        return UUID.randomUUID().toString();
    }
}
