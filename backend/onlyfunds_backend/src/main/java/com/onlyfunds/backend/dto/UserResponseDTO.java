package com.onlyfunds.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private Integer age;
    private String accountType;
    private String organization;
    private String avatar;
}
