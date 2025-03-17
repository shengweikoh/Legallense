package com.example.cs206.LegaLensBackend.model;

import java.util.Date;


public class User {
    private String userId;
    private String email;
    private String name;
    private Date dateOfBirth;
    private Integer freeUses;
    private Long phoneNumber;

    public User() {

    }

    public User(String userId, String email, String name, Date dateOfBirth, 
                Integer freeUses, Long phoneNumber) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.freeUses = freeUses;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }
    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getFreeUses() {
        return freeUses;
    }
    public void setFreeUses(Integer freeUses) {
        this.freeUses = freeUses;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
