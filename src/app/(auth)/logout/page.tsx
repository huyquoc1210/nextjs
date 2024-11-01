"use client";

import authApiRequest from "@/apiRequest/auth";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const LogoutLogic = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (sessionToken === localStorage.getItem("sessionToken")) {
      authApiRequest
        .logoutFormNextClientToNextServer(true, signal)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((res) => {
          router.push(`/login?redirectFrom=${pathname}`);
        });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, pathname, router]);

  return <div>pages</div>;
};

export default function LogoutPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}
