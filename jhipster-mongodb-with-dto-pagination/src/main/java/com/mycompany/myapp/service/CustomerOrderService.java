package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.CustomerOrderDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing CustomerOrder.
 */
public interface CustomerOrderService {

    /**
     * Save a customerOrder.
     *
     * @param customerOrderDTO the entity to save
     * @return the persisted entity
     */
    CustomerOrderDTO save(CustomerOrderDTO customerOrderDTO);

    /**
     * Get all the customerOrders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CustomerOrderDTO> findAll(Pageable pageable);

    /**
     * Get all the CustomerOrder with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<CustomerOrderDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" customerOrder.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CustomerOrderDTO> findOne(String id);

    /**
     * Delete the "id" customerOrder.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
