package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.CustomerOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerOrder and its DTO CustomerOrderDTO.
 */
@Mapper(componentModel = "spring", uses = {PaymentDetailsMapper.class, CustomerMapper.class, ShippingDetailsMapper.class, OrderedItemMapper.class})
public interface CustomerOrderMapper extends EntityMapper<CustomerOrderDTO, CustomerOrder> {

    @Mapping(source = "paymentDetails.id", target = "paymentDetailsId")
    @Mapping(source = "paymentDetails.creditCardNumber", target = "paymentDetailsCreditCardNumber")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.username", target = "customerUsername")
    @Mapping(source = "shippingDetails.id", target = "shippingDetailsId")
    @Mapping(source = "shippingDetails.address", target = "shippingDetailsAddress")
    CustomerOrderDTO toDto(CustomerOrder customerOrder);

    @Mapping(source = "paymentDetailsId", target = "paymentDetails")
    @Mapping(source = "customerId", target = "customer")
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
