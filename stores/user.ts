import { defineStore } from "pinia";
import type { User, Customer, Login } from "../types/myuser";
import { ref } from "vue";
import { useCookie } from "#app";

export const useUserStore = defineStore("user", () => {
    // State
    const myUser = ref();
    const myToken = useCookie("MY_COOKIE", {
        maxAge: 60 * 60,
    });

    // Actions
    const setToken = (data?: string) => (myToken.value = data);
    const setUser = (data?: any) => (myUser.value = data);

    const signIn = async (data: Login) => {
        try {
            const res = await $fetch<User>("https://dummyjson.com/auth/login", {
                method: "POST",
                body: data,
            });

            setToken(res.token);
            await fetchCustomer();
        } catch (error) {
            setToken();
            setUser();
            console.log(error);
        }
    };

    const fetchCustomer = async () => {
        if (myToken.value) {
            try {
                const res = await $fetch<Customer>(
                    "https://dummyjson.com/auth/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${myToken.value}`,
                        },
                    }
                );
                setUser(res);
            } catch (error) {
                setUser();
                console.log(error);
            }
        }
    };

    const signOut = () => {
        setToken();
        setUser();
    };

    return {
        myUser,
        myToken,
        signIn,
        fetchCustomer,
        signOut,
        setToken,
        setUser,
    };
});
