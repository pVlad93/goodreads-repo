package edu.devmind.goodreads.services;

import edu.devmind.goodreads.dtos.ReviewDto;
import edu.devmind.goodreads.models.Book;
import edu.devmind.goodreads.models.Review;
import edu.devmind.goodreads.models.User;
import edu.devmind.goodreads.repositories.ReviewRepository;
import edu.devmind.goodreads.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository) {

        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }

    public List<ReviewDto> getReviewsByBookId(Integer id) {
        return reviewRepository.findByBookId(id).stream().map(review -> {
            ReviewDto reviewDto = new ReviewDto();
            reviewDto.setId(review.getId());
            reviewDto.setReviewText(review.getReviewText());
            reviewDto.setCreatedAt(review.getCreatedAt());
            reviewDto.setRating(review.getRating());
            
            reviewDto.setBookId(review.getBook().getId());
            reviewDto.setBookTitle(review.getBook().getTitle());
            reviewDto.setUserFirstName(review.getUser().getFirstName());
            reviewDto.setUserLastName(review.getUser().getLastName());
            reviewDto.setUserId(review.getUser().getId());
            return reviewDto;
        }).toList();
    }

    public void saveReviewDto(ReviewDto reviewDto) {
        Review review = new Review();
        review.setReviewText(reviewDto.getReviewText());
        review.setRating(reviewDto.getRating());

        User user = new User();
        user.setId(reviewDto.getUserId());
        review.setUser(user);

        Book book = new Book();
        book.setId(reviewDto.getBookId());
        review.setBook(book);

        reviewRepository.save(review);
    }

    public void deleteReview(int id) {
        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findByUsername(loggedUser);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Username not found");
        }

        User fetchedUser = userOptional.get();
        Optional<Review> optionalReview = reviewRepository.findById(id);

        if (optionalReview.isEmpty()) {
            throw new RuntimeException("Review with id " + id + " not found.");
        }
        Review fetchedReview = optionalReview.get();

        if (!Objects.equals(fetchedUser.getId(), fetchedReview.getUser().getId())) {
            throw new RuntimeException("Comment does not belong to user");
        }
        reviewRepository.deleteById(id);
    }
}
