package com.onlyfunds.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CampaignResponseDTO {
    
    private String campaignId;
    private String campaignTitle;
    private String categoryId;
    private String categoryName;
    private String categoryImage;
    private String creatorName;
    private String creatorAvatar;
    private Double goal;
    private Double raised;
    private Integer donors;
    private Integer daysLeft;
    private Double percentageFund;
    private String description;
    private String imageUrl;
}
