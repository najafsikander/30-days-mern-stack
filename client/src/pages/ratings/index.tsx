import SectionCard from "../../components/SectionCard";
import RatingsInfo from "./components/RatingsInfo";
import CommentCard from "./components/CommentCard";
const RatingsPage: React.FC = () => {
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
        <hr className="mt-3 border-slate-700"/>
      </SectionCard>
    </>
  );
};

export default RatingsPage;
