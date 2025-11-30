package com.onlyfunds.backend.service;

import com.onlyfunds.backend.entity.CampaignCategory;
import com.onlyfunds.backend.repository.CampaignCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final CampaignCategoryRepository categoryRepository;
    
    public List<CampaignCategory> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    public CampaignCategory getCategoryById(String categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }
    
    @Transactional
    public CampaignCategory createCategory(String categoryName, String imageUrl) {
        if (categoryRepository.existsByCategory(categoryName)) {
            throw new RuntimeException("Category already exists");
        }
        
        CampaignCategory category = new CampaignCategory();
        category.setCategory(categoryName);
        category.setImage(imageUrl);
        
        return categoryRepository.save(category);
    }
}
