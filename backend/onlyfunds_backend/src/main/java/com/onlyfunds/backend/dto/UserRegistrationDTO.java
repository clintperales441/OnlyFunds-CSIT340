package com.onlyfunds.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    
    @NotBlank(message = "First name is required")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    private String lastName;
    
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @NotNull(message = "Age is required")
    private Integer age;
    
    @NotNull(message = "Terms must be agreed to")
    private Boolean agreeToTerms;
    
    @NotBlank(message = "Account type is required")
    private String accountType;
    
    private String organization;
    private String avatar;
}
