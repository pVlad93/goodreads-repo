package edu.devmind.goodreads.repositories;

import edu.devmind.goodreads.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);
    @Query("SELECT u.role FROM User u WHERE u.username = :username")
    String findRoleByUsername(@Param("username") String username);
}
