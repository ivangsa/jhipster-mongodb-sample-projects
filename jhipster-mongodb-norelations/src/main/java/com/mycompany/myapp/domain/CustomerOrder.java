package com.mycompany.myapp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
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
