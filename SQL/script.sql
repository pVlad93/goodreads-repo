DROP TABLE users;
DROP TABLE books;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL
);

INSERT INTO users 
	(username, password, first_name, last_name, role) VALUES 
    ("user", "$2a$10$CIzuYzZrnDRIiQcQ5LzAWesslSNywnF6xrkR9o0jc8DK6BcEzu75i", "John", "Doe", "ROLE_USER");
    -- username: user, password: password
INSERT INTO users
	(username, password, first_name, last_name, role) VALUES
    ("user2", "$2a$10$CIzuYzZrnDRIiQcQ5LzAWesslSNywnF6xrkR9o0jc8DK6BcEzu75i", "Jane", "Doe", "ROLE_USER");
    -- username: user, password: password

INSERT INTO users
	(username, password, first_name, last_name, role) VALUES
    ("mark_galeotti", "$2a$10$z0/DtmrarJqdPpyBlQy8IOaJbgpJItccTCfhIRbHd3VI6u.nhLyny", "Mark", "Galeotti", "ROLE_AUTHOR");
    -- username: mark_galeotti, password: author
INSERT INTO users
	(username, password, first_name, last_name, role) VALUES
    ("radu_paraschivescu", "$2a$10$1wvU/oxY/9DzM.Xe7/ezHOLARAqXk2OeIgXUuZP3ogHXaxKNMkmRy", "Radu", "Paraschivescu", "ROLE_AUTHOR");
    -- username: radu_paraschivescu, password: author

CREATE TABLE books (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(100),
    description TEXT,
    genre ENUM('FICTION', 'MYSTERY', 'NARRATIVE', 'NOVEL', 'SCIENCE_FICTION', 'NON_FICTION',
    'HISTORICAL_FICTION', 'ROMANCE_NOVEL', 'THRILLER', 'FANTASY_FICTION',
    'LITERARY_FICTION', 'SHORT_STORY', 'HORROR_FICTION', 'MEMOIR', 'HISTORY'),
    CONSTRAINT fk_book FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO books
	(user_id, title, description, genre) VALUES
    (3, "Noi suntem romani (nimeni nu-i perfect)", "Noi suntem români este titlul unui cântec patriotic. Nimeni nu-i perfect este ultima replică din filmul Unora le place jazzul.", "FICTION");

INSERT INTO books
	(user_id, title, description, genre) VALUES
    (3, "The Weaponisation of Everything", "A Field Guide to the New Way of War", "HISTORICAL_FICTION");

CREATE TABLE reviews (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);
