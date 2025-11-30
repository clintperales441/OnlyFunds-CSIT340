package com.onlyfunds.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "campaign")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "campaign_id")
    private String campaignId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CampaignCategory category;
    
    @NotBlank(message = "Campaign title is required")
    @Column(name = "campaign_title", nullable = false)
    private String campaignTitle;
    
    @OneToOne(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    private CampaignInfo campaignInfo;
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CampaignUpdate> updates = new ArrayList<>();
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Donation> donations = new ArrayList<>();
}
