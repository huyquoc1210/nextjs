"use client";

import { useRouter } from "next/navigation";

const ButtonRedirect = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/login");
  };

  return <button onClick={handleNavigate}>Chuyển sang trang Login</button>;
};

export default ButtonRedirect;
