import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: '.env.local' });
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true, 
}));

app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
