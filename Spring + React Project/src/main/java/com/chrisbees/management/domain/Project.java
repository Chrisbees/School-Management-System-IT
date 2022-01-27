package com.chrisbees.management.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String projectName;
    @NonNull
    @Column(updatable = false, unique = true)
    private String projectIdentifier;
    @NonNull
    private String description;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date start_date;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date end_date;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }
}
