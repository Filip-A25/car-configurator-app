import ConfigureLinkButton from "./ConfigureLinkButton";

export default function HomeView() {
  return (
    <section className="px-10 py-10">
      <header className="flex justify-between">
        <h2>View saved configurations</h2>
        <ConfigureLinkButton path="" />
      </header>
    </section>
  );
}
