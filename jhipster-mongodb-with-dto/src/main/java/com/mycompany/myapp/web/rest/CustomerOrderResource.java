package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.CustomerOrderService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.CustomerOrderDTO;
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
 * REST controller for managing CustomerOrder.
 */
@RestController
@RequestMapping("/api")
public class CustomerOrderResource {

    private final Logger log = LoggerFactory.getLogger(CustomerOrderResource.class);

    private static final String ENTITY_NAME = "customerOrder";

    private final CustomerOrderService customerOrderService;

    public CustomerOrderResource(CustomerOrderService customerOrderService) {
        this.customerOrderService = customerOrderService;
    }

    /**
     * POST  /customer-orders : Create a new customerOrder.
     *
     * @param customerOrderDTO the customerOrderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerOrderDTO, or with status 400 (Bad Request) if the customerOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-orders")
    @Timed
    public ResponseEntity<CustomerOrderDTO> createCustomerOrder(@RequestBody CustomerOrderDTO customerOrderDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerOrder : {}", customerOrderDTO);
        if (customerOrderDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerOrderDTO result = customerOrderService.save(customerOrderDTO);
        return ResponseEntity.created(new URI("/api/customer-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-orders : Updates an existing customerOrder.
     *
     * @param customerOrderDTO the customerOrderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerOrderDTO,
     * or with status 400 (Bad Request) if the customerOrderDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerOrderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-orders")
    @Timed
    public ResponseEntity<CustomerOrderDTO> updateCustomerOrder(@RequestBody CustomerOrderDTO customerOrderDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerOrder : {}", customerOrderDTO);
        if (customerOrderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerOrderDTO result = customerOrderService.save(customerOrderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerOrderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-orders : get all the customerOrders.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of customerOrders in body
     */
    @GetMapping("/customer-orders")
    @Timed
    public ResponseEntity<List<CustomerOrderDTO>> getAllCustomerOrders(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of CustomerOrders");
        Page<CustomerOrderDTO> page;
        if (eagerload) {
            page = customerOrderService.findAllWithEagerRelationships(pageable);
        } else {
            page = customerOrderService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/customer-orders?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-orders/:id : get the "id" customerOrder.
     *
     * @param id the id of the customerOrderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerOrderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-orders/{id}")
    @Timed
    public ResponseEntity<CustomerOrderDTO> getCustomerOrder(@PathVariable String id) {
        log.debug("REST request to get CustomerOrder : {}", id);
        Optional<CustomerOrderDTO> customerOrderDTO = customerOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customerOrderDTO);
    }

    /**
     * DELETE  /customer-orders/:id : delete the "id" customerOrder.
     *
     * @param id the id of the customerOrderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerOrder(@PathVariable String id) {
        log.debug("REST request to delete CustomerOrder : {}", id);
        customerOrderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
