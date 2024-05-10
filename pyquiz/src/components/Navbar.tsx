import { ReactNode } from "react";

export default function Navbar(): ReactNode {
    return (
        <div
            className="p-[5px] text-[1.2rem] h-[10dvh] flex justify-center items-center"
            onClick={() => window.location.reload()}
        >
            PyQuiz
        </div>
    );
}
