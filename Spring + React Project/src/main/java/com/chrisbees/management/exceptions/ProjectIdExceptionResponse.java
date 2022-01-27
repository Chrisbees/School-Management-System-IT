package com.chrisbees.management.exceptions;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProjectIdExceptionResponse {
    private String projectIdentifier;
}
