// Importing required modules
import express from "express"; // Web framework for creating server and APIs
import dotenv from "dotenv"; // Loads environment variables from a .env file
import cookieParser from "cookie-parser"; // Parses cookies in incoming HTTP requests
import cors from "cors"; // Enables Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Parses incoming request bodies (JSON, URL-encoded, etc.)
import path from "path"; // Helps work with file and directory paths

// Importing custom database connection function
import { connectDB } from "./lib/db.js";

// Importing route modules
import authRoutes from "./routes/auth.route.js"; // Routes for login/signup/auth logic
import messageRoutes from "./routes/message.route.js"; // Routes for chat/message logic
import formalizerRoutes from "./routes/formalizer.route.js"; // Routes for AI formalization endpoint

// Importing app and server (with socket.io setup) from a custom socket configuration file
import { app, server } from "./lib/socket.js";

// Load environment variables (e.g., PORT, JWT_SECRET) from .env into process.env
dotenv.config();

// Extract PORT from environment variables
const PORT = process.env.PORT;

// Resolve the directory name of the current module (because __dirname is not available in ES modules by default)
const __dirname = path.resolve();

// Middleware setup
app.use(express.json()); // Parse incoming JSON payloads into `req.body`
app.use(cookieParser()); // Parse cookies into `req.cookies`

// Enable CORS to allow frontend (on port 5173) to make requests to backend
app.use(
  cors({
    origin: "http://localhost:5173", // Only allow requests from this origin
    credentials: true, // Allow cookies to be sent in cross-origin requests
  })
);

app.use(bodyParser.json()); // Parse JSON request bodies (can be redundant with express.json())

// Mount route handlers at specific API endpoints
app.use("/api/formalizer", formalizerRoutes); // Handles message formalization requests (to Flask service)
app.use("/api/auth", authRoutes); // Handles signup, login, logout, etc.
app.use("/api/messages", messageRoutes); // Handles sending and fetching chat messages

// Serve static frontend files if in production mode
if (process.env.NODE_ENV === "production") {
  // Serve files from frontend's build directory
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // For any route not explicitly defined, return the frontend index.html (for React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the HTTP server and listen on defined PORT
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT); // Log that the server is up
  connectDB(); // Connect to MongoDB database
});

// Export the app and server instance (useful for testing or further integration)
export { app, server };
