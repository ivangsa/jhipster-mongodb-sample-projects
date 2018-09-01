package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterMongodbNorelationsApp;

import com.mycompany.myapp.domain.CustomerOrder;
import com.mycompany.myapp.repository.CustomerOrderRepository;
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
 * Test class for the CustomerOrderResource REST controller.
 *
 * @see CustomerOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterMongodbNorelationsApp.class)
public class CustomerOrderResourceIntTest {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final OrderStatus DEFAULT_STATUS = OrderStatus.CONFIRMED;
    private static final OrderStatus UPDATED_STATUS = OrderStatus.SHIPPED;

    @Autowired
    private CustomerOrderRepository customerOrderRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCustomerOrderMockMvc;

    private CustomerOrder customerOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerOrderResource customerOrderResource = new CustomerOrderResource(customerOrderRepository);
        this.restCustomerOrderMockMvc = MockMvcBuilders.standaloneSetup(customerOrderResource)
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
    public static CustomerOrder createEntity() {
        CustomerOrder customerOrder = new CustomerOrder()
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS);
        return customerOrder;
    }

    @Before
    public void initTest() {
        customerOrderRepository.deleteAll();
        customerOrder = createEntity();
    }

    @Test
    public void createCustomerOrder() throws Exception {
        int databaseSizeBeforeCreate = customerOrderRepository.findAll().size();

        // Create the CustomerOrder
        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isCreated());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerOrder testCustomerOrder = customerOrderList.get(customerOrderList.size() - 1);
        assertThat(testCustomerOrder.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testCustomerOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    public void createCustomerOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerOrderRepository.findAll().size();

        // Create the CustomerOrder with an existing ID
        customerOrder.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCustomerOrders() throws Exception {
        // Initialize the database
        customerOrderRepository.save(customerOrder);

        // Get all the customerOrderList
        restCustomerOrderMockMvc.perform(get("/api/customer-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerOrder.getId())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    

    @Test
    public void getCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.save(customerOrder);

        // Get the customerOrder
        restCustomerOrderMockMvc.perform(get("/api/customer-orders/{id}", customerOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerOrder.getId()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    public void getNonExistingCustomerOrder() throws Exception {
        // Get the customerOrder
        restCustomerOrderMockMvc.perform(get("/api/customer-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.save(customerOrder);

        int databaseSizeBeforeUpdate = customerOrderRepository.findAll().size();

        // Update the customerOrder
        CustomerOrder updatedCustomerOrder = customerOrderRepository.findById(customerOrder.getId()).get();
        updatedCustomerOrder
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS);

        restCustomerOrderMockMvc.perform(put("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerOrder)))
            .andExpect(status().isOk());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeUpdate);
        CustomerOrder testCustomerOrder = customerOrderList.get(customerOrderList.size() - 1);
        assertThat(testCustomerOrder.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testCustomerOrder.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    public void updateNonExistingCustomerOrder() throws Exception {
        int databaseSizeBeforeUpdate = customerOrderRepository.findAll().size();

        // Create the CustomerOrder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCustomerOrderMockMvc.perform(put("/api/customer-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.save(customerOrder);

        int databaseSizeBeforeDelete = customerOrderRepository.findAll().size();

        // Get the customerOrder
        restCustomerOrderMockMvc.perform(delete("/api/customer-orders/{id}", customerOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerOrder.class);
        CustomerOrder customerOrder1 = new CustomerOrder();
        customerOrder1.setId("id1");
        CustomerOrder customerOrder2 = new CustomerOrder();
        customerOrder2.setId(customerOrder1.getId());
        assertThat(customerOrder1).isEqualTo(customerOrder2);
        customerOrder2.setId("id2");
        assertThat(customerOrder1).isNotEqualTo(customerOrder2);
        customerOrder1.setId(null);
        assertThat(customerOrder1).isNotEqualTo(customerOrder2);
    }
}
