package com.onlyfunds.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "campaign_category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CampaignCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "category_id")
    private String categoryId;
    
    @NotBlank(message = "Category name is required")
    @Column(nullable = false, unique = true)
    private String category;
    
    @Column(name = "image")
    private String image;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Campaign> campaigns = new ArrayList<>();
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<CampaignUpdate> updates = new ArrayList<>();
}
