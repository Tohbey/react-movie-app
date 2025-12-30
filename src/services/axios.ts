import axios from "axios";
import { useAppState } from "../context/hook";
import { useMemo } from "react";

export const useAxios = () => {
  const { appContants } = useAppState();

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: appContants?.BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${appContants?.AUTHORIZATION}`,
      },
    });
  }, [appContants?.BASE_URL, appContants?.AUTHORIZATION]);

  return axiosInstance;
};
