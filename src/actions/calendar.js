import { Types } from "../types/types";

export const deleteEvent = (id) => ({
  type: Types.calendarDelete,
  payload: id
})

export const updateEvent = (event) => ({
  type: Types.calendarUpdate,
  payload: event
});

export const setActiveEvent = (activeEvent) => ({
  type: Types.calendarSetActive,
  payload: activeEvent
});

export const unsetActiveEvent = () => ({
  type: Types.calendarUnsetActive
});

export const createNewEvent = (newEvent) => ({
  type: Types.calendarNewEvent,
  payload: newEvent
})