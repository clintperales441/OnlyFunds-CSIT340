package com.onlyfunds.backend.config;

import com.onlyfunds.backend.entity.CampaignCategory;
import com.onlyfunds.backend.repository.CampaignCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final CampaignCategoryRepository categoryRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if categories already exist
        if (categoryRepository.count() == 0) {
            // Create default categories (IDs will be auto-generated)
            createCategory("Education", null);
            createCategory("Health", null);
            createCategory("Animal Welfare", null);
            createCategory("Community", null);
            createCategory("Environment", null);
            
            System.out.println("Default categories initialized successfully!");
            
            // Print the created categories with their IDs
            categoryRepository.findAll().forEach(cat -> 
                System.out.println("Category: " + cat.getCategory() + " - ID: " + cat.getCategoryId())
            );
        } else {
            System.out.println("Categories already exist:");
            categoryRepository.findAll().forEach(cat -> 
                System.out.println("Category: " + cat.getCategory() + " - ID: " + cat.getCategoryId())
            );
        }
    }
    
    private void createCategory(String name, String image) {
        CampaignCategory category = new CampaignCategory();
        category.setCategory(name);
        category.setImage(image);
        categoryRepository.save(category);
    }
}
