import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/dal";
import { Suspense, Fragment } from "react";
import ProfileAddress from "../components/account/profile/profile-address";

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
    <Fragment>
      <Card className="mx-4 xl:mx-0">
        <CardHeader>
          <CardTitle>Profile info</CardTitle>
        </CardHeader>
        <CardContent>
          <div>name: {res.user.name}</div>
          <div>email: {res.user.email}</div>
        </CardContent>
      </Card>
      <ProfileAddress />
    </Fragment>
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
