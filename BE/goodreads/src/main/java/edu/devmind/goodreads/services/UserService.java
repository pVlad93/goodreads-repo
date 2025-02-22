package edu.devmind.goodreads.services;

import edu.devmind.goodreads.models.User;
import edu.devmind.goodreads.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, JwtService jwtService, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public String authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with username: " + username + " was not found");
        }
        User fetchedUser = user.get();
        if (passwordEncoder.matches(password, fetchedUser.getPassword())) {
            return jwtService.createToken(username);
        }

        throw new UsernameNotFoundException("Wrong password");
    }

    public User validateUser(String token) {
        String username = jwtService.validateToken(token);
        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.orElse(null);
    }

    public String getRole() {
        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findByUsername(loggedUser);

        return userOptional.map(user -> userRepository.findRoleByUsername(user.getUsername())).orElse(null);
    }
}
