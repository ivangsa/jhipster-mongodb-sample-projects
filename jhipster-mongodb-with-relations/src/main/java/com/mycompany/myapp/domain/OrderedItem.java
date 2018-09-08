package com.mycompany.myapp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A OrderedItem.
 */
@Document(collection = "ordered_item")
public class OrderedItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("catalog_item_id")
    private Long catalogItemId;

    @NotNull
    @Size(min = 3, max = 250)
    @Field("name")
    private String name;

    @NotNull
    @Field("price")
    private BigDecimal price;

    @Field("quantity")
    private Integer quantity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getCatalogItemId() {
        return catalogItemId;
    }

    public OrderedItem catalogItemId(Long catalogItemId) {
        this.catalogItemId = catalogItemId;
        return this;
    }

    public void setCatalogItemId(Long catalogItemId) {
        this.catalogItemId = catalogItemId;
    }

    public String getName() {
        return name;
    }

    public OrderedItem name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public OrderedItem price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public OrderedItem quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
        OrderedItem orderedItem = (OrderedItem) o;
        if (orderedItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderedItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderedItem{" +
            "id=" + getId() +
            ", catalogItemId=" + getCatalogItemId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
