package com.onlyfunds.backend.service;

import com.onlyfunds.backend.dto.UserLoginDTO;
import com.onlyfunds.backend.dto.UserRegistrationDTO;
import com.onlyfunds.backend.dto.UserResponseDTO;
import com.onlyfunds.backend.entity.User;
import com.onlyfunds.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    
    @Transactional
    public UserResponseDTO registerUser(UserRegistrationDTO dto) {
        // Check if email already exists
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Create new user entity
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // TODO: Hash password
        user.setGender(dto.getGender());
        user.setAge(dto.getAge());
        user.setAgreeToTerms(dto.getAgreeToTerms());
        user.setAccountType(User.AccountType.valueOf(dto.getAccountType().toUpperCase()));
        user.setOrganization(dto.getOrganization());
        user.setAvatar(dto.getAvatar());
        
        User savedUser = userRepository.save(user);
        return mapToResponseDTO(savedUser);
    }
    
    public UserResponseDTO loginUser(UserLoginDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        
        // TODO: Compare hashed passwords
        if (!user.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        return mapToResponseDTO(user);
    }
    
    public UserResponseDTO getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponseDTO(user);
    }
    
    private UserResponseDTO mapToResponseDTO(User user) {
        return new UserResponseDTO(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getGender(),
                user.getAge(),
                user.getAccountType().toString(),
                user.getOrganization(),
                user.getAvatar()
        );
    }
}
