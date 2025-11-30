package com.onlyfunds.backend.service;

import com.onlyfunds.backend.dto.DonationCreateDTO;
import com.onlyfunds.backend.entity.*;
import com.onlyfunds.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class DonationService {
    
    private final DonationRepository donationRepository;
    private final CampaignRepository campaignRepository;
    private final CampaignInfoRepository campaignInfoRepository;
    private final UserRepository userRepository;
    private final ReceiptRepository receiptRepository;
    
    @Transactional
    public String processDonation(DonationCreateDTO dto) {
        // Get campaign
        Campaign campaign = campaignRepository.findById(dto.getCampaignId())
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        
        // Get or create user (optional for anonymous donations)
        User user = null;
        if (dto.getUserId() != null) {
            user = userRepository.findById(dto.getUserId()).orElse(null);
        }
        
        // Create donation
        Donation donation = new Donation();
        donation.setCampaign(campaign);
        donation.setUser(user);
        donation.setPaymentMethod(Donation.PaymentMethod.valueOf(dto.getPaymentMethod().toUpperCase().replace(" ", "_")));
        
        Donation savedDonation = donationRepository.save(donation);
        
        // Create donor info
        DonorInfo donorInfo = new DonorInfo();
        donorInfo.setDonation(savedDonation);
        donorInfo.setFirstName(dto.getFirstName());
        donorInfo.setLastName(dto.getLastName());
        donorInfo.setEmail(dto.getEmail());
        donorInfo.setPhoneNumber(dto.getPhoneNumber());
        donorInfo.setMessage(dto.getMessage());
        savedDonation.setDonorInfo(donorInfo);
        
        // Create card info (tokenize in production!)
        CardNumber cardNumber = new CardNumber();
        cardNumber.setDonation(savedDonation);
        cardNumber.setName(dto.getCardName());
        cardNumber.setExpiry(LocalDate.parse(dto.getCardExpiry(), DateTimeFormatter.ofPattern("MM/yy")));
        cardNumber.setCvc(dto.getCardCvc());
        savedDonation.setCardNumber(cardNumber);
        
        // Create receipt
        Receipt receipt = new Receipt();
        receipt.setDonation(savedDonation);
        receipt.setAmount(dto.getAmount());
        Receipt savedReceipt = receiptRepository.save(receipt);
        savedDonation.setReceipt(savedReceipt);
        
        // Update campaign info
        CampaignInfo campaignInfo = campaignInfoRepository
                .findByCampaign_CampaignId(dto.getCampaignId())
                .orElseThrow(() -> new RuntimeException("Campaign info not found"));
        
        campaignInfo.setRaised(campaignInfo.getRaised() + dto.getAmount());
        campaignInfo.setDonors(campaignInfo.getDonors() + 1);
        campaignInfoRepository.save(campaignInfo);
        
        return savedReceipt.getReceiptId();
    }
}
