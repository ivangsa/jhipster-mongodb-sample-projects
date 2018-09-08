package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.OrderedItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderedItem and its DTO OrderedItemDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrderedItemMapper extends EntityMapper<OrderedItemDTO, OrderedItem> {



    default OrderedItem fromId(String id) {
        if (id == null) {
            return null;
        }
        OrderedItem orderedItem = new OrderedItem();
        orderedItem.setId(id);
        return orderedItem;
    }
}
