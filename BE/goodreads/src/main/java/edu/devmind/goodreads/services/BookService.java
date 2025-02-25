package edu.devmind.goodreads.services;

import edu.devmind.goodreads.dtos.BookDto;
import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.models.User;
import edu.devmind.goodreads.models.enums.Genre;
import edu.devmind.goodreads.repositories.BookRepository;
import edu.devmind.goodreads.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Autowired
    public BookService(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
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

    public void saveBookDto(BookDto bookDto) {
        String title = bookDto.getTitle();
        String description = bookDto.getDescription();
        Genre genre = bookDto.getGenre();

        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findByUsername(loggedUser);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Book bookToBeSaved = new Book();
            bookToBeSaved.setTitle(title);
            bookToBeSaved.setDescription(description);
            bookToBeSaved.setGenre(genre);
            bookToBeSaved.setUser(user);
            bookRepository.save(bookToBeSaved);
        }
    }
}
