package edu.devmind.goodreads.services;

import edu.devmind.goodreads.dtos.BookDto;
import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.models.User;
import edu.devmind.goodreads.repositories.BookRepository;
import edu.devmind.goodreads.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void saveBook(BookDto bookDto) {
        String loggedAuthor = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByUsername(loggedAuthor);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("");
        }

        Book book = new Book();
        book.setDescription(bookDto.getDescription());
        book.setTitle(bookDto.getTitle());
        book.setGenre(bookDto.getGenre());
        book.setAuthorId(user.get().getId());
        bookRepository.save(book);
    }
}
