import { Link } from "react-router-dom";
import emptyStateCarImg from "../../assets/audi-rs6/front-blue-1.png";

export default function ConfigurationsEmpty() {
  return (
    <section className="flex flex-col items-center py-20 md:px-12 lg:px-16 xl:px-28">
      <img
        src={emptyStateCarImg}
        alt="Car"
        className="filter grayscale opacity-10 w-[641px] h-[200px] object-contain"
      />
      <div className="md:px-24 lg:px-32 xl:px-48 2xl:px-80 pt-10">
        <p className="text-center par-font-size">
          You haven't configured any cars yet. You may choose to{" "}
          <Link to="" className="text-text-purple font-bold">
            configure some now.
          </Link>
        </p>
      </div>
    </section>
  );
}
