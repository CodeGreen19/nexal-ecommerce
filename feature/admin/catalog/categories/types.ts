import { getCategories } from "./queries";

export type CategoryType = Awaited<ReturnType<typeof getCategories>>[number];
