export type CreateUserParams = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// Create Category
export type CreateCategoryParams = {
  categoryName: string;
};

// Event Params
export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    categoryId: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

// Single Event Params after user create event
export type SearchEventParams = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Search Params Props
export interface SearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Get All Events
export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

// DeleteConfirmation Params
export type DeleteEventProps = {
  eventId: string;
  path: string;
};

// Update Event Params
export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    description: string;
    categoryId: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

// Get Events By Organizer
export type GetEventsByOrganizerParams = {
  userId: string;
  limit?: number;
  page: number;
};

// Get Related Events By Category
export type GetRelatedEventsByCategoryParams = {
  eventId: string;
  categoryId: string;
  limit?: number;
  page: number | string;
};
