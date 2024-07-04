import carLoadingImage from "../../configurator/assets/audi-rs6/front-blue-1.png";

export function PageLoading() {
  return (
    <img
      src={carLoadingImage}
      alt="Car"
      className="filter grayscale opacity-10 w-[641px] h-[200px] object-contain mx-auto my-52 animate-pulse"
    />
  );
}
