"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../server/orders";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CheckoutButton() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push("/");
    },
  });
  return (
    <div className="flex items-center justify-center ">
      <Button
        disabled={isPending}
        onClick={() => {
          mutate({ provider: "cod", shippingCost: 100 });
        }}
      >
        Confirm
      </Button>
    </div>
  );
}
