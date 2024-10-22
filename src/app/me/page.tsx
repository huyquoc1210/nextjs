import accountApiRequest from "@/apiRequest/account";
import Profile from "@/app/me/profile";
import { cookies } from "next/headers";

const MeProfile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log(sessionToken);

  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <>
      <h1>Me Profile</h1>
      <div>Xin chào {result.payload.data.name}</div>
      <Profile />
    </>
  );
};

export default MeProfile;
