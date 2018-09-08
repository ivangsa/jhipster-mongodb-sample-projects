package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.PaymentDetailsService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.PaymentDetailsDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PaymentDetails.
 */
@RestController
@RequestMapping("/api")
public class PaymentDetailsResource {

    private final Logger log = LoggerFactory.getLogger(PaymentDetailsResource.class);

    private static final String ENTITY_NAME = "paymentDetails";

    private final PaymentDetailsService paymentDetailsService;

    public PaymentDetailsResource(PaymentDetailsService paymentDetailsService) {
        this.paymentDetailsService = paymentDetailsService;
    }

    /**
     * POST  /payment-details : Create a new paymentDetails.
     *
     * @param paymentDetailsDTO the paymentDetailsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new paymentDetailsDTO, or with status 400 (Bad Request) if the paymentDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/payment-details")
    @Timed
    public ResponseEntity<PaymentDetailsDTO> createPaymentDetails(@RequestBody PaymentDetailsDTO paymentDetailsDTO) throws URISyntaxException {
        log.debug("REST request to save PaymentDetails : {}", paymentDetailsDTO);
        if (paymentDetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new paymentDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentDetailsDTO result = paymentDetailsService.save(paymentDetailsDTO);
        return ResponseEntity.created(new URI("/api/payment-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payment-details : Updates an existing paymentDetails.
     *
     * @param paymentDetailsDTO the paymentDetailsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated paymentDetailsDTO,
     * or with status 400 (Bad Request) if the paymentDetailsDTO is not valid,
     * or with status 500 (Internal Server Error) if the paymentDetailsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payment-details")
    @Timed
    public ResponseEntity<PaymentDetailsDTO> updatePaymentDetails(@RequestBody PaymentDetailsDTO paymentDetailsDTO) throws URISyntaxException {
        log.debug("REST request to update PaymentDetails : {}", paymentDetailsDTO);
        if (paymentDetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaymentDetailsDTO result = paymentDetailsService.save(paymentDetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paymentDetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /payment-details : get all the paymentDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of paymentDetails in body
     */
    @GetMapping("/payment-details")
    @Timed
    public ResponseEntity<List<PaymentDetailsDTO>> getAllPaymentDetails(Pageable pageable) {
        log.debug("REST request to get a page of PaymentDetails");
        Page<PaymentDetailsDTO> page = paymentDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/payment-details");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /payment-details/:id : get the "id" paymentDetails.
     *
     * @param id the id of the paymentDetailsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paymentDetailsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/payment-details/{id}")
    @Timed
    public ResponseEntity<PaymentDetailsDTO> getPaymentDetails(@PathVariable String id) {
        log.debug("REST request to get PaymentDetails : {}", id);
        Optional<PaymentDetailsDTO> paymentDetailsDTO = paymentDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paymentDetailsDTO);
    }

    /**
     * DELETE  /payment-details/:id : delete the "id" paymentDetails.
     *
     * @param id the id of the paymentDetailsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/payment-details/{id}")
    @Timed
    public ResponseEntity<Void> deletePaymentDetails(@PathVariable String id) {
        log.debug("REST request to delete PaymentDetails : {}", id);
        paymentDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
