package com.onlyfunds.backend.repository;

import com.onlyfunds.backend.entity.CampaignUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignUpdateRepository extends JpaRepository<CampaignUpdate, String> {
    
    List<CampaignUpdate> findByCampaign_CampaignIdOrderByDateDesc(String campaignId);
}
