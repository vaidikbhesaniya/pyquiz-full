import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

interface datainterdace {
    userName: string;
    email: string;
}

interface codein {
    code: string;
}
interface Store {
    id: number | undefined;
    setid: (state: number) => void;

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
    handlesubmit: () => Promise<void>;
    handleQuestions: (data: codein, id: number) => Promise<void>;

    getdata: () => Promise<void>;
}
export const Store = create<Store>((set) => ({
    id: undefined,
    setid: (state) => set({ id: state }),

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

    timer: localStorage.getItem("timer")
        ? parseInt(localStorage.getItem("timer")!, 10)
        : 60 * 30,
    settimer: (state) => set({ timer: state }),

    handleStart: async (data) => {
        console.log(data);

        await axios
            .post("/api/v1/user", data)
            .then((e) => {
                if (e.data?.message === true) {
                    Store.getState().setIsSubmit(true);
                }
                Cookies.set("id", e.data?.id);
                Store.getState().setid(parseInt(e.data?.id));
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

    handlesubmit: async () => {
        if (Store.getState().id !== undefined) {
            await axios
                .post(`/api/v1/submit/${Store.getState().id}`)
                .then((response) => {
                    console.log(response.data.message);
                });
        }

        // setMessage(response.data.message);
    },

    getdata: async () => {
        if (Store.getState().id !== undefined) {
            await axios
                .get(`/api/v1/user/${Store.getState().id}`)
                .then((response) => {
                    if (response.data?.issubmitted === true) {
                        Store.getState().setIsSubmit(true);
                    }
                });
        }

        // setMessage(response.data.message);
    },
}));
