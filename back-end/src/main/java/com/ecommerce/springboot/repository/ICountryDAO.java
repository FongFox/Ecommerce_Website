package com.ecommerce.springboot.repository;

import com.ecommerce.springboot.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface ICountryDAO extends JpaRepository<Country, Integer> {
}
