import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { addBook } from "../api/BooksApi";
import { useNavigate } from "react-router";

export const AddBook = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      genre: ""
    });

    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      // Add form submission logic here

      try {
        const response = await addBook(formData.title, 
            formData.description, 
            formData.genre
        );
        
        if (response.ok) {
            console.log("Request successfully sent");
            navigate("/");
        } else {
            console.log("Error adding book: ", await response.json());
        }
        
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
          value={formData.name}
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
        <TextField
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    );
  }
  
  export default AddBook;