/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Navbar from "./components/Navbar";
import ProblemStatement from "./components/ProblemStatement";
import { Question, questions } from "./data";
import { Store } from "./store/store";
import Input from "./components/Input";
import Cookies from "js-cookie";
import React from "react";
// import axios from "axios";

export default function App(): React.ReactNode {
    const [visibleQuestion, setVisibleQuestion] = useState<Question>(
        questions[parseInt(localStorage.getItem("currentQuestionIndex") || "0")]
    );

    const store = Store();
    useEffect(() => {
        window.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
    }, []);

    useEffect(() => {
        console.log(Cookies.get("id"));
    }, []);

    const [registerData, setRegisterData] = useState({
        userName: "",
        email: "",
        Invitationcode: "",
    });

    // Get currentQuestionIndex from localStorage or default to 0
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
        parseInt(localStorage.getItem("currentQuestionIndex") || "0")
    );

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleNextQuestion = () => {
        if (!isLastQuestion) {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setVisibleQuestion(questions[nextQuestionIndex]);
            setCurrentQuestionIndex(nextQuestionIndex);
            store.settimer(30);

            // Store updated currentQuestionIndex in localStorage
            localStorage.setItem(
                "currentQuestionIndex",
                nextQuestionIndex.toString()
            );

            console.log(nextQuestionIndex);
        } else {
            store.setisLast(true);
            // Logic for submitting the test
            console.log("Test submitted!");
        }
    };

    const handleclick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (registerData.Invitationcode === "123") {
            store.setisAuth(true);
            store.handleStart({
                email: registerData.email,
                userName: registerData.userName,
            });
        }
    };

    return (
        <div className="bg-[#0F0F0F] h-[100dvh] w-[100dvw] text-[#F2F2F2] overflow-hidden">
            <Navbar />
            <div className="h-[90vh]  flex flex-col w-[100vw]  lg:flex-row">
                <ProblemStatement visibleQuestion={visibleQuestion} />
                <CodeEditor
                    visibleQuestionId={visibleQuestion.id}
                    setVisibleQuestion={handleNextQuestion}
                />
            </div>

            {!Cookies.get("id") ? (
                <div className="w-[100vw] h-[90vh] fixed bg-black z-[100] top-[10%] ">
                    <div className="w-full h-[80%] p-5 flex flex-col gap-4 ">
                        <form onSubmit={handleclick}>
                            <Input
                                id="name"
                                type="text"
                                label="Username"
                                value={registerData.userName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setRegisterData({
                                        ...registerData,
                                        userName: e.target.value,
                                    })
                                }
                            />
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                value={registerData.email}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setRegisterData({
                                        ...registerData,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Input
                                id="Invitationcode"
                                type="password"
                                label="Invitation code"
                                value={registerData.Invitationcode}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setRegisterData({
                                        ...registerData,
                                        Invitationcode: e.target.value,
                                    })
                                }
                            />

                            <div className="w-full flex flex-row justify-around items-center mt-6">
                                <button
                                    className="w- rounded-2xl  flex justify-between items-center poppins-medium text-2xl text-coswhite bg-blue-500 p-5"
                                    type="submit"
                                >
                                    Start
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : Cookies.get("TestComplited") ? (
                <div className="w-[100vw] h-[90vh] fixed bg-black z-[100] top-[10%] flex justify-center items-center  ">
                    <div className="bg-green-500 m-2 p-5 text-black shadow-2xl rounded-2xl poppins-medium">
                        Test Successfully Submitted
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
