/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Navbar from "./components/Navbar";
import ProblemStatement from "./components/ProblemStatement";
import { Question, questions } from "./data";
import { Store } from "./store/store";
import Input from "./components/Input";
import Cookies from "js-cookie";
// import axios from "axios";

export default function App(): React.ReactNode {
    const [visibleQuestion, setVisibleQuestion] = useState<Question>(
        questions[0]
    );

    const store = Store();
    useEffect(() => {
        window.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        console.log("====================================");
        console.log(Cookies.get("id"));
        console.log("====================================");
    }, []);
    const [registerData, setRegisterData] = useState({
        userName: "",
        email: "",
        Invitationcode: "",
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const currentQuestion = questions[currentQuestionIndex];

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    console.log("====================================");
    console.log(currentQuestionIndex);
    console.log("====================================");
    const handleNextQuestion = () => {
        if (!isLastQuestion) {
            setVisibleQuestion(questions[currentQuestionIndex + 1]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            store.settimer(10 * 60);
        } else {
            store.setisLast(true);

            // Logic for submitting the test
            console.log("Test submitted!");
        }
    };

    const handleclick = (e: any) => {
        e.preventDefault();

        store.handleStart({
            email: registerData.email,
            userName: registerData.userName,
        });

        if (registerData.Invitationcode === "123") {
            store.setisAuth(true);
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
                                onChange={(e) =>
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
                                onChange={(e) =>
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
                                onChange={(e) =>
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
