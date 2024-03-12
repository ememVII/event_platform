import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getEventsByOrganizer } from "@/lib/actions/event.actions";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const ProfilePage = async ({ searchParams }: SearchParamsProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByOrganizer({ userId, page: 1 });

  const organizedEventsPage = Number(searchParams?.page) || 1;

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets: </h3>
          <Button asChild className="button hidden sm:flex" size={"lg"}>
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8">
        <Collection
            data={relatedEvent?.data}
            emptyTitle="No Events Found"
            emptySubText="Come Back Later"
            collectionType="My_Tickets"
            limit={6}
            page={1}
            urlParamName='ordersPage'
            totalPages={2}
          />
      </section> */}

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Events Organized:{" "}
          </h3>
          <Button asChild className="button hidden sm:flex" size={"lg"}>
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Organized Events have been created"
          emptySubText="Create Some Now"
          collectionType="Events_Organized"
          limit={3}
          page={organizedEventsPage}
          totalPages={organizedEvents?.totalPages}
          urlParamName="eventsPage"
        />
      </section>
    </>
  );
};

export default ProfilePage;
