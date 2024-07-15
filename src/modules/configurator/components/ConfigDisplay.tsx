import { ConfigNavbar } from "./ConfigNavbar";
import { ConfigEdit } from "./ConfigEdit";
import { ConfigurationSummary } from "./ConfigurationSummary";
import { useRecoilValue, useRecoilState } from "recoil";
import { activePageState, userConfigurationState, pageState } from "../state";
import { PageLoading } from "../../global/components";
import { useConfigEdit } from "../hooks";
import { useNavigate } from "react-router-dom";
import { configuratorRoutes } from "../const";

export function ConfigDisplay() {
  const activePage = useRecoilValue(activePageState);
  const configuration = useRecoilValue(userConfigurationState);
  const [pages, setPages] = useRecoilState(pageState);

  const navigate = useNavigate();

  const { isDropdownOpen, activeDropdownName } = useConfigEdit();

  const handleNavigateBack = () => {
    if (!activePage) return;
    if (activePage.index === 1) {
      return navigate(configuratorRoutes.carSelect);
    }

    const newPages = pages.map((page) => ({
      ...page,
      isActive: page.index === activePage.index - 1,
    }));

    setPages(newPages);
  };

  if (!configuration) return <PageLoading />;

  return (
    <section className="sm:relative h-full">
      <ConfigNavbar
        returnOnClick={handleNavigateBack}
        model={configuration.model}
        productionYear={configuration.productionYear}
        isConfigurationEdit
      />
      {activePage?.name === "Summary" ? (
        <ConfigurationSummary />
      ) : (
        <ConfigEdit
          isDropdownOpen={isDropdownOpen}
          activeDropdownName={activeDropdownName}
        />
      )}
    </section>
  );
}
