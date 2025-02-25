package edu.devmind.goodreads.controllers;

import edu.devmind.goodreads.dtos.UserDto;
import edu.devmind.goodreads.dtos.UserLoginDto;
import edu.devmind.goodreads.models.User;
import edu.devmind.goodreads.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;

@RestController
public class SecurityController {

    private final UserService userService;

    @Autowired
    public SecurityController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody @Valid UserLoginDto dto) {
        return ResponseEntity.ok(
                Collections.singletonMap("token", userService.authenticate(dto.getUsername(), dto.getPassword()))
        );
    }

    @GetMapping("/role")
    public String getRoleByUsername() {
        return userService.getRole();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Integer userId) {
        UserDto user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }
}
