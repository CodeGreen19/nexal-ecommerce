"use server";

import { db } from "@/drizzle/db";
import { cartItems, carts, products } from "@/drizzle/schema";
import { getUserId } from "@/lib/dal";
import { and, desc, eq } from "drizzle-orm";

type AddToCartType = {
  productId: string;
  price: number;
  quantity: number;
};
export async function addToCart({ productId, quantity, price }: AddToCartType) {
  const userId = await getUserId();
  const cart = await getOrCreateCart(userId);
  const existingItem = await findCartItem(cart.id, productId);

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
    productId,
    priceSnapshot: price,
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
  const itemsWithProducts = await db
    .select({
      // Select Cart Item fields
      id: cartItems.id,
      quantity: cartItems.quantity,
      priceSnapshot: cartItems.priceSnapshot,
      createdAt: cartItems.createdAt,
      // Select specific Product fields (Minimal data)
      product: {
        id: products.id,
        name: products.name,
        price: products.price,
      },
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id)) // The link
    .where(eq(cartItems.cartId, cart.id))
    .orderBy(desc(cartItems.createdAt));

  return {
    ...cart,
    items: itemsWithProducts,
  };
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

async function findCartItem(cartId: string, productId: string) {
  return db.query.cartItems.findFirst({
    where: and(
      eq(cartItems.cartId, cartId),
      eq(cartItems.productId, productId),
    ),
  });
}
