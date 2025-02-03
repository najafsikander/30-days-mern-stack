import { fetcher } from '../utils/fetcher';
import { getAllUsers } from './../services-url/users';
import { useQuery } from "@tanstack/react-query";

type User ={
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
}

type response = {
    users: User[];
    total: number;
}
export function useGetAllUsers (skip:number, limit:number, sortBy:string)  {
    return useQuery({
        queryKey:['users'],
        queryFn:async () => fetcher<response>(getAllUsers+`?skip=${skip}&limit=${limit}&sortBy=${sortBy}`)
    })
}

