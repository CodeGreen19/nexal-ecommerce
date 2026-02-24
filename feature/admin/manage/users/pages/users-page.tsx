import { auth } from "@/lib/auth";

export async function UsersPage() {
  return (
    <div>
      <Users />
    </div>
  );
}

async function Users() {
  return <div>works fine</div>;
}
