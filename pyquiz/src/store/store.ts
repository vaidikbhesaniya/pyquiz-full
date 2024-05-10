import { create } from "zustand";
import axios from "axios";

interface datainterdace {
    userName: string;
    email: string;
}

interface codein {
    code: string;
}
interface Store {
    isSubmit: boolean;
    setIsSubmit: (state: boolean) => void;

    isclick: boolean;
    setisclick: (state: boolean) => void;

    isslide: boolean;
    setisslide: (state: boolean) => void;

    isLast: boolean;
    setisLast: (state: boolean) => void;

    isAuth: boolean;
    setisAuth: (state: boolean) => void;

    timer: number;
    settimer: (state: number) => void;

    handleStart: (data: datainterdace) => Promise<void>;

    handleQuestions: (data: codein, id: number) => Promise<void>;
}
export const Store = create<Store>((set) => ({
    isSubmit: false,
    setIsSubmit: (state) => set({ isSubmit: state }),

    isslide: false,
    setisslide: (state) => set({ isslide: state }),

    isLast: false,
    setisLast: (state) => set({ isLast: state }),

    isclick: false,
    setisclick: (state) => set({ isclick: state }),

    isAuth: false,
    setisAuth: (state) => set({ isAuth: state }),

    // localStorage.getItem("timer")
    // ? parseInt(localStorage.getItem("timer")!, 10)
    // :

    timer: 30,
    settimer: (state) => set({ timer: state }),

    handleStart: async (data) => {
        console.log(data);

        await axios
            .post("/api/v1/user", data)
            .then((e) => {
                console.log(e.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    handleQuestions: async (code, id) => {
        try {
            await axios.post(`/api/v1/${id}`, code);

            // setMessage(response.data.message);
        } catch (error) {
            // setMessage("Error creating user");
            console.error(error);
        }
    },
}));
