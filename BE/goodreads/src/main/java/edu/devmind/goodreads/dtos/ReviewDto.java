package edu.devmind.goodreads.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReviewDto {

    private Integer id;
    private Integer userId;
    private String userFirstName;
    private String userLastName;
    private Integer bookId;
    private String bookTitle;
    private int rating;
    private String reviewText;
    private LocalDateTime createdAt;
}
