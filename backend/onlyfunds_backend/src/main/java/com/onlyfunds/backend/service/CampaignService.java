package com.onlyfunds.backend.service;

import com.onlyfunds.backend.dto.CampaignCreateDTO;
import com.onlyfunds.backend.dto.CampaignResponseDTO;
import com.onlyfunds.backend.entity.Campaign;
import com.onlyfunds.backend.entity.CampaignCategory;
import com.onlyfunds.backend.entity.CampaignInfo;
import com.onlyfunds.backend.entity.User;
import com.onlyfunds.backend.repository.CampaignCategoryRepository;
import com.onlyfunds.backend.repository.CampaignInfoRepository;
import com.onlyfunds.backend.repository.CampaignRepository;
import com.onlyfunds.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CampaignService {
    
    private final CampaignRepository campaignRepository;
    private final CampaignInfoRepository campaignInfoRepository;
    private final CampaignCategoryRepository categoryRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public CampaignResponseDTO createCampaign(String userId, CampaignCreateDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        CampaignCategory category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        // Create campaign
        Campaign campaign = new Campaign();
        campaign.setUser(user);
        campaign.setCategory(category);
        campaign.setCampaignTitle(dto.getCampaignTitle());
        
        Campaign savedCampaign = campaignRepository.save(campaign);
        
        // Create campaign info
        CampaignInfo info = new CampaignInfo();
        info.setCampaign(savedCampaign);
        info.setGoal(dto.getGoal());
        info.setDaysLeft(dto.getDaysLeft());
        info.setDescription(dto.getDescription());
        info.setImageUrl(dto.getImageUrl());
        campaignInfoRepository.save(info);
        
        return mapToResponseDTO(savedCampaign, info);
    }
    
    public List<CampaignResponseDTO> getAllCampaigns() {
        List<Campaign> campaigns = campaignRepository.findAll();
        return campaigns.stream()
                .map(campaign -> {
                    CampaignInfo info = campaignInfoRepository
                            .findByCampaign_CampaignId(campaign.getCampaignId())
                            .orElse(new CampaignInfo());
                    return mapToResponseDTO(campaign, info);
                })
                .collect(Collectors.toList());
    }
    
    public CampaignResponseDTO getCampaignById(String campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        
        CampaignInfo info = campaignInfoRepository
                .findByCampaign_CampaignId(campaignId)
                .orElse(new CampaignInfo());
        
        return mapToResponseDTO(campaign, info);
    }
    
    public List<CampaignResponseDTO> getCampaignsByUserId(String userId) {
        List<Campaign> campaigns = campaignRepository.findByUser_UserId(userId);
        return campaigns.stream()
                .map(campaign -> {
                    CampaignInfo info = campaignInfoRepository
                            .findByCampaign_CampaignId(campaign.getCampaignId())
                            .orElse(new CampaignInfo());
                    return mapToResponseDTO(campaign, info);
                })
                .collect(Collectors.toList());
    }
    
    public List<CampaignResponseDTO> getCampaignsByCategory(String categoryId) {
        List<Campaign> campaigns = campaignRepository.findByCategory_CategoryId(categoryId);
        return campaigns.stream()
                .map(campaign -> {
                    CampaignInfo info = campaignInfoRepository
                            .findByCampaign_CampaignId(campaign.getCampaignId())
                            .orElse(new CampaignInfo());
                    return mapToResponseDTO(campaign, info);
                })
                .collect(Collectors.toList());
    }
    
    public java.util.Map<String, Object> getStatistics() {
        try {
            List<Campaign> allCampaigns = campaignRepository.findAll();
            
            if (allCampaigns.isEmpty()) {
                return java.util.Map.of(
                    "totalDonations", 0.0,
                    "successfulCampaigns", 0L,
                    "totalDonors", 0L,
                    "totalCampaigns", 0L,
                    "satisfactionRate", 0L
                );
            }
            
            // Calculate total donations
            double totalDonations = allCampaigns.stream()
                    .map(Campaign::getCampaignInfo)
                    .filter(info -> info != null)
                    .mapToDouble(info -> info.getRaised() != null ? info.getRaised() : 0.0)
                    .sum();
            
            // Count successful campaigns (100% funded or more)
            long successfulCampaigns = allCampaigns.stream()
                    .map(Campaign::getCampaignInfo)
                    .filter(info -> info != null && info.getGoal() != null && info.getGoal() > 0)
                    .filter(info -> info.getRaised() != null && (info.getRaised() / info.getGoal()) >= 1.0)
                    .count();
            
            // Count total donors
            long totalDonors = allCampaigns.stream()
                    .map(Campaign::getCampaignInfo)
                    .filter(info -> info != null && info.getDonors() != null)
                    .mapToLong(CampaignInfo::getDonors)
                    .sum();
            
            // Total campaigns count
            long totalCampaigns = allCampaigns.size();
            
            // Calculate satisfaction rate
            long satisfactionRate = totalCampaigns > 0 ? 
                Math.round((double) successfulCampaigns / totalCampaigns * 100) : 0;
            
            return java.util.Map.of(
                    "totalDonations", totalDonations,
                    "successfulCampaigns", successfulCampaigns,
                    "totalDonors", totalDonors,
                    "totalCampaigns", totalCampaigns,
                    "satisfactionRate", satisfactionRate
            );
        } catch (Exception e) {
            // Return zero values if there's any error
            return java.util.Map.of(
                "totalDonations", 0.0,
                "successfulCampaigns", 0L,
                "totalDonors", 0L,
                "totalCampaigns", 0L,
                "satisfactionRate", 0L
            );
        }
    }
    
    private CampaignResponseDTO mapToResponseDTO(Campaign campaign, CampaignInfo info) {
        return new CampaignResponseDTO(
                campaign.getCampaignId(),
                campaign.getCampaignTitle(),
                campaign.getCategory().getCategoryId(),
                campaign.getCategory().getCategory(),
                campaign.getCategory().getImage(),
                campaign.getUser().getFirstName() + " " + campaign.getUser().getLastName(),
                campaign.getUser().getAvatar(),
                info.getGoal(),
                info.getRaised(),
                info.getDonors(),
                info.getDaysLeft(),
                info.getPercentageFund(),
                info.getDescription(),
                info.getImageUrl()
        );
    }
}
