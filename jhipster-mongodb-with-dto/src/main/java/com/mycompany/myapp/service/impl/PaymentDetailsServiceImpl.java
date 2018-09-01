package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.PaymentDetailsService;
import com.mycompany.myapp.domain.PaymentDetails;
import com.mycompany.myapp.repository.PaymentDetailsRepository;
import com.mycompany.myapp.service.dto.PaymentDetailsDTO;
import com.mycompany.myapp.service.mapper.PaymentDetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;
/**
 * Service Implementation for managing PaymentDetails.
 */
@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    private final Logger log = LoggerFactory.getLogger(PaymentDetailsServiceImpl.class);

    private final PaymentDetailsRepository paymentDetailsRepository;

    private final PaymentDetailsMapper paymentDetailsMapper;

    public PaymentDetailsServiceImpl(PaymentDetailsRepository paymentDetailsRepository, PaymentDetailsMapper paymentDetailsMapper) {
        this.paymentDetailsRepository = paymentDetailsRepository;
        this.paymentDetailsMapper = paymentDetailsMapper;
    }

    /**
     * Save a paymentDetails.
     *
     * @param paymentDetailsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PaymentDetailsDTO save(PaymentDetailsDTO paymentDetailsDTO) {
        log.debug("Request to save PaymentDetails : {}", paymentDetailsDTO);
        PaymentDetails paymentDetails = paymentDetailsMapper.toEntity(paymentDetailsDTO);
        paymentDetails = paymentDetailsRepository.save(paymentDetails);
        return paymentDetailsMapper.toDto(paymentDetails);
    }

    /**
     * Get all the paymentDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<PaymentDetailsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PaymentDetails");
        return paymentDetailsRepository.findAll(pageable)
            .map(paymentDetailsMapper::toDto);
    }


    /**
     * Get one paymentDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<PaymentDetailsDTO> findOne(String id) {
        log.debug("Request to get PaymentDetails : {}", id);
        return paymentDetailsRepository.findById(id)
            .map(paymentDetailsMapper::toDto);
    }

    /**
     * Delete the paymentDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete PaymentDetails : {}", id);
        paymentDetailsRepository.deleteById(id);
    }
}
