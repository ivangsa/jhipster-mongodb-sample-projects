package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.OrderHistoryService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.OrderHistoryDTO;
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
 * REST controller for managing OrderHistory.
 */
@RestController
@RequestMapping("/api")
public class OrderHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryResource.class);

    private static final String ENTITY_NAME = "orderHistory";

    private final OrderHistoryService orderHistoryService;

    public OrderHistoryResource(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

    /**
     * POST  /order-histories : Create a new orderHistory.
     *
     * @param orderHistoryDTO the orderHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderHistoryDTO, or with status 400 (Bad Request) if the orderHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-histories")
    @Timed
    public ResponseEntity<OrderHistoryDTO> createOrderHistory(@RequestBody OrderHistoryDTO orderHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save OrderHistory : {}", orderHistoryDTO);
        if (orderHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderHistoryDTO result = orderHistoryService.save(orderHistoryDTO);
        return ResponseEntity.created(new URI("/api/order-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-histories : Updates an existing orderHistory.
     *
     * @param orderHistoryDTO the orderHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderHistoryDTO,
     * or with status 400 (Bad Request) if the orderHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-histories")
    @Timed
    public ResponseEntity<OrderHistoryDTO> updateOrderHistory(@RequestBody OrderHistoryDTO orderHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update OrderHistory : {}", orderHistoryDTO);
        if (orderHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderHistoryDTO result = orderHistoryService.save(orderHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-histories : get all the orderHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of orderHistories in body
     */
    @GetMapping("/order-histories")
    @Timed
    public ResponseEntity<List<OrderHistoryDTO>> getAllOrderHistories(Pageable pageable) {
        log.debug("REST request to get a page of OrderHistories");
        Page<OrderHistoryDTO> page = orderHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/order-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /order-histories/:id : get the "id" orderHistory.
     *
     * @param id the id of the orderHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-histories/{id}")
    @Timed
    public ResponseEntity<OrderHistoryDTO> getOrderHistory(@PathVariable String id) {
        log.debug("REST request to get OrderHistory : {}", id);
        Optional<OrderHistoryDTO> orderHistoryDTO = orderHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderHistoryDTO);
    }

    /**
     * DELETE  /order-histories/:id : delete the "id" orderHistory.
     *
     * @param id the id of the orderHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderHistory(@PathVariable String id) {
        log.debug("REST request to delete OrderHistory : {}", id);
        orderHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
