package com.ecommerce.springboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity @Table(name = "product_category")
//@Data --know bug
@NoArgsConstructor
@Getter @Setter
public class ProductCategory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Product> products;

    public ProductCategory(String categoryName) {
        this.categoryName = categoryName;
    }
}
