package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.OrderHistoryService;
import com.mycompany.myapp.domain.OrderHistory;
import com.mycompany.myapp.repository.OrderHistoryRepository;
import com.mycompany.myapp.service.dto.OrderHistoryDTO;
import com.mycompany.myapp.service.mapper.OrderHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;
/**
 * Service Implementation for managing OrderHistory.
 */
@Service
public class OrderHistoryServiceImpl implements OrderHistoryService {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryServiceImpl.class);

    private final OrderHistoryRepository orderHistoryRepository;

    private final OrderHistoryMapper orderHistoryMapper;

    public OrderHistoryServiceImpl(OrderHistoryRepository orderHistoryRepository, OrderHistoryMapper orderHistoryMapper) {
        this.orderHistoryRepository = orderHistoryRepository;
        this.orderHistoryMapper = orderHistoryMapper;
    }

    /**
     * Save a orderHistory.
     *
     * @param orderHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderHistoryDTO save(OrderHistoryDTO orderHistoryDTO) {
        log.debug("Request to save OrderHistory : {}", orderHistoryDTO);
        OrderHistory orderHistory = orderHistoryMapper.toEntity(orderHistoryDTO);
        orderHistory = orderHistoryRepository.save(orderHistory);
        return orderHistoryMapper.toDto(orderHistory);
    }

    /**
     * Get all the orderHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<OrderHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OrderHistories");
        return orderHistoryRepository.findAll(pageable)
            .map(orderHistoryMapper::toDto);
    }


    /**
     * Get one orderHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<OrderHistoryDTO> findOne(String id) {
        log.debug("Request to get OrderHistory : {}", id);
        return orderHistoryRepository.findById(id)
            .map(orderHistoryMapper::toDto);
    }

    /**
     * Delete the orderHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete OrderHistory : {}", id);
        orderHistoryRepository.deleteById(id);
    }
}
