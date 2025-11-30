package com.onlyfunds.backend.repository;

import com.onlyfunds.backend.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, String> {
    
    Optional<Receipt> findByDonation_DonationId(String donationId);
}
