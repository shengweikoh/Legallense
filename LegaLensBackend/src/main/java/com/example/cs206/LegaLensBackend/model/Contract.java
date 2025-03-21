package com.example.cs206.LegaLensBackend.model;

public class Contract {
    private String contractName;
    private String documentId;
    private boolean premiumPaid;
    private String fullText;
    private String summary;
    private String flag;
    private String suggest;
    private String dateUploaded; // Change to String for compatibility

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

    public String getFullText() {
        return fullText;
    }

    public void setFullText(String fullText) {
        this.fullText = fullText;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public boolean isPremiumPaid() {
        return premiumPaid;
    }

    public void setPremiumPaid(boolean premium) {
        this.premiumPaid = premium;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getSuggest() {
        return suggest;
    }

    public void setSuggest(String suggest) {
        this.suggest = suggest;
    }

    public String getDateUploaded() {
        return dateUploaded;
    }

    public void setDateUploaded() {
        this.dateUploaded = java.time.LocalDate.now().toString(); // Store as ISO-8601 string
    }
}
