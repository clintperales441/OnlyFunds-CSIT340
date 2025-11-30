package com.onlyfunds.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "donation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "donation_id")
    private String donationId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @OneToOne(mappedBy = "donation", cascade = CascadeType.ALL, orphanRemoval = true)
    private DonorInfo donorInfo;
    
    @OneToOne(mappedBy = "donation", cascade = CascadeType.ALL, orphanRemoval = true)
    private CardNumber cardNumber;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;
    
    @OneToOne(mappedBy = "donation", cascade = CascadeType.ALL, orphanRemoval = true)
    private Receipt receipt;
    
    public enum PaymentMethod {
        CREDIT_CARD,
        DEBIT_CARD
    }
}
