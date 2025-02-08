package edu.devmind.goodreads.controllers;

import edu.devmind.goodreads.dtos.BookDto;
import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.models.enums.Genre;
import edu.devmind.goodreads.repositories.UserRepository;
import edu.devmind.goodreads.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService, UserRepository userRepository) {
        this.bookService = bookService;
    }

    @GetMapping("/getAllBooks")
    public List<BookDto> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return books.stream().map(BookDto::new).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public BookDto getBookById(@PathVariable Integer id) {
        Optional<Book> fetchedBook = bookService.getBookById(id);
        if (fetchedBook.isPresent()) {
            Book book = fetchedBook.get();
            return new BookDto(book);
        }
        return null;
    }

    @GetMapping("/genre/{genre}")
    public List<BookDto> getBookByGenre(@PathVariable Genre genre) {
        Optional<List<Book>> books = bookService.getAllBooksByGenre(genre);
        return books.map(bookList -> bookList.stream().map(BookDto::new).collect(Collectors.toList())).orElse(null);
    }

    @PostMapping()
    public void postBook(@RequestBody BookDto bookDto) {
        bookService.saveBookDto(bookDto);
    }
}
