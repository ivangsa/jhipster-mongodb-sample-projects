package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.ShippingDetailsService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.ShippingDetailsDTO;
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
 * REST controller for managing ShippingDetails.
 */
@RestController
@RequestMapping("/api")
public class ShippingDetailsResource {

    private final Logger log = LoggerFactory.getLogger(ShippingDetailsResource.class);

    private static final String ENTITY_NAME = "shippingDetails";

    private final ShippingDetailsService shippingDetailsService;

    public ShippingDetailsResource(ShippingDetailsService shippingDetailsService) {
        this.shippingDetailsService = shippingDetailsService;
    }

    /**
     * POST  /shipping-details : Create a new shippingDetails.
     *
     * @param shippingDetailsDTO the shippingDetailsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shippingDetailsDTO, or with status 400 (Bad Request) if the shippingDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shipping-details")
    @Timed
    public ResponseEntity<ShippingDetailsDTO> createShippingDetails(@RequestBody ShippingDetailsDTO shippingDetailsDTO) throws URISyntaxException {
        log.debug("REST request to save ShippingDetails : {}", shippingDetailsDTO);
        if (shippingDetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new shippingDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShippingDetailsDTO result = shippingDetailsService.save(shippingDetailsDTO);
        return ResponseEntity.created(new URI("/api/shipping-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shipping-details : Updates an existing shippingDetails.
     *
     * @param shippingDetailsDTO the shippingDetailsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shippingDetailsDTO,
     * or with status 400 (Bad Request) if the shippingDetailsDTO is not valid,
     * or with status 500 (Internal Server Error) if the shippingDetailsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shipping-details")
    @Timed
    public ResponseEntity<ShippingDetailsDTO> updateShippingDetails(@RequestBody ShippingDetailsDTO shippingDetailsDTO) throws URISyntaxException {
        log.debug("REST request to update ShippingDetails : {}", shippingDetailsDTO);
        if (shippingDetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ShippingDetailsDTO result = shippingDetailsService.save(shippingDetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shippingDetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shipping-details : get all the shippingDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of shippingDetails in body
     */
    @GetMapping("/shipping-details")
    @Timed
    public ResponseEntity<List<ShippingDetailsDTO>> getAllShippingDetails(Pageable pageable) {
        log.debug("REST request to get a page of ShippingDetails");
        Page<ShippingDetailsDTO> page = shippingDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/shipping-details");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /shipping-details/:id : get the "id" shippingDetails.
     *
     * @param id the id of the shippingDetailsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shippingDetailsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/shipping-details/{id}")
    @Timed
    public ResponseEntity<ShippingDetailsDTO> getShippingDetails(@PathVariable String id) {
        log.debug("REST request to get ShippingDetails : {}", id);
        Optional<ShippingDetailsDTO> shippingDetailsDTO = shippingDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shippingDetailsDTO);
    }

    /**
     * DELETE  /shipping-details/:id : delete the "id" shippingDetails.
     *
     * @param id the id of the shippingDetailsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shipping-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteShippingDetails(@PathVariable String id) {
        log.debug("REST request to delete ShippingDetails : {}", id);
        shippingDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
