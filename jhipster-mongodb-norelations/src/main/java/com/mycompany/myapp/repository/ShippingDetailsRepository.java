package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ShippingDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ShippingDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShippingDetailsRepository extends MongoRepository<ShippingDetails, String> {

}
