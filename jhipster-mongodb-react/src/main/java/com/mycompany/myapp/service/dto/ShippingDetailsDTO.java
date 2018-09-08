package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ShippingDetails entity.
 */
public class ShippingDetailsDTO implements Serializable {

    private String id;

    private String address;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ShippingDetailsDTO shippingDetailsDTO = (ShippingDetailsDTO) o;
        if (shippingDetailsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shippingDetailsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShippingDetailsDTO{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
