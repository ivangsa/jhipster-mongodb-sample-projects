package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.ShippingDetailsDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing ShippingDetails.
 */
public interface ShippingDetailsService {

    /**
     * Save a shippingDetails.
     *
     * @param shippingDetailsDTO the entity to save
     * @return the persisted entity
     */
    ShippingDetailsDTO save(ShippingDetailsDTO shippingDetailsDTO);

    /**
     * Get all the shippingDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ShippingDetailsDTO> findAll(Pageable pageable);


    /**
     * Get the "id" shippingDetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ShippingDetailsDTO> findOne(String id);

    /**
     * Delete the "id" shippingDetails.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
