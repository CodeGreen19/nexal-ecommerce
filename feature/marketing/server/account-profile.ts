"use server";

import { db } from "@/drizzle/db";
import { userAddress } from "@/drizzle/schema/address";
import {
  customError,
  customSuccess,
  MutationResult,
} from "@/helpers/db/return";
import { getUserId } from "@/lib/dal";
import { eq, SQL } from "drizzle-orm";
import { addressSchema, AddressSchemaType } from "../schema/account-profile";

export async function addOrUpdateAddress({
  value,
}: {
  value: AddressSchemaType;
}): Promise<MutationResult> {
  const { success, data } = addressSchema.safeParse(value);
  if (!success) {
    return customError("Invalid data !");
  }

  const userId = await getUserId();
  if (!userId) {
    return customError("User not found");
  }

  const targetAddress: SQL = eq(userAddress.userId, userId);
  const [userAddressExist] = await db
    .select()
    .from(userAddress)
    .where(targetAddress);

  if (userAddressExist) {
    await db
      .update(userAddress)
      .set({ address: data.address })
      .where(targetAddress);
    return customSuccess("Address Updated");
  }

  await db.insert(userAddress).values({ userId, address: data.address });

  return customSuccess("Address added");
}

//---------------------------------update product----------------------------------//
export async function getAddress() {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("User not found");
  }
  const [address] = await db
    .select()
    .from(userAddress)
    .where(eq(userAddress.userId, userId));
  if (!address) {
    return null;
  }
  return { address };
}
