package edu.devmind.goodreads.services;

import edu.devmind.goodreads.dtos.BookDto;
import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.repositories.BookRepository;
import edu.devmind.goodreads.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
