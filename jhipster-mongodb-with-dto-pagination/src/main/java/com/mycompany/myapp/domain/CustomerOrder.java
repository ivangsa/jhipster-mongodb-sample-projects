package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.OrderStatus;

/**
 * A CustomerOrder.
 */
@Document(collection = "customer_order")
public class CustomerOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("date")
    private Instant date;

    @Field("status")
    private OrderStatus status;

    @DBRef
    @Field("paymentDetails")
    private PaymentDetails paymentDetails;

    @DBRef
    @Field("customer")
    @JsonIgnoreProperties("")
    private Customer customer;

    @DBRef
    @Field("shippingDetails")
    @JsonIgnoreProperties("")
    private ShippingDetails shippingDetails;

    @DBRef
    @Field("orderedItems")
    private Set<OrderedItem> orderedItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public CustomerOrder date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public CustomerOrder status(OrderStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public PaymentDetails getPaymentDetails() {
        return paymentDetails;
    }

    public CustomerOrder paymentDetails(PaymentDetails paymentDetails) {
        this.paymentDetails = paymentDetails;
        return this;
    }

    public void setPaymentDetails(PaymentDetails paymentDetails) {
        this.paymentDetails = paymentDetails;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CustomerOrder customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public ShippingDetails getShippingDetails() {
        return shippingDetails;
    }

    public CustomerOrder shippingDetails(ShippingDetails shippingDetails) {
        this.shippingDetails = shippingDetails;
        return this;
    }

    public void setShippingDetails(ShippingDetails shippingDetails) {
        this.shippingDetails = shippingDetails;
    }

    public Set<OrderedItem> getOrderedItems() {
        return orderedItems;
    }

    public CustomerOrder orderedItems(Set<OrderedItem> orderedItems) {
        this.orderedItems = orderedItems;
        return this;
    }

    public CustomerOrder addOrderedItems(OrderedItem orderedItem) {
        this.orderedItems.add(orderedItem);
        return this;
    }

    public CustomerOrder removeOrderedItems(OrderedItem orderedItem) {
        this.orderedItems.remove(orderedItem);
        return this;
    }

    public void setOrderedItems(Set<OrderedItem> orderedItems) {
        this.orderedItems = orderedItems;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CustomerOrder customerOrder = (CustomerOrder) o;
        if (customerOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerOrder{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
