package com.onlyfunds.backend.repository;

import com.onlyfunds.backend.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, String> {
    
    List<Campaign> findByUser_UserId(String userId);
    
    List<Campaign> findByCategory_CategoryId(String categoryId);
}
