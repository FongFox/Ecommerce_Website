package com.ecommerce.springboot.config;

import com.ecommerce.springboot.entity.Product;
import com.ecommerce.springboot.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Arrays;

@Configuration
public class dataRESTConfig implements RepositoryRestConfigurer {

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
    }
}
