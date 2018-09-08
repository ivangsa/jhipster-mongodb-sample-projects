package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.OrderedItemDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing OrderedItem.
 */
public interface OrderedItemService {

    /**
     * Save a orderedItem.
     *
     * @param orderedItemDTO the entity to save
     * @return the persisted entity
     */
    OrderedItemDTO save(OrderedItemDTO orderedItemDTO);

    /**
     * Get all the orderedItems.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrderedItemDTO> findAll(Pageable pageable);


    /**
     * Get the "id" orderedItem.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<OrderedItemDTO> findOne(String id);

    /**
     * Delete the "id" orderedItem.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
