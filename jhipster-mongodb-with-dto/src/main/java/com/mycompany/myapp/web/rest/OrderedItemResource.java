package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.OrderedItemService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.OrderedItemDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderedItem.
 */
@RestController
@RequestMapping("/api")
public class OrderedItemResource {

    private final Logger log = LoggerFactory.getLogger(OrderedItemResource.class);

    private static final String ENTITY_NAME = "orderedItem";

    private final OrderedItemService orderedItemService;

    public OrderedItemResource(OrderedItemService orderedItemService) {
        this.orderedItemService = orderedItemService;
    }

    /**
     * POST  /ordered-items : Create a new orderedItem.
     *
     * @param orderedItemDTO the orderedItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderedItemDTO, or with status 400 (Bad Request) if the orderedItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ordered-items")
    @Timed
    public ResponseEntity<OrderedItemDTO> createOrderedItem(@Valid @RequestBody OrderedItemDTO orderedItemDTO) throws URISyntaxException {
        log.debug("REST request to save OrderedItem : {}", orderedItemDTO);
        if (orderedItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderedItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderedItemDTO result = orderedItemService.save(orderedItemDTO);
        return ResponseEntity.created(new URI("/api/ordered-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ordered-items : Updates an existing orderedItem.
     *
     * @param orderedItemDTO the orderedItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderedItemDTO,
     * or with status 400 (Bad Request) if the orderedItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderedItemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ordered-items")
    @Timed
    public ResponseEntity<OrderedItemDTO> updateOrderedItem(@Valid @RequestBody OrderedItemDTO orderedItemDTO) throws URISyntaxException {
        log.debug("REST request to update OrderedItem : {}", orderedItemDTO);
        if (orderedItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderedItemDTO result = orderedItemService.save(orderedItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderedItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ordered-items : get all the orderedItems.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of orderedItems in body
     */
    @GetMapping("/ordered-items")
    @Timed
    public ResponseEntity<List<OrderedItemDTO>> getAllOrderedItems(Pageable pageable) {
        log.debug("REST request to get a page of OrderedItems");
        Page<OrderedItemDTO> page = orderedItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ordered-items");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ordered-items/:id : get the "id" orderedItem.
     *
     * @param id the id of the orderedItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderedItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ordered-items/{id}")
    @Timed
    public ResponseEntity<OrderedItemDTO> getOrderedItem(@PathVariable String id) {
        log.debug("REST request to get OrderedItem : {}", id);
        Optional<OrderedItemDTO> orderedItemDTO = orderedItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderedItemDTO);
    }

    /**
     * DELETE  /ordered-items/:id : delete the "id" orderedItem.
     *
     * @param id the id of the orderedItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ordered-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderedItem(@PathVariable String id) {
        log.debug("REST request to delete OrderedItem : {}", id);
        orderedItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
