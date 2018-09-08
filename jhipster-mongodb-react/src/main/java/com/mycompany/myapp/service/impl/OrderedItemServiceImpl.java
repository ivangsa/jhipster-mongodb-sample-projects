package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.OrderedItemService;
import com.mycompany.myapp.domain.OrderedItem;
import com.mycompany.myapp.repository.OrderedItemRepository;
import com.mycompany.myapp.service.dto.OrderedItemDTO;
import com.mycompany.myapp.service.mapper.OrderedItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;
/**
 * Service Implementation for managing OrderedItem.
 */
@Service
public class OrderedItemServiceImpl implements OrderedItemService {

    private final Logger log = LoggerFactory.getLogger(OrderedItemServiceImpl.class);

    private final OrderedItemRepository orderedItemRepository;

    private final OrderedItemMapper orderedItemMapper;

    public OrderedItemServiceImpl(OrderedItemRepository orderedItemRepository, OrderedItemMapper orderedItemMapper) {
        this.orderedItemRepository = orderedItemRepository;
        this.orderedItemMapper = orderedItemMapper;
    }

    /**
     * Save a orderedItem.
     *
     * @param orderedItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderedItemDTO save(OrderedItemDTO orderedItemDTO) {
        log.debug("Request to save OrderedItem : {}", orderedItemDTO);
        OrderedItem orderedItem = orderedItemMapper.toEntity(orderedItemDTO);
        orderedItem = orderedItemRepository.save(orderedItem);
        return orderedItemMapper.toDto(orderedItem);
    }

    /**
     * Get all the orderedItems.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<OrderedItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OrderedItems");
        return orderedItemRepository.findAll(pageable)
            .map(orderedItemMapper::toDto);
    }


    /**
     * Get one orderedItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<OrderedItemDTO> findOne(String id) {
        log.debug("Request to get OrderedItem : {}", id);
        return orderedItemRepository.findById(id)
            .map(orderedItemMapper::toDto);
    }

    /**
     * Delete the orderedItem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete OrderedItem : {}", id);
        orderedItemRepository.deleteById(id);
    }
}
