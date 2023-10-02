package com.ecommerce.springboot.repository;

import com.ecommerce.springboot.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
@CrossOrigin
public interface IProductCategoryDAO extends JpaRepository<ProductCategory, Long> {
}
