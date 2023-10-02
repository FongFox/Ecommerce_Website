package com.ecommerce.springboot.repository;

import com.ecommerce.springboot.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductDAO extends JpaRepository<Product, Long> {
}
