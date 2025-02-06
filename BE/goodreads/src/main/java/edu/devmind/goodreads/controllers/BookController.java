package edu.devmind.goodreads.controllers;

import edu.devmind.goodreads.dtos.BookDto;
import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/getAllBooks")
    public List<BookDto> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return books.stream().map(BookDto::new).collect(Collectors.toList());
    }

}
