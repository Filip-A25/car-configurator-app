import { Car } from "../types/carType";
import PrimaryButtonLink from "../../../shared/PrimaryButtonLink";

export default function CarItem({ model, productionYear, photo }: Car) {
  return (
    <div>
      <section>
        <img src={photo} alt={model} />
      </section>
      <section>
        <h3>{productionYear}</h3>
        <h1>{model}</h1>
        <PrimaryButtonLink path="/" title="Configure Now" />
      </section>
    </div>
  );
}
