package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OrderedItem;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the OrderedItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderedItemRepository extends MongoRepository<OrderedItem, String> {

}
