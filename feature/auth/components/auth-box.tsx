"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./signin-form";
import { SignUpForm } from "./signup-form";

export function AuthBox() {
  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value="signin" className="mt-4">
        <SignInForm />
      </TabsContent>

      <TabsContent value="signup" className="mt-4">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
}
