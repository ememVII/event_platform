"use server";

import {
  CreateEventParams,
  DeleteEventProps,
  GetAllEventsParams,
  GetEventsByOrganizerParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

const getEventByCategory = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName photo email username",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDB();
    // find organizer of event
    const organizer = await User.findById(userId);

    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

// Get One Event by ID
export const getEventById = async (eventId: string) => {
  try {
    await connectToDB();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) throw new Error("Event not found!");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

// Get All Events
export const getAllEvents = async ({
  query,
  category,
  limit = 6,
  page,
}: GetAllEventsParams) => {
  try {
    await connectToDB();

    // if user search for event
    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    // if user search by category
    const categoryCondition = category
      ? await getEventByCategory(category)
      : null;

    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);

    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// Get Events by Organizer
export const getEventsByOrganizer = async ({
  userId,
  limit = 6,
  page,
}: GetEventsByOrganizerParams) => {
  try {
    await connectToDB();

    const conditions = { organizer: userId };

    const skipAmount = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);

    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// Get Related Events: By Same Category
export const getRelatedEventsByCategory = async ({
  eventId,
  categoryId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) => {
  try {
    await connectToDB();
    /* { _id: { $ne: eventId } } is used to ensure that the returned events do not include the event with the specified eventId. */
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const skipAmount = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);

    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// Delete Event
export const deleteEvent = async ({ eventId, path }: DeleteEventProps) => {
  try {
    await connectToDB();

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

// Update Event
export const updateEvent = async ({
  userId,
  event,
  path,
}: UpdateEventParams) => {
  try {
    await connectToDB();
    // Get user Id and check if he is not admin
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const adminId = process.env.NEXT_PUBLIC_AdminId;

    const eventToUpdate = await Event.findById(event._id);

    // Only Oragnizer and Admin who is Authorized to edit Event
    const unAuthorized =
      eventToUpdate.organizer.toHexString() !== userId && userId !== adminId;

    if (!eventToUpdate || unAuthorized) {
      throw new Error("Unauthorized user or missing event");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true },
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
};
