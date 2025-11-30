package com.onlyfunds.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "card_number")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardNumber {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_number")
    private Long accountNumber;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id", nullable = false)
    private Donation donation;
    
    @NotBlank(message = "Cardholder name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private LocalDate expiry;
    
    @NotBlank(message = "CVC is required")
    @Column(nullable = false, length = 4)
    private String cvc;
    
    // Note: In production, NEVER store full card numbers
    // Store only last 4 digits or use tokenization
    // This is for educational purposes only
}
