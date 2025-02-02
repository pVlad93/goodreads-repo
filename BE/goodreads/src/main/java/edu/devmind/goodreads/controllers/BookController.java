package edu.devmind.goodreads.controllers;

import edu.devmind.goodreads.dtos.BookDto;
import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/getAllBooks")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping()
    public void addBook(@RequestBody BookDto bookDto) {
        bookService.saveBook(bookDto);
    }
}
