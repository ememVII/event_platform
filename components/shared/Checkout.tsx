import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";

type CheckoutParams = {
  event: IEvent;
  userId: string;
};

const Checkout = ({ event, userId }: CheckoutParams) => {
  const onCheckout = () => {
    console.log("Checkout");
  };

  return (
    <form action={onCheckout} method='post'>
      <Button type="submit" size="lg" role="link" className="button sm:w-fit">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
