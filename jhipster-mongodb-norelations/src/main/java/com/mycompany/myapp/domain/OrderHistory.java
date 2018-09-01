package com.mycompany.myapp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.OrderStatus;

/**
 * A OrderHistory.
 */
@Document(collection = "order_history")
public class OrderHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("event_date")
    private Instant eventDate;

    @Field("new_status")
    private OrderStatus newStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getEventDate() {
        return eventDate;
    }

    public OrderHistory eventDate(Instant eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(Instant eventDate) {
        this.eventDate = eventDate;
    }

    public OrderStatus getNewStatus() {
        return newStatus;
    }

    public OrderHistory newStatus(OrderStatus newStatus) {
        this.newStatus = newStatus;
        return this;
    }

    public void setNewStatus(OrderStatus newStatus) {
        this.newStatus = newStatus;
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
        OrderHistory orderHistory = (OrderHistory) o;
        if (orderHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderHistory{" +
            "id=" + getId() +
            ", eventDate='" + getEventDate() + "'" +
            ", newStatus='" + getNewStatus() + "'" +
            "}";
    }
}
