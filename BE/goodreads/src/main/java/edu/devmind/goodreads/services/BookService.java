package edu.devmind.goodreads.services;

import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.models.enums.Genre;
import edu.devmind.goodreads.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Integer id) {
        return bookRepository.findById(id);
    }

    public Optional<List<Book>> getAllBooksByGenre(Genre genre) {
        return bookRepository.findByGenre(genre);
    }

    public void saveBook(Book book) {
        bookRepository.save(book);
    }
}
