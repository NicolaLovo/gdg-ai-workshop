import { useMemo } from "react";
import { ApiClient } from "../api/ApiClient";

export const useApiClient = () => {
  const apiClient = useMemo(() => {
    return new ApiClient();
  }, []);

  return { apiClient };
};
