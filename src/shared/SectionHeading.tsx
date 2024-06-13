interface HeadingProps {
  title: string;
  text: string;
}

export default function SectionHeading({ title, text }: HeadingProps) {
  return (
    <header>
      <h2 className="mb-2 3xl:mb-4 text-xl 3xl:text-3xl">{title}</h2>
      <p className="text-xs 3xl:text-lg">{text}</p>
    </header>
  );
}
