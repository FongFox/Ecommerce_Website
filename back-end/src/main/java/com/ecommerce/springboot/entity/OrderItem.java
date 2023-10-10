package com.ecommerce.springboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "order_item")
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "image_url")
    private String imageURL;
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "product_id")
    private Long productId;

    public OrderItem(String imageURL, BigDecimal unitPrice, int quantity, Long productId) {
        this.imageURL = imageURL;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.productId = productId;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", imageURL='" + imageURL + '\'' +
                ", unitPrice=" + unitPrice +
                ", quantity=" + quantity +
                ", productId=" + productId +
                '}';
    }
}
