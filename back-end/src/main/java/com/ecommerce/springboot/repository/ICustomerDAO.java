package com.ecommerce.springboot.repository;

import com.ecommerce.springboot.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerDAO extends JpaRepository<Customer, Long> {
}
