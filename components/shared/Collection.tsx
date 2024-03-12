import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";

type Collection = {
  data: IEvent[];
  emptyTitle: string;
  emptySubText: string;
  limit: number;
  page: number;
  totalPages?: number;
  urlParamName?: string;
  collectionType: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  emptyTitle,
  emptySubText,
  page,
  limit,
  totalPages = 0,
  urlParamName,
  collectionType,
}: Collection) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderedLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  <Card
                    event={event}
                    hasOrderedLink={hasOrderedLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptySubText}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
