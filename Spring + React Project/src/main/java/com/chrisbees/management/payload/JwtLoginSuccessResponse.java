package com.chrisbees.management.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtLoginSuccessResponse {
    private boolean success;
    private String token;
}
