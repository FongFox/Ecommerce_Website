package com.ecommerce.springboot.config;

import com.ecommerce.springboot.entity.Product;
import com.ecommerce.springboot.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Configuration
public class dataRESTConfig implements RepositoryRestConfigurer {

    //@Autowire JPA entity manager
    private EntityManager entityManager;

    @Autowired
    public dataRESTConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theAllowedActions = {HttpMethod.GET};

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(
                        Arrays.stream(HttpMethod.values())
                                .filter(method -> !Arrays.asList(theAllowedActions).contains(method))
                                .toArray(HttpMethod[]::new)
                ))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(
                        Arrays.stream(HttpMethod.values())
                                .filter(method -> !Arrays.asList(theAllowedActions).contains(method))
                                .toArray(HttpMethod[]::new)
                )));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(
                        Arrays.stream(HttpMethod.values())
                                .filter(method -> !Arrays.asList(theAllowedActions).contains(method))
                                .toArray(HttpMethod[]::new)
                ))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(
                        Arrays.stream(HttpMethod.values())
                                .filter(method -> !Arrays.asList(theAllowedActions).contains(method))
                                .toArray(HttpMethod[]::new)
                )));
        //call an internal helper method
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //expose entity ids
        //
        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        // - create a array of the entity types
        List<Class> entityClasses = new ArrayList<>();
        // - get the entity types for the entities
        for (EntityType entity : entities) {
            entityClasses.add(entity.getJavaType());
        }
        // - expose the entity type for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
