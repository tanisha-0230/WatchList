# 🎬 WatchList
## A MERN App for Managing Your Movie and TV Show Collection

**WatchList** is a full-stack MERN application designed to help users effortlessly manage notes for movies, TV shows, and other media. It features secure user authentication, allowing users to create, edit, and delete notes, as well as mark favorites for quick access. With advanced search and filtering options, users can easily find notes based on their favorite and viewing statuses. The responsive design ensures a seamless experience on both desktop and mobile devices, making WatchList the perfect tool for organizing your media collection.

---

## ✨ Features
- **User Authentication**: Secure sign-up and log-in using JWT.
- **Add, Edit, Delete Notes**: Easily manage your notes.
- **Favorite Notes**: Mark your notes as favorites for easy access.
- **Search and Filter**: Find notes effortlessly with search and filtering options, including favorite and note status.
- **Responsive Design**: Optimized for both desktop and mobile screens.


## 🛠️ Tech Stack
- React
- Node.js
- Express.js
- MongoDB
- Tailwind CSS
- JWT (JSON Web Token)

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account

### Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
    git clone https://github.com/yourusername/watchlist.git
    cd watchlist
   
2. Install dependencies:
   - For the backend:
     ```bash
      cd backend
      npm install
   - For the frontend:
     ```bash
      cd frontend
      npm install
     
3. Create a .env file in the backend directory (if it doesn't exist) with the following contents:
   ```plaintext
    ACCESS_TOKEN_SECRET=your_secret_key_here
    MONGO_URI=your_mongodb_connection_url
    PORT=8080
  - Replace your_access_token_secret with your secret key.
  - Replace your_mongodb_connection_url with the URL of your MongoDB connection (e.g., mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name?retryWrites=true&w=majority&appName=your_app_name).

4. Run the backend server:
    ```bash
   npm start

5. Run the frontend:
    ```bash
   npm run dev

6. Access the Application:
   - Open your browser and go to http://localhost:5173 to view the WatchList application.

## 📚 Usage
- Sign Up: Create a new account to start using WatchList.
- Login: Access your account using your credentials.
- Add Notes: Add new notes to your watchlist by providing details like title, genres, tags, rating, and status.
- Search and Filter: Use the search bar and filter options to find specific notes.
- Manage Favorites: Mark notes as favorites for easy access.
- Edit/Delete Notes: Modify or delete notes as needed.

## 🌐 Demo
- Visit the live application at: [WatchList Demo](https://watchlist-frontend-tmz8.onrender.com/login)

---

![Untitled design (2)](https://github.com/user-attachments/assets/724ef8e2-89c7-4bcd-87c8-d5695d58f150)


## 📜License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
