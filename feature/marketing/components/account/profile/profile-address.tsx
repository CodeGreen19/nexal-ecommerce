"use client";

import { getAddress } from "@/feature/marketing/server/account-profile";
import { useQuery } from "@tanstack/react-query";
import { ProfileAddressForm } from "./profile-address-form";

export default function ProfileAddress() {
  const { isPending, error, data } = useQuery({
    queryKey: ["profile-address"],
    queryFn: () => getAddress(),
  });
  console.log(error, data);

  if (isPending) {
    return <div>Is pending...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div>
      <ProfileAddressForm type="add" existedValues={data?.address} />
    </div>
  );
}
