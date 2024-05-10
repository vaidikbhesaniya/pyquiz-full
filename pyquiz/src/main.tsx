import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
// https://pyquizev2-ebon.vercel.app

//
axios.defaults.baseURL = "https://pyquizev2-ebon.vercel.app";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
