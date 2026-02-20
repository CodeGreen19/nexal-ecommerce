"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function ProfilePage() {
  const { isPending, error, data } = authClient.useSession();

  if (isPending) {
    return <div>Pending...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>Profile info</CardTitle>
      </CardHeader>
      <CardContent>
        <div>name: {data?.user.name}</div>
        <div>email: {data?.user.email}</div>
      </CardContent>
    </Card>
  );
}
