package edu.devmind.goodreads.repositories;

import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.models.enums.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Optional<List<Book>> findByGenre(Genre genre);
}
