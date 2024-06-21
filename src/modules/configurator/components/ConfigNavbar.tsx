import { ReturnButton } from "../../../shared";

interface ConfigNavbarProps {
  model: string | undefined;
  productionYear: number | undefined;
}

export function ConfigNavbar({ model, productionYear }: ConfigNavbarProps) {
  return (
    <div className="h-[70px] bg-light-gray-element-color border-b border-input-border-gray flex justify-between items-center px-10">
      <section className="flex justify-between text-2xl min-w-[200px] text-text-default-gray">
        <ReturnButton path="/" />
        <h3 className="text-muted-grey font-optician-sans">{productionYear}</h3>
        <h3 className="font-optician-sans">{model}</h3>
      </section>
      <section className="flex justify-between min-w-[350px] text-text-default-gray text-md">
        <h3 className="font-bold">
          <span className="text-muted-grey">01</span> Exterior
        </h3>
        <h3 className="">
          <span className="text-muted-grey">02</span> Interior
        </h3>
        <h3 className="">
          <span className="text-muted-grey">03</span> Summary
        </h3>
      </section>
    </div>
  );
}
