package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterMongodbWithDtoPaginationApp;

import com.mycompany.myapp.domain.ShippingDetails;
import com.mycompany.myapp.repository.ShippingDetailsRepository;
import com.mycompany.myapp.service.ShippingDetailsService;
import com.mycompany.myapp.service.dto.ShippingDetailsDTO;
import com.mycompany.myapp.service.mapper.ShippingDetailsMapper;
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
 * Test class for the ShippingDetailsResource REST controller.
 *
 * @see ShippingDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterMongodbWithDtoPaginationApp.class)
public class ShippingDetailsResourceIntTest {

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private ShippingDetailsRepository shippingDetailsRepository;


    @Autowired
    private ShippingDetailsMapper shippingDetailsMapper;
    

    @Autowired
    private ShippingDetailsService shippingDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restShippingDetailsMockMvc;

    private ShippingDetails shippingDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShippingDetailsResource shippingDetailsResource = new ShippingDetailsResource(shippingDetailsService);
        this.restShippingDetailsMockMvc = MockMvcBuilders.standaloneSetup(shippingDetailsResource)
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
    public static ShippingDetails createEntity() {
        ShippingDetails shippingDetails = new ShippingDetails()
            .address(DEFAULT_ADDRESS);
        return shippingDetails;
    }

    @Before
    public void initTest() {
        shippingDetailsRepository.deleteAll();
        shippingDetails = createEntity();
    }

    @Test
    public void createShippingDetails() throws Exception {
        int databaseSizeBeforeCreate = shippingDetailsRepository.findAll().size();

        // Create the ShippingDetails
        ShippingDetailsDTO shippingDetailsDTO = shippingDetailsMapper.toDto(shippingDetails);
        restShippingDetailsMockMvc.perform(post("/api/shipping-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shippingDetailsDTO)))
            .andExpect(status().isCreated());

        // Validate the ShippingDetails in the database
        List<ShippingDetails> shippingDetailsList = shippingDetailsRepository.findAll();
        assertThat(shippingDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        ShippingDetails testShippingDetails = shippingDetailsList.get(shippingDetailsList.size() - 1);
        assertThat(testShippingDetails.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    public void createShippingDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shippingDetailsRepository.findAll().size();

        // Create the ShippingDetails with an existing ID
        shippingDetails.setId("existing_id");
        ShippingDetailsDTO shippingDetailsDTO = shippingDetailsMapper.toDto(shippingDetails);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShippingDetailsMockMvc.perform(post("/api/shipping-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shippingDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ShippingDetails in the database
        List<ShippingDetails> shippingDetailsList = shippingDetailsRepository.findAll();
        assertThat(shippingDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllShippingDetails() throws Exception {
        // Initialize the database
        shippingDetailsRepository.save(shippingDetails);

        // Get all the shippingDetailsList
        restShippingDetailsMockMvc.perform(get("/api/shipping-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shippingDetails.getId())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }
    

    @Test
    public void getShippingDetails() throws Exception {
        // Initialize the database
        shippingDetailsRepository.save(shippingDetails);

        // Get the shippingDetails
        restShippingDetailsMockMvc.perform(get("/api/shipping-details/{id}", shippingDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shippingDetails.getId()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }
    @Test
    public void getNonExistingShippingDetails() throws Exception {
        // Get the shippingDetails
        restShippingDetailsMockMvc.perform(get("/api/shipping-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateShippingDetails() throws Exception {
        // Initialize the database
        shippingDetailsRepository.save(shippingDetails);

        int databaseSizeBeforeUpdate = shippingDetailsRepository.findAll().size();

        // Update the shippingDetails
        ShippingDetails updatedShippingDetails = shippingDetailsRepository.findById(shippingDetails.getId()).get();
        updatedShippingDetails
            .address(UPDATED_ADDRESS);
        ShippingDetailsDTO shippingDetailsDTO = shippingDetailsMapper.toDto(updatedShippingDetails);

        restShippingDetailsMockMvc.perform(put("/api/shipping-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shippingDetailsDTO)))
            .andExpect(status().isOk());

        // Validate the ShippingDetails in the database
        List<ShippingDetails> shippingDetailsList = shippingDetailsRepository.findAll();
        assertThat(shippingDetailsList).hasSize(databaseSizeBeforeUpdate);
        ShippingDetails testShippingDetails = shippingDetailsList.get(shippingDetailsList.size() - 1);
        assertThat(testShippingDetails.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    public void updateNonExistingShippingDetails() throws Exception {
        int databaseSizeBeforeUpdate = shippingDetailsRepository.findAll().size();

        // Create the ShippingDetails
        ShippingDetailsDTO shippingDetailsDTO = shippingDetailsMapper.toDto(shippingDetails);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restShippingDetailsMockMvc.perform(put("/api/shipping-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shippingDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ShippingDetails in the database
        List<ShippingDetails> shippingDetailsList = shippingDetailsRepository.findAll();
        assertThat(shippingDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteShippingDetails() throws Exception {
        // Initialize the database
        shippingDetailsRepository.save(shippingDetails);

        int databaseSizeBeforeDelete = shippingDetailsRepository.findAll().size();

        // Get the shippingDetails
        restShippingDetailsMockMvc.perform(delete("/api/shipping-details/{id}", shippingDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ShippingDetails> shippingDetailsList = shippingDetailsRepository.findAll();
        assertThat(shippingDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShippingDetails.class);
        ShippingDetails shippingDetails1 = new ShippingDetails();
        shippingDetails1.setId("id1");
        ShippingDetails shippingDetails2 = new ShippingDetails();
        shippingDetails2.setId(shippingDetails1.getId());
        assertThat(shippingDetails1).isEqualTo(shippingDetails2);
        shippingDetails2.setId("id2");
        assertThat(shippingDetails1).isNotEqualTo(shippingDetails2);
        shippingDetails1.setId(null);
        assertThat(shippingDetails1).isNotEqualTo(shippingDetails2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShippingDetailsDTO.class);
        ShippingDetailsDTO shippingDetailsDTO1 = new ShippingDetailsDTO();
        shippingDetailsDTO1.setId("id1");
        ShippingDetailsDTO shippingDetailsDTO2 = new ShippingDetailsDTO();
        assertThat(shippingDetailsDTO1).isNotEqualTo(shippingDetailsDTO2);
        shippingDetailsDTO2.setId(shippingDetailsDTO1.getId());
        assertThat(shippingDetailsDTO1).isEqualTo(shippingDetailsDTO2);
        shippingDetailsDTO2.setId("id2");
        assertThat(shippingDetailsDTO1).isNotEqualTo(shippingDetailsDTO2);
        shippingDetailsDTO1.setId(null);
        assertThat(shippingDetailsDTO1).isNotEqualTo(shippingDetailsDTO2);
    }
}
