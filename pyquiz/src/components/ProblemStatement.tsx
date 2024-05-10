import { ReactNode, useRef } from "react";
import { Question } from "../data/index";
import { Store } from "../store/store";
import { useEffect } from "react";
import Cookies from "js-cookie";

interface ProblemStatementProps {
    visibleQuestion: Question;
}

export default function ProblemStatement({
    visibleQuestion,
}: ProblemStatementProps): ReactNode {
    const slideRef = useRef<HTMLDivElement>(null);
    const store = Store();

    if (slideRef.current && store.isslide) {
        slideRef.current.scrollTop = 0;
    }

    // const [timer, setTimer] = useState<number>(() => {
    //     const storedTimer = localStorage.getItem(`timer`);

    //     return storedTimer ? parseInt(storedTimer, 10) : 10; // Default to 10 minutes if no stored value
    // });

    useEffect(() => {
        const interval = setInterval(() => {
            if (store.user?.id) {
                const newTimer = store.timer - 1;
                localStorage.setItem(`timer`, newTimer.toString());
                store.settimer(newTimer);
            } else {
                const newTimer = store.timer;
                localStorage.setItem(`timer`, newTimer.toString());
                store.settimer(newTimer);
            }
        }, 1000);

        if (store.timer <= 0) {
            console.log("Time's up for question", visibleQuestion.id);

            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [store, visibleQuestion.id]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    };
    return (
        <div
            className="bg-black lg:h-[100%] p-[1.5rem] w-[100%] h-[50%] overflow-auto poppins-medium scroll-smooth scrollbar-hide flex flex-col gap-[1rem] lg:text-[17px] text-[14px]"
            id="slider"
            ref={slideRef}
        >
            <div className="w-[100%]">
                <div className="flex justify-between ">
                    <div className="text-white font-extrabold">
                        {`Question ${visibleQuestion.id}`}
                    </div>
                    <div className="bg-blue-600 rounded-lg p-3">
                        <p>{formatTime(store.timer)}</p>
                    </div>
                </div>
                <div className="text-white font-extrabold">Task:</div>
                <div className="m-[1rem]">
                    <div>{visibleQuestion.Task.Head}</div>
                    <div>
                        {visibleQuestion.Task.Conditions.map((data, index) => (
                            <div className="m-[1rem]" key={index}>{`${
                                index + 1 + "."
                            } ${data}`}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-[100%]">
                <strong className="text-white font-extrabold">Example:</strong>
                <div className="m-[1rem]">
                    {visibleQuestion.Example.Input.map((data, index) => (
                        <p key={index} className="">
                            {data}
                        </p>
                    ))}
                    <div className="my-[0.5rem]">Print The Following</div>
                </div>
                <div className="bg-[#696969] px-[2rem] py-[1rem] rounded-xl">
                    {visibleQuestion.Example.Output.map((data, index) => (
                        <p key={index}>{data}</p>
                    ))}
                </div>
            </div>

            <div className="w-[100%]">
                <strong className="text-white font-extrabold">
                    Input Format:
                </strong>
                <div className="m-[1rem]">
                    {visibleQuestion.InputFormat.map((data, index) => (
                        <p key={index}>{data}</p>
                    ))}
                </div>
            </div>

            <div className="w-[100%]">
                <strong className="text-white font-extrabold">
                    Constraints:
                </strong>
                <div className="m-[1rem]">
                    {visibleQuestion.Constraints.map((data, index) => (
                        <p key={index}>{data}</p>
                    ))}
                </div>
            </div>
            <div className="w-[100%]">
                <strong className="text-white font-extrabold">
                    Sample Input 0:
                </strong>
                <div className="bg-[#696969] rounded-xl my-[1rem] px-[2rem] py-[1rem]">
                    {visibleQuestion.AnotherExample.SampleInput.map(
                        (data, index) => (
                            <p key={index}>{data}</p>
                        )
                    )}
                </div>

                <strong className="text-white font-extrabold">
                    Sample Output 0:
                </strong>
                <div className="bg-[#696969] rounded-xl my-[1rem] px-[2rem] py-[1rem]">
                    {visibleQuestion.AnotherExample.SampleOutput.map(
                        (data, index) => (
                            <p key={index}>{data}</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
