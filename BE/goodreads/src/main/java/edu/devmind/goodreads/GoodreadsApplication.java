package edu.devmind.goodreads;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class GoodreadsApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(GoodreadsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String rawPassword = "password";
		String hashedPassword = encoder.encode(rawPassword);
		System.out.println("Hashed Password: " + hashedPassword);
	}
}
