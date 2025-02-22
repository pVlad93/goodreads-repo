import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';
import { getAllBooks } from "../api/BooksApi.js";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";

const BooksScreen = (props) => {

    const [books, setBooks] = useState(undefined);
    const token = localStorage.getItem("jwtToken");
    let username = null;

    if (props.token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            username = decodedToken.sub;
        } catch (error) {
            console.log(`Error decoding token: ${error}`)
        }
    }

    const columns = [
        { field: "title", headerName: "Title", width: 750 },
        { field: "genre", headerName: "Genre", width: 200 },
        { field: "author", headerName: "Author", width: 500}
    ]

    useEffect(() => {
        getAllBooks()
            .then(async response => {
                if(response.ok) {
                    const responseJson = await response.json();

                    return responseJson.map((book, index) => ({
                        ...book,
                        id: book.id || index + 1,
                        author: `${book.authorFirstName} ${book.authorLastName}`.trim(),
                    }));
                } else {
                    throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
                }
            })
            .then((books) => {
                setBooks(books);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <h1>Welcome to Goodreads</h1>
            { username ? (
                <p>Welcome back, <strong>{username}</strong>!</p>
            ) : (
                <p><Link to="/login">Login</Link> to access your account.</p>
            )}
            <Box padding="10px">
                {!books && <div>Books not loaded yet</div>}
                {books && (
                    <Box>
                        <DataGrid rows={books} columns={columns} />
                    </Box>
                )}
            </Box>
        </>
    );
}

export default BooksScreen;