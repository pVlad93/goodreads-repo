package edu.devmind.goodreads.controllers;

import edu.devmind.goodreads.dtos.ReviewDto;
import edu.devmind.goodreads.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {

        this.reviewService = reviewService;
    }

    @GetMapping("/book/{id}")
    public List<ReviewDto> getReviewsForBook(@PathVariable Integer id) {

        return reviewService.getReviewsByBookId(id);
    }

    @PostMapping("/book")
    public ResponseEntity<String> saveComment(@RequestBody ReviewDto reviewDto) {
        reviewService.saveReviewDto(reviewDto);
        return ResponseEntity.ok("Review saved successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Deleted");
    }
}
