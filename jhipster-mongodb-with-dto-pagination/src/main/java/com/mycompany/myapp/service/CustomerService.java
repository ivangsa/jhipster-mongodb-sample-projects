package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.CustomerDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Customer.
 */
public interface CustomerService {

    /**
     * Save a customer.
     *
     * @param customerDTO the entity to save
     * @return the persisted entity
     */
    CustomerDTO save(CustomerDTO customerDTO);

    /**
     * Get all the customers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CustomerDTO> findAll(Pageable pageable);


    /**
     * Get the "id" customer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CustomerDTO> findOne(String id);

    /**
     * Delete the "id" customer.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
