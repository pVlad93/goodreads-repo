import React, { useEffect, useState } from "react";
import { TextField, Button, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { addBook, getGenres } from "../api/BooksApi";
import { useNavigate } from "react-router";

export const AddBook = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      genre: ""
    });

    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const response = await getGenres();
          const data = await response.json();
          setGenres(data);
        } catch (error) {
          console.error(`Error fetching genres: ${error}`);
        }
      };
      fetchGenres();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await addBook(formData.title, 
            formData.description, 
            formData.genre
        );
        navigate("/");
        
      } catch (error) {
        console.log(`error: ${error}`);
      }
    } 
  
    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Book title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Book description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre.replace("_", " ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    );
  }
  
  export default AddBook;