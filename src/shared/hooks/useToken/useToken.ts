import { useEffect, useState } from "react";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";

const useToken = () => {
    const [token, setToken] = useState(localStorage.getItem(USER_LOCALSTORAGE_KEY));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem(USER_LOCALSTORAGE_KEY));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return token;
}

export default useToken