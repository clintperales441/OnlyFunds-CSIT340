package com.onlyfunds.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "receipt")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Receipt {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "receipt_id")
    private String receiptId;
    
    @NotNull(message = "Amount is required")
    @Column(nullable = false)
    private Double amount;
    
    @Column(nullable = false)
    private LocalDateTime date;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id", nullable = false)
    private Donation donation;
    
    @PrePersist
    protected void onCreate() {
        date = LocalDateTime.now();
    }
}
