package com.onlyfunds.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationResponseDTO {
    private String receiptId;
    private String campaignId;
    private String campaignTitle;
    private Double amount;
    private LocalDateTime date;
    private String paymentMethod;
    private String donorFirstName;
    private String donorLastName;
    private String donorEmail;
}
