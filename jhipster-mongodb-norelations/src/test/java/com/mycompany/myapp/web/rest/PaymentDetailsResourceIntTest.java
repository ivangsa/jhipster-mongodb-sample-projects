package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterMongodbNorelationsApp;

import com.mycompany.myapp.domain.PaymentDetails;
import com.mycompany.myapp.repository.PaymentDetailsRepository;
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

import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PaymentDetailsResource REST controller.
 *
 * @see PaymentDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterMongodbNorelationsApp.class)
public class PaymentDetailsResourceIntTest {

    private static final String DEFAULT_CREDIT_CARD_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_CREDIT_CARD_NUMBER = "BBBBBBBBBB";

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restPaymentDetailsMockMvc;

    private PaymentDetails paymentDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PaymentDetailsResource paymentDetailsResource = new PaymentDetailsResource(paymentDetailsRepository);
        this.restPaymentDetailsMockMvc = MockMvcBuilders.standaloneSetup(paymentDetailsResource)
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
    public static PaymentDetails createEntity() {
        PaymentDetails paymentDetails = new PaymentDetails()
            .creditCardNumber(DEFAULT_CREDIT_CARD_NUMBER);
        return paymentDetails;
    }

    @Before
    public void initTest() {
        paymentDetailsRepository.deleteAll();
        paymentDetails = createEntity();
    }

    @Test
    public void createPaymentDetails() throws Exception {
        int databaseSizeBeforeCreate = paymentDetailsRepository.findAll().size();

        // Create the PaymentDetails
        restPaymentDetailsMockMvc.perform(post("/api/payment-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentDetails)))
            .andExpect(status().isCreated());

        // Validate the PaymentDetails in the database
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentDetails testPaymentDetails = paymentDetailsList.get(paymentDetailsList.size() - 1);
        assertThat(testPaymentDetails.getCreditCardNumber()).isEqualTo(DEFAULT_CREDIT_CARD_NUMBER);
    }

    @Test
    public void createPaymentDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paymentDetailsRepository.findAll().size();

        // Create the PaymentDetails with an existing ID
        paymentDetails.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentDetailsMockMvc.perform(post("/api/payment-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentDetails)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentDetails in the database
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllPaymentDetails() throws Exception {
        // Initialize the database
        paymentDetailsRepository.save(paymentDetails);

        // Get all the paymentDetailsList
        restPaymentDetailsMockMvc.perform(get("/api/payment-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentDetails.getId())))
            .andExpect(jsonPath("$.[*].creditCardNumber").value(hasItem(DEFAULT_CREDIT_CARD_NUMBER.toString())));
    }
    

    @Test
    public void getPaymentDetails() throws Exception {
        // Initialize the database
        paymentDetailsRepository.save(paymentDetails);

        // Get the paymentDetails
        restPaymentDetailsMockMvc.perform(get("/api/payment-details/{id}", paymentDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paymentDetails.getId()))
            .andExpect(jsonPath("$.creditCardNumber").value(DEFAULT_CREDIT_CARD_NUMBER.toString()));
    }
    @Test
    public void getNonExistingPaymentDetails() throws Exception {
        // Get the paymentDetails
        restPaymentDetailsMockMvc.perform(get("/api/payment-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePaymentDetails() throws Exception {
        // Initialize the database
        paymentDetailsRepository.save(paymentDetails);

        int databaseSizeBeforeUpdate = paymentDetailsRepository.findAll().size();

        // Update the paymentDetails
        PaymentDetails updatedPaymentDetails = paymentDetailsRepository.findById(paymentDetails.getId()).get();
        updatedPaymentDetails
            .creditCardNumber(UPDATED_CREDIT_CARD_NUMBER);

        restPaymentDetailsMockMvc.perform(put("/api/payment-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaymentDetails)))
            .andExpect(status().isOk());

        // Validate the PaymentDetails in the database
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeUpdate);
        PaymentDetails testPaymentDetails = paymentDetailsList.get(paymentDetailsList.size() - 1);
        assertThat(testPaymentDetails.getCreditCardNumber()).isEqualTo(UPDATED_CREDIT_CARD_NUMBER);
    }

    @Test
    public void updateNonExistingPaymentDetails() throws Exception {
        int databaseSizeBeforeUpdate = paymentDetailsRepository.findAll().size();

        // Create the PaymentDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restPaymentDetailsMockMvc.perform(put("/api/payment-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentDetails)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentDetails in the database
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePaymentDetails() throws Exception {
        // Initialize the database
        paymentDetailsRepository.save(paymentDetails);

        int databaseSizeBeforeDelete = paymentDetailsRepository.findAll().size();

        // Get the paymentDetails
        restPaymentDetailsMockMvc.perform(delete("/api/payment-details/{id}", paymentDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentDetails.class);
        PaymentDetails paymentDetails1 = new PaymentDetails();
        paymentDetails1.setId("id1");
        PaymentDetails paymentDetails2 = new PaymentDetails();
        paymentDetails2.setId(paymentDetails1.getId());
        assertThat(paymentDetails1).isEqualTo(paymentDetails2);
        paymentDetails2.setId("id2");
        assertThat(paymentDetails1).isNotEqualTo(paymentDetails2);
        paymentDetails1.setId(null);
        assertThat(paymentDetails1).isNotEqualTo(paymentDetails2);
    }
}
