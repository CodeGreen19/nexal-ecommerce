import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/dal";
import { Suspense } from "react";

export async function AccountProfilePage() {
  return (
    <Suspense fallback={<AccountProfileSkeleton />}>
      <AccountProfile />
    </Suspense>
  );
}

async function AccountProfile() {
  const res = await getSession();

  return (
    <Card className="mx-4 xl:mx-0">
      <CardHeader>
        <CardTitle>Profile info</CardTitle>
      </CardHeader>
      <CardContent>
        <div>name: {res.user.name}</div>
        <div>email: {res.user.email}</div>
      </CardContent>
    </Card>
  );
}

function AccountProfileSkeleton() {
  return (
    <Card className="mx-4 xl:mx-0">
      <CardHeader>
        <CardTitle>Profile info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton />
      </CardContent>
    </Card>
  );
}
