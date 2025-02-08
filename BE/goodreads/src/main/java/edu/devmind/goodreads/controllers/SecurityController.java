package edu.devmind.goodreads.controllers;

import edu.devmind.goodreads.dtos.UserLoginDto;
import edu.devmind.goodreads.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class SecurityController {

    private final UserService userService;

    @Autowired
    public SecurityController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@RequestBody @Valid UserLoginDto dto) {
        System.out.println("Request reached login endpoint");
        return userService.authenticate(dto.getUsername(), dto.getPassword());
    }
}
