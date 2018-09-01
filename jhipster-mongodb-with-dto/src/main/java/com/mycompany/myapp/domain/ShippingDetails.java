package com.mycompany.myapp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ShippingDetails.
 */
@Document(collection = "shipping_details")
public class ShippingDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("address")
    private String address;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public ShippingDetails address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
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
        ShippingDetails shippingDetails = (ShippingDetails) o;
        if (shippingDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shippingDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShippingDetails{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
