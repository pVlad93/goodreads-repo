package edu.devmind.goodreads.dtos;

import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.models.enums.Genre;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {

    private String title;
    private String description;
    private Genre genre;
    private String authorFirstName;
    private String authorLastName;

    public BookDto() {

    }

    public BookDto(Book book) {
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.genre = book.getGenre();
        this.authorFirstName = book.getUser().getFirstName();
        this.authorLastName = book.getUser().getLastName();
    }
}
