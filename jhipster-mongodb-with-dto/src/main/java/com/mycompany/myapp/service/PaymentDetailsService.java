package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.PaymentDetailsDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing PaymentDetails.
 */
public interface PaymentDetailsService {

    /**
     * Save a paymentDetails.
     *
     * @param paymentDetailsDTO the entity to save
     * @return the persisted entity
     */
    PaymentDetailsDTO save(PaymentDetailsDTO paymentDetailsDTO);

    /**
     * Get all the paymentDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PaymentDetailsDTO> findAll(Pageable pageable);


    /**
     * Get the "id" paymentDetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PaymentDetailsDTO> findOne(String id);

    /**
     * Delete the "id" paymentDetails.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
