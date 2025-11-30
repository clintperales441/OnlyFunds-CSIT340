package com.onlyfunds.backend.repository;

import com.onlyfunds.backend.entity.DonorInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorInfoRepository extends JpaRepository<DonorInfo, String> {
}
