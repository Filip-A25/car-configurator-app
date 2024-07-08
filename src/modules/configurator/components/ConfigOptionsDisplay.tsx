import { deleteUserConfiguration } from "../services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../authentification/state";
import { notifyDelete } from "../utilities/utilities";

export function ConfigOptionsDisplay() {
  const user = useRecoilValue(userState);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const modelId = searchParams.get("modelId");
  const configId = searchParams.get("configId");

  const handleDeleteClick = async () => {
    if (!user || !configId) throw new Error("Data could not be found.");
    try {
      await deleteUserConfiguration(user.id, configId);
      notifyDelete();
      navigate("/home/configurations");
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const handleEditConfigurationNavigate = () => {
    navigate(
      `/home/configure-a-car/configuration-edit/query?modelId=${modelId}&configId=${configId}`
    );
  };

  return (
    <>
      <button
        className="text-button-purple pl-10 py-6 text-sm"
        onClick={handleEditConfigurationNavigate}
      >
        Edit configuration
      </button>
      <button
        className="text-text-red pl-10 py-6 text-sm"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </>
  );
}
