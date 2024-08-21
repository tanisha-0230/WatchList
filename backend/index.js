require("dotenv").config();

const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString);

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required" });
    }

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(400).json({ error: true, message: "User not found" });
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            email,
            accessToken,
            message: "Login Successful",
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        });
    }
});

//Get User
app.get("/get-user", authenticationToken, async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: {
            fullName: isUser.fullName,
            email: isUser.email,
            _id: isUser._id,
            createdOn: isUser.createdOn,
        },
        message: "",
    });
})

// Add Note
app.post("/add-note", authenticationToken, async(req, res) => {
    const { title, genres, tags, rating, status, isFavorite } = req.body;
    const { user } = req.user;

    if (!title || !status) {
        return res.status(400).json({ error: true, message: "Title and status are required" });
    }

    try {
        const note = new Note({
            title,
            genres: genres || [],
            tags: tags || [],
            rating: rating || "",
            status,
            userId: user._id,
            isFavorite: isFavorite || false,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added Successfuly",
        });
    } catch (error) {
        res.status(500).json({ 
            error: true, 
            message: "Internal Server Error", 
        });
    }
});

// Edit Note
app.put("/edit-note/:noteId", authenticationToken, async(req, res) => {
    const noteId = req.params.noteId;
    const { title, genres, tags, rating, status, isFavorite } = req.body;
    const { user } = req.user;

    if (!title && !genres && !tags && rating === undefined && status === undefined) {
        return res
            .status(400)
            .json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res
                .status(400)
                .json({ error: true, message: "Note not found" }); 
        }

        if (title) note.title = title;
        if (genres) note.genres = genres;
        if (tags) note.tags = tags;
        if (rating !== undefined) note.rating = rating;
        if (status) note.status = status;
        if (isFavorite) note.isFavorite = isFavorite;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated Successfuly",
        });
    } catch (error) {
        res.status(500).json({ 
            error: true, 
            message: "Internal Server Error",
        });
    }
});

// Get All Notes
app.get("/get-all-notes", authenticationToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isFavorite: -1});

        return res.json({
            error: false,
            notes,
            message: "All Notes retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found",
            });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id })

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Update isFavorite Value
app.put("/update-note-favorite/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isFavorite } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(400).json({ error: true, message: "Note not found" });
        }

        note.isFavorite = isFavorite;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Search and Filter Notes
app.get("/search-and-filter-notes", authenticationToken, async (req, res) => {
    const { user } = req.user;
    const { query, isFav, status } = req.query;

    let filterCriteria = { userId: user._id };

    if (isFav === "true") {
        filterCriteria.isFavorite = true;
    }

    if (status && status !== "All") {
        filterCriteria.status = status;
    }

    try {
        let notes;
        if (query) {
            // If there's a search query, include it in the filter
            notes = await Note.find({
                ...filterCriteria,
                $or: [
                    { title: { $regex: new RegExp(query, "i") } },
                    { genres: { $regex: new RegExp(query, "i") } },
                    { tags: { $regex: new RegExp(query, "i") } },
                ],
            });
        } else {
            // If no search query, just apply filters
            notes = await Note.find(filterCriteria);
        }

        return res.json({
            error: false,
            notes,
            message: "Notes matching the search query and/or filters retrieved successfully",
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;