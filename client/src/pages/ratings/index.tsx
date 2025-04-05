import SectionCard from "../../components/SectionCard";
import RatingsInfo from "./components/RatingsInfo";
import CommentCard from "./components/CommentCard";
import { useForm } from "react-hook-form";
import { RatingFormData, RatinngSchema } from "../../utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
const RatingsPage: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RatingFormData>({
    resolver: zodResolver(RatinngSchema),
  });

  const onSubmitRatings = (data: RatingFormData) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <>
      <SectionCard header="Ratings">
        {/* Info Section */}
        <RatingsInfo />
        {/* Comments Section */}
        <section className="flex flex-row justify-center mt-8">
          <div className="flex flex-col gap-2">
            {/* Comment Cards */}
            <CommentCard />
            <CommentCard />
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
                  {...register("remarks")}
                />
                {errors.remarks && (
                  <span className="error-message">
                    {errors.remarks.message}
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
