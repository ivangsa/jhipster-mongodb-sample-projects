package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.ShippingDetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ShippingDetails and its DTO ShippingDetailsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ShippingDetailsMapper extends EntityMapper<ShippingDetailsDTO, ShippingDetails> {



    default ShippingDetails fromId(String id) {
        if (id == null) {
            return null;
        }
        ShippingDetails shippingDetails = new ShippingDetails();
        shippingDetails.setId(id);
        return shippingDetails;
    }
}
