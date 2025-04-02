import { TrashIcon } from "@heroicons/react/24/outline";

const CommentCard:React.FC = () => {
    const imgUrl: string =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
    return(
        <>
        <div className="flex flex-row gap-3 justify-start border-2 border-grey-800 rounded p-4">
            <img
              src={imgUrl}
              alt="rating image"
              className="w-[5rem] border-2 border-grey-700 p-2 rounded-[50%] shadow-grey-900 shadow"
            />
            <section className="">
              <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold text-slate-700">
                  Food by Chef John Doe.{" "}
                  <span className="font-regular text-sm">5/5</span>
                </h1>
                <TrashIcon className="size-6 text-red-600 cursor-pointer"/>
              </div>
              <p className="text-lg text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
                voluptatibus.
              </p>
              <p>23-10-1994 4:00pm</p>
            </section>
          </div>
        </>
    );
}

export default CommentCard;