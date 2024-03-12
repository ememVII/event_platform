"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div>
      {hasEventFinished ? (
        <p className="p-2">Sorry, Event is no longer available..</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild size="lg" className="button">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
