import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import aiRoutes from "../routes/ai.routes";

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

app.use("/ai",aiRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
