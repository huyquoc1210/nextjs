"use client";
import accountApiRequest from "@/apiRequest/account";
import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.meClient();
      console.log(result);
    };
    fetchRequest();
  }, []);
  return <div>profile</div>;
};

export default Profile;
