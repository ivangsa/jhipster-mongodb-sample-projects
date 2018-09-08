package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PaymentDetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PaymentDetails and its DTO PaymentDetailsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaymentDetailsMapper extends EntityMapper<PaymentDetailsDTO, PaymentDetails> {



    default PaymentDetails fromId(String id) {
        if (id == null) {
            return null;
        }
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setId(id);
        return paymentDetails;
    }
}
