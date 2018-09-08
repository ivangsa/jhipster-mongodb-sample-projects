package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.ShippingDetailsService;
import com.mycompany.myapp.domain.ShippingDetails;
import com.mycompany.myapp.repository.ShippingDetailsRepository;
import com.mycompany.myapp.service.dto.ShippingDetailsDTO;
import com.mycompany.myapp.service.mapper.ShippingDetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;
/**
 * Service Implementation for managing ShippingDetails.
 */
@Service
public class ShippingDetailsServiceImpl implements ShippingDetailsService {

    private final Logger log = LoggerFactory.getLogger(ShippingDetailsServiceImpl.class);

    private final ShippingDetailsRepository shippingDetailsRepository;

    private final ShippingDetailsMapper shippingDetailsMapper;

    public ShippingDetailsServiceImpl(ShippingDetailsRepository shippingDetailsRepository, ShippingDetailsMapper shippingDetailsMapper) {
        this.shippingDetailsRepository = shippingDetailsRepository;
        this.shippingDetailsMapper = shippingDetailsMapper;
    }

    /**
     * Save a shippingDetails.
     *
     * @param shippingDetailsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ShippingDetailsDTO save(ShippingDetailsDTO shippingDetailsDTO) {
        log.debug("Request to save ShippingDetails : {}", shippingDetailsDTO);
        ShippingDetails shippingDetails = shippingDetailsMapper.toEntity(shippingDetailsDTO);
        shippingDetails = shippingDetailsRepository.save(shippingDetails);
        return shippingDetailsMapper.toDto(shippingDetails);
    }

    /**
     * Get all the shippingDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<ShippingDetailsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ShippingDetails");
        return shippingDetailsRepository.findAll(pageable)
            .map(shippingDetailsMapper::toDto);
    }


    /**
     * Get one shippingDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<ShippingDetailsDTO> findOne(String id) {
        log.debug("Request to get ShippingDetails : {}", id);
        return shippingDetailsRepository.findById(id)
            .map(shippingDetailsMapper::toDto);
    }

    /**
     * Delete the shippingDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete ShippingDetails : {}", id);
        shippingDetailsRepository.deleteById(id);
    }
}
