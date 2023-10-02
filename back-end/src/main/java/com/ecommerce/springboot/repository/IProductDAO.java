package com.ecommerce.springboot.repository;

import com.ecommerce.springboot.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface IProductDAO extends JpaRepository<Product, Long> {
}
