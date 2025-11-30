package com.onlyfunds.backend.repository;

import com.onlyfunds.backend.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {
    
    List<Donation> findByCampaign_CampaignId(String campaignId);
    
    List<Donation> findByUser_UserId(String userId);
}
