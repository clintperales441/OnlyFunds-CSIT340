package com.onlyfunds.backend.repository;

import com.onlyfunds.backend.entity.CampaignInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CampaignInfoRepository extends JpaRepository<CampaignInfo, String> {
    
    Optional<CampaignInfo> findByCampaign_CampaignId(String campaignId);
}
