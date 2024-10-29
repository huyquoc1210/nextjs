import AppContext from "@/app/AppProvider";

import { useContext } from "react";

const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Settings context must be within aProvider");
  }

  return context;
};

export default useApp;