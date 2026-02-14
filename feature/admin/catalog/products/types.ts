import { getProducts } from "./queries";

export type ProductType = Awaited<ReturnType<typeof getProducts>>[number];
