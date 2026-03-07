"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const paymentMethods = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
  },
  {
    id: "bkash",
    label: "bKash",
    description: "Pay securely using bKash",
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard supported",
  },
];

export function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>

      <CardContent>
        <RadioGroup defaultValue="cod" className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div className="space-y-1">
                <Label htmlFor={method.id}>{method.label}</Label>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>

              <RadioGroupItem value={method.id} id={method.id} />
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
