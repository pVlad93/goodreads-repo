import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';
import { getAllBooks } from "../api/BooksApi.js";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";
import { getCommentsByBookId } from "../api/CommentsApi.js";
import CommentModal from "./CommentModal.jsx";
import { getUserInfo } from "../api/SecurityApi.js";

const BooksScreen = (props) => {

    const [books, setBooks] = useState(undefined);
    const [modalData, setModalData] = useState(undefined);
    const [bookTitle, setBookTitle] = useState("");
    const [bookId, setBookId] = useState(null);
    const [name, setName] = useState(null);
    const token = localStorage.getItem("jwtToken");
    let username = null;
    let userId = null;

    if (props.token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            username = decodedToken.sub;
            userId = decodedToken.userId;
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

    useEffect(() => {
        if (userId) {
            getUserInfo(userId).then(user => {
                if (user) {
                    setName(`${user.firstName} ${user.lastName}`);
                }
            });
        }
    }, [userId])

    const onRowClick = async (cellInfo) => {
        const bookTitle = cellInfo.row.title;
        try {
            const responseJson = await getCommentsByBookId(cellInfo.id);
            setModalData(responseJson);
            setBookTitle(bookTitle);
            setBookId(cellInfo.id);
        } catch (error) {
            console.log("Error fetching comments: ", error);
        }
    }

    const onReviewSubmitted = (updatedComments) => {
        setModalData(updatedComments);
    } 

    const onModalClose = () => {
        setModalData(undefined);
    }

    return (
        <>
            <h1>Welcome to Goodreads</h1>
            { username ? (
                <p>Welcome back, <strong>{name}</strong>!</p>
            ) : (
                <p><Link to="/login">Login</Link> to access your account.</p>
            )}
            <Box padding="10px">
                {!books && <div>Books not loaded yet</div>}
                {books && (
                    <Box>
                        <DataGrid onRowClick={onRowClick} rows={books} columns={columns} />
                    </Box>
                )}
                {modalData !== undefined &&
                    <CommentModal 
                        modalData = {modalData} 
                        bookTitle={bookTitle}
                        bookId = {bookId}
                        userId = {userId} 
                        onClose={onModalClose}
                        onReviewSubmitted={onReviewSubmitted} />
                }
            </Box>
        </>
    );
}

export default BooksScreen;