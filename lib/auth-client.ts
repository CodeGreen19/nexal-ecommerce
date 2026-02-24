import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, manager } from "./permissions";
export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        manager,
      },
    }),
  ],
});
