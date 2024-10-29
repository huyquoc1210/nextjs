import accountApiRequest from "@/apiRequest/account";
import ProfileForm from "@/app/me/profile-form";
// import Profile from "@/app/me/profile";
import { cookies } from "next/headers";

const MeProfile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  // Vì dùng cookie nên api này sẽ không được cached trên server
  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <>
      <h1>Me Profile</h1>
      <ProfileForm profile={result.payload.data} />
      {/* <Profile /> */}
    </>
  );
};

export default MeProfile;
