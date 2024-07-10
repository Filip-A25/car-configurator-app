import { ConfigurationSummaryDisplay } from "./ConfigurationSummaryDisplay";
import { UserCarConfiguration } from "../types";
import { SummaryFooter } from "./SummaryFooter";

export function ConfigurationSummary({
  userConfiguration,
}: {
  userConfiguration: UserCarConfiguration;
}) {
  return (
    <>
      <div className="mt-10">
        <h1 className="text-4xl font-bold text-center leading-loose">
          Almost done!
        </h1>
        <h2 className="text-center">
          Review your configuration and save your car.
        </h2>
      </div>
      <ConfigurationSummaryDisplay userConfiguration={userConfiguration} />
      <SummaryFooter userConfiguration={userConfiguration} />
    </>
  );
}
