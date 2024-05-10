import { create } from "zustand";
import axios from "axios";
interface Store {
    isSubmit: boolean;
    setIsSubmit: (state: boolean) => void;

    isslide: boolean;
    setisslide: (state: boolean) => void;

    isLast: boolean;
    setisLast: (state: boolean) => void;

    isAuth: boolean;
    setisAuth: (state: boolean) => void;

    timer: number;
    settimer: (state: number) => void;

    handleStart: (data: any) => Promise<void>;

    handleQuestions: (data: any, id: number) => Promise<void>;
}
export const Store = create<Store>((set) => ({
    isSubmit: false,
    setIsSubmit: (state) => set({ isSubmit: state }),

    isslide: false,
    setisslide: (state) => set({ isslide: state }),

    isLast: false,
    setisLast: (state) => set({ isLast: state }),

    isAuth: false,
    setisAuth: (state) => set({ isAuth: state }),

    timer: localStorage.getItem("timer")
        ? parseInt(localStorage.getItem("timer")!, 10)
        : 10 * 60,
    settimer: (state) => set({ timer: state }),

    handleStart: async (data) => {
        try {
            const response = await axios.post("/api/v1/user", data);

            console.log(response.data);

            // setMessage(response.data.message);
        } catch (error) {
            // setMessage("Error creating user");
            console.error(error);
        }
    },

    handleQuestions: async (code, id) => {
        try {
            const response = await axios.post(`/api/v1/${id}`, code);
            console.log("====================================");
            console.log(response.data);
            console.log("====================================");

            // setMessage(response.data.message);
        } catch (error) {
            // setMessage("Error creating user");
            console.error(error);
        }
    },
}));
