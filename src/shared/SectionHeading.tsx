interface HeadingProps {
  title: string;
  text: string;
}

export default function SectionHeading({ title, text }: HeadingProps) {
  return (
    <header>
      <h2 className="mb-2 text-xl">{title}</h2>
      <p className="text-xs">{text}</p>
    </header>
  );
}
