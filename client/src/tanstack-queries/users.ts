import { fetcher } from '../utils/fetcher';
import { getAllUsers,getSingleUser, getUserRating } from './../services-url/users';
import { useQuery } from "@tanstack/react-query";

type User ={
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    createdAt?:string;
    profilePic?:string;
}

//Response for getting all users
type responseMulti = {
    users: User[];
    total: number;
}

type userRating = {
    _id:string;
    createdAt:string;
    rating:number;
    remark:string;
    userId: User;
}


export function useGetAllUsers (skip:number, limit:number, sortBy:string, searchEmail:string)  {
    return useQuery({
        queryKey:['users'],
        queryFn:async () => fetcher<responseMulti>(getAllUsers+`?skip=${skip}&limit=${limit}&sortBy=${sortBy}&email=${searchEmail}`)
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

export function useGetAllRating() {
    return useQuery({
        queryKey:['rating'],
        queryFn: async () => fetcher<userRating[]>(getUserRating)
    })
}

