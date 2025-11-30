package com.onlyfunds.backend.controller;

import com.onlyfunds.backend.dto.DonationCreateDTO;
import com.onlyfunds.backend.service.DonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {
    
    private final DonationService donationService;
    
    @PostMapping
    public ResponseEntity<Map<String, String>> processDonation(@Valid @RequestBody DonationCreateDTO dto) {
        try {
            String receiptId = donationService.processDonation(dto);
            Map<String, String> response = new HashMap<>();
            response.put("receiptId", receiptId);
            response.put("message", "Donation processed successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
