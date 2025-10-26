"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  userId: string;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsForDate: (date: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth();

  // Load events from localStorage on mount or when user changes
  useEffect(() => {
    if (!user) {
      setEvents([]);
      return;
    }

    const storageKey = `calendar-events-${user.uid}`;
    const savedEvents = localStorage.getItem(storageKey);
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setEvents(parsedEvents);
      } catch (error) {
        console.error("Error loading events from localStorage:", error);
      }
    } else {
      setEvents([]);
    }
  }, [user]);

  // Save events to localStorage whenever events change (only if user is logged in)
  useEffect(() => {
    if (!user) return;

    const storageKey = `calendar-events-${user.uid}`;
    localStorage.setItem(storageKey, JSON.stringify(events));
  }, [events, user]);

  const addEvent = (eventData: Omit<Event, "id">) => {
    if (!user) return;

    const newEvent: Event = {
      ...eventData,
      userId: user.uid, // Ensure userId matches current user
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    if (!user) return;

    setEvents((prev) =>
      prev.map((event) =>
        event.id === id && event.userId === user.uid
          ? { ...event, ...eventData }
          : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    if (!user) return;

    setEvents((prev) =>
      prev.filter((event) => {
        // Only allow deletion if the event belongs to the current user
        if (event.id === id && event.userId !== user.uid) {
          return true; // Keep the event if it's not owned by current user
        }
        return event.id !== id; // Remove if it's the event to delete and owned by current user
      })
    );
  };

  const getEventsForDate = (date: string) => {
    if (!user) return [];
    return events.filter(
      (event) => event.date === date && event.userId === user.uid
    );
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}
