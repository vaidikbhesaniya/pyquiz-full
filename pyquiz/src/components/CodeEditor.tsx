/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from "@monaco-editor/react";
import { Dispatch, ReactNode, useRef } from "react";
import { Button } from "../../@/components/ui/button";
import { Question, questions } from "../data/index";
import { Store } from "../store/store";
import Cookies from "js-cookie";

interface CodeEditorProps {
    visibleQuestionId: number;
    setVisibleQuestion: Dispatch<React.SetStateAction<Question>>;
}

export default function CodeEditor({
    visibleQuestionId,
    setVisibleQuestion,
}: CodeEditorProps): ReactNode {
    const editorRef = useRef<null | any>(null);
    const store = Store();
    function handleEditorDidMount(editor: any) {
        editorRef.current = editor;
    }

    function handleSubmit(questionId: number) {
        console.log(questionId);
        if (editorRef.current) {
            console.log(typeof editorRef.current.getValue());

            store.handleQuestions(
                {
                    code: editorRef.current.getValue(),
                },
                questionId
            );
        }
    }

    function handletestcomplition() {
        if (store.isLast) {
            Cookies.set("TestComplited", "true");
        }
    }

    return (
        <div className="w-[100%] h-[55%] lg:h-[100%] flex flex-col">
            <Editor
                height="90%"
                defaultValue="# Write Code Here"
                defaultLanguage="python"
                theme="vs-dark"
                onMount={handleEditorDidMount}
                options={{
                    minimap: {
                        enabled: false,
                    },
                    fontSize: 18,
                    wordWrap: "on",
                    autoDetectHighContrast: false,
                }}
            />
            <div className="w-[100%] my-[1rem] flex-1 gap-[2rem] flex items-center justify-center font-semibold">
                <Button
                    variant="outline"
                    className="px-[1rem] text-black h-[40px] rounded-sm bg-yellow-300"
                >
                    Run
                </Button>
                <Button
                    variant="outline"
                    className="px-[1rem] text-white h-[40px] rounded-sm bg-green-600"
                    onClick={() => {
                        handleSubmit(visibleQuestionId);
                        setVisibleQuestion(questions[1]);

                        store.setisslide(!store.isslide);
                        handletestcomplition();
                        // sideToTop();
                    }}
                >
                    {store.isLast ? "Submit Test" : "Submit & Next"}
                </Button>
            </div>
        </div>
    );
}
