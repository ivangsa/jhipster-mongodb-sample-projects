package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.ShippingDetails;
import com.mycompany.myapp.repository.ShippingDetailsRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ShippingDetails.
 */
@RestController
@RequestMapping("/api")
public class ShippingDetailsResource {

    private final Logger log = LoggerFactory.getLogger(ShippingDetailsResource.class);

    private static final String ENTITY_NAME = "shippingDetails";

    private final ShippingDetailsRepository shippingDetailsRepository;

    public ShippingDetailsResource(ShippingDetailsRepository shippingDetailsRepository) {
        this.shippingDetailsRepository = shippingDetailsRepository;
    }

    /**
     * POST  /shipping-details : Create a new shippingDetails.
     *
     * @param shippingDetails the shippingDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shippingDetails, or with status 400 (Bad Request) if the shippingDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shipping-details")
    @Timed
    public ResponseEntity<ShippingDetails> createShippingDetails(@RequestBody ShippingDetails shippingDetails) throws URISyntaxException {
        log.debug("REST request to save ShippingDetails : {}", shippingDetails);
        if (shippingDetails.getId() != null) {
            throw new BadRequestAlertException("A new shippingDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShippingDetails result = shippingDetailsRepository.save(shippingDetails);
        return ResponseEntity.created(new URI("/api/shipping-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shipping-details : Updates an existing shippingDetails.
     *
     * @param shippingDetails the shippingDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shippingDetails,
     * or with status 400 (Bad Request) if the shippingDetails is not valid,
     * or with status 500 (Internal Server Error) if the shippingDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shipping-details")
    @Timed
    public ResponseEntity<ShippingDetails> updateShippingDetails(@RequestBody ShippingDetails shippingDetails) throws URISyntaxException {
        log.debug("REST request to update ShippingDetails : {}", shippingDetails);
        if (shippingDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ShippingDetails result = shippingDetailsRepository.save(shippingDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shippingDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shipping-details : get all the shippingDetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of shippingDetails in body
     */
    @GetMapping("/shipping-details")
    @Timed
    public List<ShippingDetails> getAllShippingDetails() {
        log.debug("REST request to get all ShippingDetails");
        return shippingDetailsRepository.findAll();
    }

    /**
     * GET  /shipping-details/:id : get the "id" shippingDetails.
     *
     * @param id the id of the shippingDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shippingDetails, or with status 404 (Not Found)
     */
    @GetMapping("/shipping-details/{id}")
    @Timed
    public ResponseEntity<ShippingDetails> getShippingDetails(@PathVariable String id) {
        log.debug("REST request to get ShippingDetails : {}", id);
        Optional<ShippingDetails> shippingDetails = shippingDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(shippingDetails);
    }

    /**
     * DELETE  /shipping-details/:id : delete the "id" shippingDetails.
     *
     * @param id the id of the shippingDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shipping-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteShippingDetails(@PathVariable String id) {
        log.debug("REST request to delete ShippingDetails : {}", id);

        shippingDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
