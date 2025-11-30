package com.onlyfunds.backend.repository;

import com.onlyfunds.backend.entity.CampaignCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CampaignCategoryRepository extends JpaRepository<CampaignCategory, String> {
    
    Optional<CampaignCategory> findByCategory(String category);
    
    boolean existsByCategory(String category);
}
