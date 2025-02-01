package edu.devmind.goodreads.dtos;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserLoginDto {

    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
