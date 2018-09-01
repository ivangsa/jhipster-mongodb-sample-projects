package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OrderHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the OrderHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderHistoryRepository extends MongoRepository<OrderHistory, String> {

}
