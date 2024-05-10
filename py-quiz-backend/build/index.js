"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:5174"],
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
        const user = await db_1.default.data.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            return res.status(404).json({ message: "User Already Exists" });
        }
        const newuser = await db_1.default.data.create({
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
        await db_1.default.data.update({
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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
