import SectionCard from "../../components/SectionCard";
import RatingsInfo from "./components/RatingsInfo";
import CommentCard from "./components/CommentCard";
import { useForm } from "react-hook-form";
import { RatingFormData, RatinngSchema } from "../../utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import { giveUserRating } from "../../services-url/users";
import { useGetAllRating } from "../../tanstack-queries/users";
const RatingsPage: React.FC = () => {

  const {user} = useUser();
  const {status,data,isFetching,error,refetch} = useGetAllRating();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RatingFormData>({
    resolver: zodResolver(RatinngSchema),
  });

  const onSubmitRatings = async (data: RatingFormData) => {
    try {
      console.log("Submitted ratings: ", data);
      const request = {
        remark: data.remark,
        rating: data.rating,
        userId:user?.id
      };
      const response  = await fetch(giveUserRating, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user?.token,
        },
        body: JSON.stringify(request),
      });

      console.log('Response: ' + response);
      const result = await response.json()
      console.log('Result:' + result);
      if(!response.ok) throw result.error;

      alert('Rating submitted successfully');
      reset();
      refetch();
    } catch (error) {
      console.warn("Error caught while submitting ratings: ", error);
      alert("Error Occured");
    }
  };

  console.log('RTQ: ',{status,data,isFetching,error});

  if (isFetching && status === "pending")
    return <h1 className="text-white">Loading data...</h1>;

  if (error)
    return (
      <h1 className="text-white">
        Error occured while fetching profile details
      </h1>
    );


  return (
    <>
      <SectionCard header="Ratings">
        {/* Info Section */}
        <RatingsInfo />
        {/* Comments Section */}
        <section className="flex flex-row justify-center mt-8">
          <div className="flex flex-col gap-2">
            {/* Comment Cards */}
            {data &&
            data.map((item) => (
              <CommentCard key={item._id} rating={item} refetch={refetch}/>
            ))}
          </div>
        </section>
        <hr className="mt-3 border-slate-700" />
        Ratings form
        <section className="w-full">
          <form onSubmit={handleSubmit(onSubmitRatings)}>
            <div className=" flex flex-row justify-stretch gap-2">
              {/* Remarks Input */}
              <div className="w-full flex flex-col">
                <input
                  className="w-full p-2 border-2 border-slate-800 rounded-md mb-2"
                  type="text"
                  placeholder="Enter Remarks"
                  {...register("remark")}
                />
                {errors.remark && (
                  <span className="error-message">
                    {errors.remark.message}
                  </span>
                )}
              </div>

              {/* Rating Input */}
              <div className="flex flex-col">
                <input
                  className="w-full p-2 border-2 border-slate-800 rounded-md mb-2"
                  type="number"
                  placeholder="Enter Rating"
                  defaultValue={0}
                  {...register("rating", { valueAsNumber: true })}
                />
                {errors.rating && (
                  <span className="error-message">{errors.rating.message}</span>
                )}
              </div>
            </div>

            <Button label="Submit" type="submit" />
          </form>
        </section>
      </SectionCard>
    </>
  );
};

export default RatingsPage;
