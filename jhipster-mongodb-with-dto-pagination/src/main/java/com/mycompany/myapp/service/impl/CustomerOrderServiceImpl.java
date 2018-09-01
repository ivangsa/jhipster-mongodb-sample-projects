package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CustomerOrderService;
import com.mycompany.myapp.domain.CustomerOrder;
import com.mycompany.myapp.repository.CustomerOrderRepository;
import com.mycompany.myapp.service.dto.CustomerOrderDTO;
import com.mycompany.myapp.service.mapper.CustomerOrderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;
/**
 * Service Implementation for managing CustomerOrder.
 */
@Service
public class CustomerOrderServiceImpl implements CustomerOrderService {

    private final Logger log = LoggerFactory.getLogger(CustomerOrderServiceImpl.class);

    private final CustomerOrderRepository customerOrderRepository;

    private final CustomerOrderMapper customerOrderMapper;

    public CustomerOrderServiceImpl(CustomerOrderRepository customerOrderRepository, CustomerOrderMapper customerOrderMapper) {
        this.customerOrderRepository = customerOrderRepository;
        this.customerOrderMapper = customerOrderMapper;
    }

    /**
     * Save a customerOrder.
     *
     * @param customerOrderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomerOrderDTO save(CustomerOrderDTO customerOrderDTO) {
        log.debug("Request to save CustomerOrder : {}", customerOrderDTO);
        CustomerOrder customerOrder = customerOrderMapper.toEntity(customerOrderDTO);
        customerOrder = customerOrderRepository.save(customerOrder);
        return customerOrderMapper.toDto(customerOrder);
    }

    /**
     * Get all the customerOrders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<CustomerOrderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerOrders");
        return customerOrderRepository.findAll(pageable)
            .map(customerOrderMapper::toDto);
    }

    /**
     * Get all the CustomerOrder with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<CustomerOrderDTO> findAllWithEagerRelationships(Pageable pageable) {
        return customerOrderRepository.findAllWithEagerRelationships(pageable).map(customerOrderMapper::toDto);
    }
    

    /**
     * Get one customerOrder by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<CustomerOrderDTO> findOne(String id) {
        log.debug("Request to get CustomerOrder : {}", id);
        return customerOrderRepository.findOneWithEagerRelationships(id)
            .map(customerOrderMapper::toDto);
    }

    /**
     * Delete the customerOrder by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete CustomerOrder : {}", id);
        customerOrderRepository.deleteById(id);
    }
}
