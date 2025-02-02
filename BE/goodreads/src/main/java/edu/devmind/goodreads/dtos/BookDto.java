package edu.devmind.goodreads.dtos;

import edu.devmind.goodreads.models.enums.Genre;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {

    private String title;
    private String description;
    private Genre genre;
}
