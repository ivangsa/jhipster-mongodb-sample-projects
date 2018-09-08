package com.mycompany.myapp.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.OrderStatus;

/**
 * A DTO for the CustomerOrder entity.
 */
public class CustomerOrderDTO implements Serializable {

    private String id;

    private Instant date;

    private OrderStatus status;

    private String paymentDetailsId;

    private String paymentDetailsCreditCardNumber;

    private String customerId;

    private String customerUsername;

    private String shippingDetailsId;

    private String shippingDetailsAddress;

    private Set<OrderedItemDTO> orderedItems = new HashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getPaymentDetailsId() {
        return paymentDetailsId;
    }

    public void setPaymentDetailsId(String paymentDetailsId) {
        this.paymentDetailsId = paymentDetailsId;
    }

    public String getPaymentDetailsCreditCardNumber() {
        return paymentDetailsCreditCardNumber;
    }

    public void setPaymentDetailsCreditCardNumber(String paymentDetailsCreditCardNumber) {
        this.paymentDetailsCreditCardNumber = paymentDetailsCreditCardNumber;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerUsername() {
        return customerUsername;
    }

    public void setCustomerUsername(String customerUsername) {
        this.customerUsername = customerUsername;
    }

    public String getShippingDetailsId() {
        return shippingDetailsId;
    }

    public void setShippingDetailsId(String shippingDetailsId) {
        this.shippingDetailsId = shippingDetailsId;
    }

    public String getShippingDetailsAddress() {
        return shippingDetailsAddress;
    }

    public void setShippingDetailsAddress(String shippingDetailsAddress) {
        this.shippingDetailsAddress = shippingDetailsAddress;
    }

    public Set<OrderedItemDTO> getOrderedItems() {
        return orderedItems;
    }

    public void setOrderedItems(Set<OrderedItemDTO> orderedItems) {
        this.orderedItems = orderedItems;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerOrderDTO customerOrderDTO = (CustomerOrderDTO) o;
        if (customerOrderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerOrderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerOrderDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", paymentDetails=" + getPaymentDetailsId() +
            ", paymentDetails='" + getPaymentDetailsCreditCardNumber() + "'" +
            ", customer=" + getCustomerId() +
            ", customer='" + getCustomerUsername() + "'" +
            ", shippingDetails=" + getShippingDetailsId() +
            ", shippingDetails='" + getShippingDetailsAddress() + "'" +
            "}";
    }
}
