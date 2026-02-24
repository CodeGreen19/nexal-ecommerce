import { createAccessControl } from "better-auth/plugins/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  product: ["create", "view", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

const manager = ac.newRole({
  product: ["create", "view", "update"],
});

export { ac, manager };
