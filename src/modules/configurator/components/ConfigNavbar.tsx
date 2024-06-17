import { ReturnButton } from "../../../shared";

interface ConfigNavbarProps {
  model: string;
  productionYear: number;
}

export function ConfigNavbar({ model, productionYear }: ConfigNavbarProps) {
  return (
    <div className="h-[60px] bg-light-gray-element-color border-b border-input-border-gray flex justify-between items-center px-8">
      <section className="flex justify-between text-2xl min-w-[200px] text-text-default-gray">
        <ReturnButton path="/" />
        <h3 className="text-muted-grey font-optician-sans">{productionYear}</h3>
        <h3 className="font-optician-sans">{model}</h3>
      </section>
      <section className="flex justify-between min-w-[300px] text-text-default-gray">
        <h3 className="text-sm font-bold">
          <span className="text-muted-grey">01</span> Exterior
        </h3>
        <h3 className="text-sm">
          <span className="text-muted-grey">02</span> Interior
        </h3>
        <h3 className="text-sm">
          <span className="text-muted-grey">03</span> Summary
        </h3>
      </section>
    </div>
  );
}
