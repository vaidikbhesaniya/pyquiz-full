import express from "express";
import prisma from "./db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["https://pyquiz-full.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
function getQuestionField(questionId) {
    switch (questionId) {
        case "1":
            return "question1";
        case "2":
            return "question2";
        default:
            throw new Error(`Invalid questionId: ${questionId}`);
    }
}
app.post("/api/v1/user", async (req, res) => {
    const { email, userName } = req.body;
    try {
        const user = await prisma.data.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            return res.status(404).json({ message: "User Already Exists" });
        }
        const newuser = await prisma.data.create({
            data: {
                email,
                userName,
            },
        });
        res.cookie("id", newuser.id);
        res.status(201).json({ message: "User Created Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.post("/api/v1/:questionId", async (req, res) => {
    const { code } = req.body;
    const questionId = req.params.questionId;
    const { id } = req.cookies;
    console.log(code);
    try {
        await prisma.data.update({
            where: {
                id: parseInt(id),
            },
            data: {
                [getQuestionField(questionId)]: code,
            },
        });
        res.status(201).json({ message: "Submitted Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.use("/api/v1/health", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});
const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
