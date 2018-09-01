package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterMongodbEmbeddedApp;

import com.mycompany.myapp.domain.OrderedItem;
import com.mycompany.myapp.repository.OrderedItemRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrderedItemResource REST controller.
 *
 * @see OrderedItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterMongodbEmbeddedApp.class)
public class OrderedItemResourceIntTest {

    private static final Long DEFAULT_CATALOG_ITEM_ID = 1L;
    private static final Long UPDATED_CATALOG_ITEM_ID = 2L;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private OrderedItemRepository orderedItemRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderedItemMockMvc;

    private OrderedItem orderedItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderedItemResource orderedItemResource = new OrderedItemResource(orderedItemRepository);
        this.restOrderedItemMockMvc = MockMvcBuilders.standaloneSetup(orderedItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderedItem createEntity() {
        OrderedItem orderedItem = new OrderedItem()
            .catalogItemId(DEFAULT_CATALOG_ITEM_ID)
            .name(DEFAULT_NAME)
            .price(DEFAULT_PRICE)
            .quantity(DEFAULT_QUANTITY);
        return orderedItem;
    }

    @Before
    public void initTest() {
        orderedItemRepository.deleteAll();
        orderedItem = createEntity();
    }

    @Test
    public void createOrderedItem() throws Exception {
        int databaseSizeBeforeCreate = orderedItemRepository.findAll().size();

        // Create the OrderedItem
        restOrderedItemMockMvc.perform(post("/api/ordered-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderedItem)))
            .andExpect(status().isCreated());

        // Validate the OrderedItem in the database
        List<OrderedItem> orderedItemList = orderedItemRepository.findAll();
        assertThat(orderedItemList).hasSize(databaseSizeBeforeCreate + 1);
        OrderedItem testOrderedItem = orderedItemList.get(orderedItemList.size() - 1);
        assertThat(testOrderedItem.getCatalogItemId()).isEqualTo(DEFAULT_CATALOG_ITEM_ID);
        assertThat(testOrderedItem.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOrderedItem.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testOrderedItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    public void createOrderedItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderedItemRepository.findAll().size();

        // Create the OrderedItem with an existing ID
        orderedItem.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderedItemMockMvc.perform(post("/api/ordered-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderedItem)))
            .andExpect(status().isBadRequest());

        // Validate the OrderedItem in the database
        List<OrderedItem> orderedItemList = orderedItemRepository.findAll();
        assertThat(orderedItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderedItemRepository.findAll().size();
        // set the field null
        orderedItem.setName(null);

        // Create the OrderedItem, which fails.

        restOrderedItemMockMvc.perform(post("/api/ordered-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderedItem)))
            .andExpect(status().isBadRequest());

        List<OrderedItem> orderedItemList = orderedItemRepository.findAll();
        assertThat(orderedItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderedItemRepository.findAll().size();
        // set the field null
        orderedItem.setPrice(null);

        // Create the OrderedItem, which fails.

        restOrderedItemMockMvc.perform(post("/api/ordered-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderedItem)))
            .andExpect(status().isBadRequest());

        List<OrderedItem> orderedItemList = orderedItemRepository.findAll();
        assertThat(orderedItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllOrderedItems() throws Exception {
        // Initialize the database
        orderedItemRepository.save(orderedItem);

        // Get all the orderedItemList
        restOrderedItemMockMvc.perform(get("/api/ordered-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderedItem.getId())))
            .andExpect(jsonPath("$.[*].catalogItemId").value(hasItem(DEFAULT_CATALOG_ITEM_ID.intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    

    @Test
    public void getOrderedItem() throws Exception {
        // Initialize the database
        orderedItemRepository.save(orderedItem);

        // Get the orderedItem
        restOrderedItemMockMvc.perform(get("/api/ordered-items/{id}", orderedItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderedItem.getId()))
            .andExpect(jsonPath("$.catalogItemId").value(DEFAULT_CATALOG_ITEM_ID.intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }
    @Test
    public void getNonExistingOrderedItem() throws Exception {
        // Get the orderedItem
        restOrderedItemMockMvc.perform(get("/api/ordered-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrderedItem() throws Exception {
        // Initialize the database
        orderedItemRepository.save(orderedItem);

        int databaseSizeBeforeUpdate = orderedItemRepository.findAll().size();

        // Update the orderedItem
        OrderedItem updatedOrderedItem = orderedItemRepository.findById(orderedItem.getId()).get();
        updatedOrderedItem
            .catalogItemId(UPDATED_CATALOG_ITEM_ID)
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE)
            .quantity(UPDATED_QUANTITY);

        restOrderedItemMockMvc.perform(put("/api/ordered-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderedItem)))
            .andExpect(status().isOk());

        // Validate the OrderedItem in the database
        List<OrderedItem> orderedItemList = orderedItemRepository.findAll();
        assertThat(orderedItemList).hasSize(databaseSizeBeforeUpdate);
        OrderedItem testOrderedItem = orderedItemList.get(orderedItemList.size() - 1);
        assertThat(testOrderedItem.getCatalogItemId()).isEqualTo(UPDATED_CATALOG_ITEM_ID);
        assertThat(testOrderedItem.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOrderedItem.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testOrderedItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    public void updateNonExistingOrderedItem() throws Exception {
        int databaseSizeBeforeUpdate = orderedItemRepository.findAll().size();

        // Create the OrderedItem

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderedItemMockMvc.perform(put("/api/ordered-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderedItem)))
            .andExpect(status().isBadRequest());

        // Validate the OrderedItem in the database
        List<OrderedItem> orderedItemList = orderedItemRepository.findAll();
        assertThat(orderedItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrderedItem() throws Exception {
        // Initialize the database
        orderedItemRepository.save(orderedItem);

        int databaseSizeBeforeDelete = orderedItemRepository.findAll().size();

        // Get the orderedItem
        restOrderedItemMockMvc.perform(delete("/api/ordered-items/{id}", orderedItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderedItem> orderedItemList = orderedItemRepository.findAll();
        assertThat(orderedItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderedItem.class);
        OrderedItem orderedItem1 = new OrderedItem();
        orderedItem1.setId("id1");
        OrderedItem orderedItem2 = new OrderedItem();
        orderedItem2.setId(orderedItem1.getId());
        assertThat(orderedItem1).isEqualTo(orderedItem2);
        orderedItem2.setId("id2");
        assertThat(orderedItem1).isNotEqualTo(orderedItem2);
        orderedItem1.setId(null);
        assertThat(orderedItem1).isNotEqualTo(orderedItem2);
    }
}
