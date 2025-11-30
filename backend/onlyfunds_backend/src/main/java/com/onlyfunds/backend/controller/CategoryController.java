package com.onlyfunds.backend.controller;

import com.onlyfunds.backend.entity.CampaignCategory;
import com.onlyfunds.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    
    private final CategoryService categoryService;
    
    @GetMapping
    public ResponseEntity<List<CampaignCategory>> getAllCategories() {
        List<CampaignCategory> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/{categoryId}")
    public ResponseEntity<CampaignCategory> getCategoryById(@PathVariable String categoryId) {
        try {
            CampaignCategory category = categoryService.getCategoryById(categoryId);
            return ResponseEntity.ok(category);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @PostMapping
    public ResponseEntity<CampaignCategory> createCategory(
            @RequestParam String categoryName,
            @RequestParam(required = false) String imageUrl) {
        try {
            CampaignCategory category = categoryService.createCategory(categoryName, imageUrl);
            return ResponseEntity.status(HttpStatus.CREATED).body(category);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
