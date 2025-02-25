package edu.devmind.goodreads.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto {

    private Integer id;
    private String username;
    private String firstName;
    private String lastName;
    private String role;
    private List<ReviewDto> reviews;
}
