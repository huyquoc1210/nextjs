"use client";

import authApiRequest from "@/apiRequest/auth";

import { useEffect } from "react";
import { differenceInHours } from "date-fns";

const SlideSession = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const sessionTokenExpiresAt = new Date(
        localStorage.getItem("sessionTokenExpiresAt")
      );

      const expiresAt = sessionTokenExpiresAt
        ? new Date(sessionTokenExpiresAt)
        : new Date();
      if (differenceInHours(expiresAt, now) < 1) {
        const res =
          await authApiRequest.slideSessionFromNextClientToNextServer();
        localStorage.setItem(
          "sessionTokenExpiresAt",
          res.payload.data.expiresAt
        );
      }
    }, 100 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SlideSession;
