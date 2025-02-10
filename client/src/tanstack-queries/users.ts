import { fetcher } from '../utils/fetcher';
import { getAllUsers,getSingleUser } from './../services-url/users';
import { useQuery } from "@tanstack/react-query";

type User ={
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    createdAt?:string;
}

//Response for getting all users
type responseMulti = {
    users: User[];
    total: number;
}


export function useGetAllUsers (skip:number, limit:number, sortBy:string)  {
    return useQuery({
        queryKey:['users'],
        queryFn:async () => fetcher<responseMulti>(getAllUsers+`?skip=${skip}&limit=${limit}&sortBy=${sortBy}`)
    })
}

export function useSingleUser(id:string) {
    return useQuery({
        queryKey:['user',id],
        queryFn: async () => {
            if(!id) return null;
            return fetcher<User>(getSingleUser(id))
        }
    })
}

