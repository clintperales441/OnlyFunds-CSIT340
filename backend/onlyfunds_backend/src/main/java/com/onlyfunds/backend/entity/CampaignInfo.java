package com.onlyfunds.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "campaign_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CampaignInfo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "campaign_info_id")
    private String campaignInfoId;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;
    
    @NotNull(message = "Goal amount is required")
    @Column(nullable = false)
    private Double goal;
    
    @Column(nullable = false)
    private Integer donors = 0;
    
    @Column(nullable = false)
    private Double raised = 0.0;
    
    @Column(name = "days_left")
    private Integer daysLeft;
    
    @Column(length = 5000)
    private String description;
    
    // Calculated field - not stored in database
    @Transient
    public Double getPercentageFund() {
        if (goal == null || goal == 0) {
            return 0.0;
        }
        return (raised / goal) * 100;
    }
}
