package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.CustomerOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerOrder and its DTO CustomerOrderDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, PaymentDetailsMapper.class, ShippingDetailsMapper.class, OrderedItemMapper.class})
public interface CustomerOrderMapper extends EntityMapper<CustomerOrderDTO, CustomerOrder> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "paymentDetails.id", target = "paymentDetailsId")
    @Mapping(source = "shippingDetails.id", target = "shippingDetailsId")
    CustomerOrderDTO toDto(CustomerOrder customerOrder);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "paymentDetailsId", target = "paymentDetails")
    @Mapping(source = "shippingDetailsId", target = "shippingDetails")
    CustomerOrder toEntity(CustomerOrderDTO customerOrderDTO);

    default CustomerOrder fromId(String id) {
        if (id == null) {
            return null;
        }
        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setId(id);
        return customerOrder;
    }
}
