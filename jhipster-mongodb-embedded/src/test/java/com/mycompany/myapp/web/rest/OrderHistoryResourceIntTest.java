package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterMongodbEmbeddedApp;

import com.mycompany.myapp.domain.OrderHistory;
import com.mycompany.myapp.repository.OrderHistoryRepository;
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

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.OrderStatus;
/**
 * Test class for the OrderHistoryResource REST controller.
 *
 * @see OrderHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterMongodbEmbeddedApp.class)
public class OrderHistoryResourceIntTest {

    private static final Instant DEFAULT_EVENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EVENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final OrderStatus DEFAULT_NEW_STATUS = OrderStatus.CONFIRMED;
    private static final OrderStatus UPDATED_NEW_STATUS = OrderStatus.SHIPPED;

    @Autowired
    private OrderHistoryRepository orderHistoryRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restOrderHistoryMockMvc;

    private OrderHistory orderHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderHistoryResource orderHistoryResource = new OrderHistoryResource(orderHistoryRepository);
        this.restOrderHistoryMockMvc = MockMvcBuilders.standaloneSetup(orderHistoryResource)
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
    public static OrderHistory createEntity() {
        OrderHistory orderHistory = new OrderHistory()
            .eventDate(DEFAULT_EVENT_DATE)
            .newStatus(DEFAULT_NEW_STATUS);
        return orderHistory;
    }

    @Before
    public void initTest() {
        orderHistoryRepository.deleteAll();
        orderHistory = createEntity();
    }

    @Test
    public void createOrderHistory() throws Exception {
        int databaseSizeBeforeCreate = orderHistoryRepository.findAll().size();

        // Create the OrderHistory
        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistory)))
            .andExpect(status().isCreated());

        // Validate the OrderHistory in the database
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        OrderHistory testOrderHistory = orderHistoryList.get(orderHistoryList.size() - 1);
        assertThat(testOrderHistory.getEventDate()).isEqualTo(DEFAULT_EVENT_DATE);
        assertThat(testOrderHistory.getNewStatus()).isEqualTo(DEFAULT_NEW_STATUS);
    }

    @Test
    public void createOrderHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderHistoryRepository.findAll().size();

        // Create the OrderHistory with an existing ID
        orderHistory.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderHistoryMockMvc.perform(post("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistory)))
            .andExpect(status().isBadRequest());

        // Validate the OrderHistory in the database
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllOrderHistories() throws Exception {
        // Initialize the database
        orderHistoryRepository.save(orderHistory);

        // Get all the orderHistoryList
        restOrderHistoryMockMvc.perform(get("/api/order-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderHistory.getId())))
            .andExpect(jsonPath("$.[*].eventDate").value(hasItem(DEFAULT_EVENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].newStatus").value(hasItem(DEFAULT_NEW_STATUS.toString())));
    }
    

    @Test
    public void getOrderHistory() throws Exception {
        // Initialize the database
        orderHistoryRepository.save(orderHistory);

        // Get the orderHistory
        restOrderHistoryMockMvc.perform(get("/api/order-histories/{id}", orderHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderHistory.getId()))
            .andExpect(jsonPath("$.eventDate").value(DEFAULT_EVENT_DATE.toString()))
            .andExpect(jsonPath("$.newStatus").value(DEFAULT_NEW_STATUS.toString()));
    }
    @Test
    public void getNonExistingOrderHistory() throws Exception {
        // Get the orderHistory
        restOrderHistoryMockMvc.perform(get("/api/order-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrderHistory() throws Exception {
        // Initialize the database
        orderHistoryRepository.save(orderHistory);

        int databaseSizeBeforeUpdate = orderHistoryRepository.findAll().size();

        // Update the orderHistory
        OrderHistory updatedOrderHistory = orderHistoryRepository.findById(orderHistory.getId()).get();
        updatedOrderHistory
            .eventDate(UPDATED_EVENT_DATE)
            .newStatus(UPDATED_NEW_STATUS);

        restOrderHistoryMockMvc.perform(put("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderHistory)))
            .andExpect(status().isOk());

        // Validate the OrderHistory in the database
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeUpdate);
        OrderHistory testOrderHistory = orderHistoryList.get(orderHistoryList.size() - 1);
        assertThat(testOrderHistory.getEventDate()).isEqualTo(UPDATED_EVENT_DATE);
        assertThat(testOrderHistory.getNewStatus()).isEqualTo(UPDATED_NEW_STATUS);
    }

    @Test
    public void updateNonExistingOrderHistory() throws Exception {
        int databaseSizeBeforeUpdate = orderHistoryRepository.findAll().size();

        // Create the OrderHistory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderHistoryMockMvc.perform(put("/api/order-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderHistory)))
            .andExpect(status().isBadRequest());

        // Validate the OrderHistory in the database
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOrderHistory() throws Exception {
        // Initialize the database
        orderHistoryRepository.save(orderHistory);

        int databaseSizeBeforeDelete = orderHistoryRepository.findAll().size();

        // Get the orderHistory
        restOrderHistoryMockMvc.perform(delete("/api/order-histories/{id}", orderHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderHistory> orderHistoryList = orderHistoryRepository.findAll();
        assertThat(orderHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderHistory.class);
        OrderHistory orderHistory1 = new OrderHistory();
        orderHistory1.setId("id1");
        OrderHistory orderHistory2 = new OrderHistory();
        orderHistory2.setId(orderHistory1.getId());
        assertThat(orderHistory1).isEqualTo(orderHistory2);
        orderHistory2.setId("id2");
        assertThat(orderHistory1).isNotEqualTo(orderHistory2);
        orderHistory1.setId(null);
        assertThat(orderHistory1).isNotEqualTo(orderHistory2);
    }
}
