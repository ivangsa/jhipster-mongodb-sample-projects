package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CustomerOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the CustomerOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerOrderRepository extends MongoRepository<CustomerOrder, String> {
    @Query("{}")
    Page<CustomerOrder> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<CustomerOrder> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<CustomerOrder> findOneWithEagerRelationships(String id);

}
