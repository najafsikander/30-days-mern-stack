import { TrashIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../../hooks/useUser";
import { deleteUserRating } from "../../../services-url/users";

type User ={
  _id:string;
  firstName:string;
  lastName:string;
  email:string;
  createdAt?:string;
  profilePic?:string;
}

type userRating = {
  _id:string;
  createdAt:string;
  rating:number;
  remark:string;
  userId: User;
}

type Props = {
  rating: userRating,
  refetch: ()=>void;
}
const CommentCard:React.FC<Props> = ({rating:{rating,remark, userId,_id,createdAt}, refetch}) => {
  
    const {user} = useUser();

    const imgUrl: string =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";

    const getCommentDateTime = (dateTime:string):string => {
      const date = dateTime.split('T')[0];
      const time = dateTime.split('T')[1].split('.')[0];
      
      return `${date} - ${time}`;
    }

    const deleteUserRatingCall = async () => {
      try {
        const response = await fetch(deleteUserRating(_id), {
          method:'DELETE',
          headers:{
            Authorization: 'Bearer ' + user?.token
          }
        });

        const result = await response.json();
        console.log('Api response: ',{
          response,
          result
        });
        if(!response.ok) throw result.error;
        alert('User rating deleted successfully');
        refetch();
      } catch (err) {
        console.warn('Error deleting user rating: ',err);
        alert('Error deleting user rating');
      }
    }
    return(
        <>
        <div className="flex flex-row gap-3 justify-start border-2 border-grey-800 rounded p-4">
            <img
              src={userId.profilePic? `http://localhost:3000${userId?.profilePic}`: imgUrl}
              alt="rating image"
              className="w-[5rem] border-2 border-grey-700 rounded-[50%] shadow-grey-900 shadow"
            />
            <section className="">
              <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold text-slate-700">
                  {remark}
                  <span className="font-regular text-sm">{rating}/5</span>
                </h1>
                {
                  user?.id === userId._id &&
                  <TrashIcon className="size-6 text-red-600 cursor-pointer" onClick={deleteUserRatingCall}/>
                }
              </div>
              <p className="text-lg text-slate-500">
                {userId.firstName + " " + userId.lastName}
              </p>
              <p>{getCommentDateTime(new Date(createdAt).toISOString())}</p>
            </section>
          </div>
        </>
    );
}

export default CommentCard;