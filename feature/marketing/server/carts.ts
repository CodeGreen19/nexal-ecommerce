"use server";

import { db } from "@/drizzle/db";
import { cartItems, carts } from "@/drizzle/schema";
import { getUserId } from "@/lib/dal";
import { and, eq } from "drizzle-orm";

type AddToCartType = {
  productVariantId: string;
  quantity: number;
};
export async function addToCart({ productVariantId, quantity }: AddToCartType) {
  const userId = await getUserId();
  const cart = await getOrCreateCart(userId);
  const existingItem = await findCartItem(cart.id, productVariantId);

  if (existingItem) {
    await db
      .update(cartItems)
      .set({
        quantity: existingItem.quantity + quantity,
      })
      .where(eq(cartItems.id, existingItem.id));
    return;
  }

  await db.insert(cartItems).values({
    cartId: cart.id,
    productVariantId,
    quantity,
  });
}

export async function increaseQuantity(itemId: string) {
  const item = await db.query.cartItems.findFirst({
    where: eq(cartItems.id, itemId),
  });

  if (!item) throw new Error("Item not found");

  await db
    .update(cartItems)
    .set({
      quantity: item.quantity + 1,
    })
    .where(eq(cartItems.id, itemId));
}

export async function decreaseQuantity(itemId: string) {
  const item = await db.query.cartItems.findFirst({
    where: eq(cartItems.id, itemId),
  });

  if (!item) throw new Error("Item not found");

  if (item.quantity <= 1) {
    await removeFromCart(itemId);
    return;
  }

  await db
    .update(cartItems)
    .set({
      quantity: item.quantity - 1,
    })
    .where(eq(cartItems.id, itemId));
}

export async function removeFromCart(itemId: string) {
  await db.delete(cartItems).where(eq(cartItems.id, itemId));
}

export async function getCart() {
  const userId = await getUserId();
  const cart = await findActiveCart(userId);

  if (!cart) return null;

  // Manual Join because relations aren't defined
  const itemsWithProductVariant = await db.query.carts.findFirst({
    where: eq(carts.id, cart.id),
    with: {
      cartItems: {
        with: {
          productVariant: { with: { product: { columns: { name: true } } } },
        },
      },
    },
  });
  if (!itemsWithProductVariant) {
    return null;
  }
  return { items: itemsWithProductVariant };
}
//========================== services =======================================//

async function getOrCreateCart(userId?: string) {
  let cart = await findActiveCart(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  return cart;
}
//========================== Helpers =======================================//

async function findActiveCart(userId?: string) {
  if (userId) {
    return db.query.carts.findFirst({
      where: and(eq(carts.userId, userId), eq(carts.status, "active")),
    });
  }
  return null;
}
async function createCart(userId?: string) {
  const [cart] = await db.insert(carts).values({ userId }).returning();
  return cart;
}

async function findCartItem(cartId: string, productVariantId: string) {
  return db.query.cartItems.findFirst({
    where: and(
      eq(cartItems.cartId, cartId),
      eq(cartItems.productVariantId, productVariantId),
    ),
  });
}
