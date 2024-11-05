import { $api } from '@/shared/api/api'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { getRouteMain } from '@/shared/const/router'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

interface LoginByUsernameProps {
    username: string
    password: string
}

interface LoginResponseData {
    error_code: number;
    error_message: string;
    data: {
        token: string;
    };
    profiling: string;
    timings: null;
}

export const useAuth = () => {
    const navigate = useNavigate()
    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({ username, password }: LoginByUsernameProps) => {
            return await $api.post<LoginResponseData>('/ru/data/v3/testmethods/docs/login', { username, password })
        },
        onSuccess: ({ data }) => {
            if (data) {
                localStorage.setItem(USER_LOCALSTORAGE_KEY, data.data.token)
                navigate(getRouteMain())
            }

        },
        onError: (error) => {
            console.error(error)
        }
    })
    return { mutate, isPending, isError }
}