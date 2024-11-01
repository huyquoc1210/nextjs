"use client";

import authApiRequest from "@/apiRequest/auth";
import { useAppContext } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const ButtonLogout = () => {
  const { setUser } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFormNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({
        error,
      });
      authApiRequest
        .logoutFormNextClientToNextServer(true)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((res) => {
          router.push(`/login?redirectFrom=${pathname}`);
        });
    } finally {
      setUser(null);
      router.refresh();
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionTokenExpiresAt");
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
};

export default ButtonLogout;
