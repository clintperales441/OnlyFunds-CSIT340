package com.onlyfunds.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationCreateDTO {
    
    @NotBlank(message = "Campaign ID is required")
    private String campaignId;
    
    private String userId; // Optional - null for anonymous donations
    
    @NotNull(message = "Donation amount is required")
    private Double amount;
    
    @NotBlank(message = "Payment method is required")
    private String paymentMethod;
    
    // Donor Info
    @NotBlank(message = "First name is required")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    private String lastName;
    
    @NotBlank(message = "Email is required")
    private String email;
    
    private String phoneNumber;
    private String message;
    
    // Card Info
    @NotBlank(message = "Cardholder name is required")
    private String cardName;
    
    @NotBlank(message = "Card expiry is required")
    private String cardExpiry;
    
    @NotBlank(message = "CVC is required")
    private String cardCvc;
}
