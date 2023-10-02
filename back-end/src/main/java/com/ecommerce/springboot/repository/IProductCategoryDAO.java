package com.ecommerce.springboot.repository;

import com.ecommerce.springboot.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface IProductCategoryDAO extends JpaRepository<ProductCategory, Long> {
}
