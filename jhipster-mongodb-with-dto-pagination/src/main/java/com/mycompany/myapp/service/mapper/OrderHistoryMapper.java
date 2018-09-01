package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.OrderHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderHistory and its DTO OrderHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerOrderMapper.class})
public interface OrderHistoryMapper extends EntityMapper<OrderHistoryDTO, OrderHistory> {

    @Mapping(source = "customerOrder.id", target = "customerOrderId")
    OrderHistoryDTO toDto(OrderHistory orderHistory);

    @Mapping(source = "customerOrderId", target = "customerOrder")
    OrderHistory toEntity(OrderHistoryDTO orderHistoryDTO);

    default OrderHistory fromId(String id) {
        if (id == null) {
            return null;
        }
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setId(id);
        return orderHistory;
    }
}
