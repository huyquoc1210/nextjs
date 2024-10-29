"use client";

import { clientSessionToken } from "@/lib/http";
import { FCC } from "@/types/react";
import { useState } from "react";

const AppProvider: FCC<{
  initialSessionToken?: string;
}> = (props) => {
  const { children, initialSessionToken = "" } = props;
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });

  return <>{children}</>;
};

export default AppProvider;
