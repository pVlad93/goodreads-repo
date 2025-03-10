package edu.devmind.goodreads.repositories;

import edu.devmind.goodreads.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByBookId(Integer id);
}
