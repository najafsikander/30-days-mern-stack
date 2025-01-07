import { fetcher } from '../utils/fetcher';
import { getAllUsers } from './../services-url/users';
import { useQuery } from "@tanstack/react-query";

type User ={
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
}
export function useGetAllUsers ()  {
    return useQuery({
        queryKey:['users'],
        queryFn:async () => fetcher<User[]>(getAllUsers)
    })
}

