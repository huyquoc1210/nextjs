import accountApiRequest from "@/apiRequest/account";
import ProfileForm from "@/app/me/profile-form";
import type { Metadata } from "next";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Hồ sơ người dùng",
};

const MeProfile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  // Vì dùng cookie nên api này sẽ không được cached trên server
  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <>
      <h1>Me Profile</h1>
      <ProfileForm profile={result.payload.data} />
    </>
  );
};

export default MeProfile;
