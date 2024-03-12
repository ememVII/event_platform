import HoverOrganizer from "@/components/shared/HoverOrganizer";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchEventParams } from "@/types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import CheckoutButton from "@/components/shared/CheckoutButton";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchEventParams) => {
  const event = await getEventById(id);

  const relatedEvent = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  const page = Number(searchParams?.page) || 1;

  return (
    <>
      <section className="flex justify-center bg-grey-50 bg-dotted-pattern bg-contain">
        <div className="wrapper mx-10 grid grid-cols-1 md:grid-cols-2">
          <Image
            src={event.imageUrl}
            alt="hero event image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex flex-col gap-5 p-5 md:p-10">
            <h2 className="h2-bold">{event.title}</h2>

            <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/30 px-5 py-2 text-green-700">
                  {event.isFree ? "Free" : `$${event.price}`}
                </p>

                <p className="p-bold-16 rounded-full bg-grey-500/30 px-5 py-2.5 text-grey-600">
                  {event.category.name}
                </p>
              </div>
              <HoverOrganizer
                orgUserName={event.organizer.username}
                orgFirstName={event.organizer.firstName}
                orgLastName={event.organizer.lastName}
                orgPhoto={event.organizer.photo}
                orgEmail={event.organizer.email}
              />
            </div>

            {/* Checkout Button */}
            <CheckoutButton event={event} />

            <div className="mt-4 flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calender"
                  width={32}
                  height={32}
                />
                <div className="p-medium-14 sm:p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <div>
                    <p>
                      {formatDateTime(event.startDateTime).dateOnly} -{" "}
                      {formatDateTime(event.startDateTime).timeOnly}
                    </p>
                    <Separator />
                    <p>
                      {formatDateTime(event.endDateTime).dateOnly} -{" "}
                      {formatDateTime(event.endDateTime).timeOnly}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 md:gap-3">
                <Image
                  src={"/assets/icons/location.svg"}
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-14 sm:p-medium-16 lg:p-regular-20">
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <Link
                href={event.url}
                target="_blank"
                className="truncate text-primary-500 underline"
              >
                {event.url}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events with the same Category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        <Collection
          data={relatedEvent?.data}
          emptyTitle="No Events Found"
          emptySubText="Come Back Later"
          limit={3}
          page={page}
          totalPages={relatedEvent?.totalPages}
          collectionType="All_Events"
        />
      </section>
    </>
  );
};

export default EventDetails;
