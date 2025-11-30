package com.onlyfunds.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CampaignCreateDTO {
    
    @NotBlank(message = "Campaign title is required")
    private String campaignTitle;
    
    @NotBlank(message = "Category ID is required")
    private String categoryId;
    
    @NotNull(message = "Goal amount is required")
    private Double goal;
    
    private Integer daysLeft;
    private String description;
}
