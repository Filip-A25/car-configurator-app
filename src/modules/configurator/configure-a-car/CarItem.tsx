import PrimaryButtonLink from "../../../shared/PrimaryButtonLink";

interface CarItemProps {
  model: string;
  productionYear: number;
  photo?: string;
}

export default function CarItem({
  model,
  productionYear,
  photo,
}: CarItemProps) {
  return (
    <div>
      <section></section>
      <section>
        <h3>{productionYear}</h3>
        <h1>{model}</h1>
        <PrimaryButtonLink path="/" label="Configure Now" />
      </section>
    </div>
  );
}
