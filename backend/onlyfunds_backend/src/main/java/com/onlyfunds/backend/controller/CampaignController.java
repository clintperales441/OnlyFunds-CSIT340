package com.onlyfunds.backend.controller;

import com.onlyfunds.backend.dto.CampaignCreateDTO;
import com.onlyfunds.backend.dto.CampaignResponseDTO;
import com.onlyfunds.backend.service.CampaignService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {
    
    private final CampaignService campaignService;
    
    @PostMapping
    public ResponseEntity<?> createCampaign(
            @RequestParam String userId,
            @Valid @RequestBody CampaignCreateDTO dto) {
        try {
            CampaignResponseDTO response = campaignService.createCampaign(userId, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<CampaignResponseDTO>> getAllCampaigns() {
        List<CampaignResponseDTO> campaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(campaigns);
    }
    
    @GetMapping("/{campaignId}")
    public ResponseEntity<CampaignResponseDTO> getCampaignById(@PathVariable String campaignId) {
        try {
            CampaignResponseDTO response = campaignService.getCampaignById(campaignId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CampaignResponseDTO>> getCampaignsByUser(@PathVariable String userId) {
        List<CampaignResponseDTO> campaigns = campaignService.getCampaignsByUserId(userId);
        return ResponseEntity.ok(campaigns);
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<CampaignResponseDTO>> getCampaignsByCategory(@PathVariable String categoryId) {
        List<CampaignResponseDTO> campaigns = campaignService.getCampaignsByCategory(categoryId);
        return ResponseEntity.ok(campaigns);
    }
    
    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics() {
        try {
            var stats = campaignService.getStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
