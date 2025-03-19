package com.example.cs206.LegaLensBackend.dto;

public class ContractDetailsDTO {
    private String contractName;
    private String documentId;
    private String dateUploaded; // Change to String for compatibility
    private boolean isPremium;

    // Constructor
    public ContractDetailsDTO(String contractName, String documentId, String dateUploaded, boolean isPremium) {
        this.contractName = contractName;
        this.documentId = documentId;
        this.dateUploaded = dateUploaded;
        this.isPremium = isPremium;
    }

    // Getters and Setters
    public String getContractName() {
        return contractName;
    }

    public void setContractName(String contractName) {
        this.contractName = contractName;
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public String getDateUploaded() {
        return dateUploaded;
    }

    public void setDateUploaded(String dateUploaded) {
        this.dateUploaded = dateUploaded;
    }

    public boolean isPremium() {
        return isPremium;
    }

    public void setPremium(boolean premium) {
        isPremium = premium;
    }
}
