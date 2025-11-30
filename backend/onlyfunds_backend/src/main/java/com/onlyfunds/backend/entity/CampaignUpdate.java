package com.onlyfunds.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "campaign_update")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CampaignUpdate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "camp_up_id")
    private String campUpId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CampaignCategory category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @NotBlank(message = "Update title is required")
    @Column(nullable = false)
    private String title;
    
    @Column(length = 2000)
    private String content;
}
