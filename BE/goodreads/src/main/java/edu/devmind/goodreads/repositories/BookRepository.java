package edu.devmind.goodreads.repositories;

import edu.devmind.goodreads.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
