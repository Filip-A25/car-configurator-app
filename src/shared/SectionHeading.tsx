interface Props {
  title: string;
  text: string;
}

export default function SectionHeading({ title, text }: Props) {
  return (
    <header>
      <h2 className="mb-6 text-lg sm:text-sm">{title}</h2>
      <p>{text}</p>
    </header>
  );
}
