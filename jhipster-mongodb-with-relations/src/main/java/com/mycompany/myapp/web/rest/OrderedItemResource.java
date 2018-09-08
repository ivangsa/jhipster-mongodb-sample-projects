package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.OrderedItem;
import com.mycompany.myapp.repository.OrderedItemRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private final OrderedItemRepository orderedItemRepository;

    public OrderedItemResource(OrderedItemRepository orderedItemRepository) {
        this.orderedItemRepository = orderedItemRepository;
    }

    /**
     * POST  /ordered-items : Create a new orderedItem.
     *
     * @param orderedItem the orderedItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderedItem, or with status 400 (Bad Request) if the orderedItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ordered-items")
    @Timed
    public ResponseEntity<OrderedItem> createOrderedItem(@Valid @RequestBody OrderedItem orderedItem) throws URISyntaxException {
        log.debug("REST request to save OrderedItem : {}", orderedItem);
        if (orderedItem.getId() != null) {
            throw new BadRequestAlertException("A new orderedItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderedItem result = orderedItemRepository.save(orderedItem);
        return ResponseEntity.created(new URI("/api/ordered-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ordered-items : Updates an existing orderedItem.
     *
     * @param orderedItem the orderedItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderedItem,
     * or with status 400 (Bad Request) if the orderedItem is not valid,
     * or with status 500 (Internal Server Error) if the orderedItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ordered-items")
    @Timed
    public ResponseEntity<OrderedItem> updateOrderedItem(@Valid @RequestBody OrderedItem orderedItem) throws URISyntaxException {
        log.debug("REST request to update OrderedItem : {}", orderedItem);
        if (orderedItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderedItem result = orderedItemRepository.save(orderedItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderedItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ordered-items : get all the orderedItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderedItems in body
     */
    @GetMapping("/ordered-items")
    @Timed
    public List<OrderedItem> getAllOrderedItems() {
        log.debug("REST request to get all OrderedItems");
        return orderedItemRepository.findAll();
    }

    /**
     * GET  /ordered-items/:id : get the "id" orderedItem.
     *
     * @param id the id of the orderedItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderedItem, or with status 404 (Not Found)
     */
    @GetMapping("/ordered-items/{id}")
    @Timed
    public ResponseEntity<OrderedItem> getOrderedItem(@PathVariable String id) {
        log.debug("REST request to get OrderedItem : {}", id);
        Optional<OrderedItem> orderedItem = orderedItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderedItem);
    }

    /**
     * DELETE  /ordered-items/:id : delete the "id" orderedItem.
     *
     * @param id the id of the orderedItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ordered-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderedItem(@PathVariable String id) {
        log.debug("REST request to delete OrderedItem : {}", id);

        orderedItemRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
