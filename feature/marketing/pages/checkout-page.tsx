import React from "react";
import ProfileAddress from "../components/account/profile/profile-address";
import { OrderSummery } from "../components/checkout/order-summary";
import { PaymentMethod } from "../components/checkout/payment-method";
import { CheckoutButton } from "../components/checkout/checkout-button";

export default function CheckoutPage() {
  return (
    <div className="space-y-3 p-4">
      <ProfileAddress />
      <PaymentMethod />
      <OrderSummery />
      <CheckoutButton />
    </div>
  );
}
