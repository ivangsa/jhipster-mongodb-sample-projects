package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PaymentDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the PaymentDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentDetailsRepository extends MongoRepository<PaymentDetails, String> {

}
