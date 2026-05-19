package com.medimart.server.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String composition;

    @Column(length = 1000)
    private String description;

    private String alternateMedicine;

    private int quantity;

    private double price;

    private LocalDate expiryDate;

    public Medicine() {
    }

    public Medicine(Long id,
                String name,
                String composition,
                String description,
                String alternateMedicine,
                int quantity,
                double price,
                LocalDate expiryDate) {

    this.id = id;
    this.name = name;
    this.composition = composition;
    this.description = description;
    this.alternateMedicine = alternateMedicine;
    this.quantity = quantity;
    this.price = price;
    this.expiryDate = expiryDate;
}

    // GETTERS & SETTERS

    // GETTERS

public Long getId() {
    return id;
}

public String getName() {
    return name;
}

public String getComposition() {
    return composition;
}

public String getDescription() {
    return description;
}

public String getAlternateMedicine() {
    return alternateMedicine;
}

public int getQuantity() {
    return quantity;
}

public double getPrice() {
    return price;
}

public LocalDate getExpiryDate() {
    return expiryDate;
}


// SETTERS

public void setId(Long id) {
    this.id = id;
}

public void setName(String name) {
    this.name = name;
}

public void setComposition(String composition) {
    this.composition = composition;
}

public void setDescription(String description) {
    this.description = description;
}

public void setAlternateMedicine(String alternateMedicine) {
    this.alternateMedicine = alternateMedicine;
}

public void setQuantity(int quantity) {
    this.quantity = quantity;
}

public void setPrice(double price) {
    this.price = price;
}

public void setExpiryDate(LocalDate expiryDate) {
    this.expiryDate = expiryDate;
}

}