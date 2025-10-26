"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useEvents, Event } from "@/contexts/EventContext";
import { X, Calendar, Clock, FileText } from "lucide-react";

interface EventModalProps {
  date: Date;
  onClose: () => void;
  event?: Event;
}

export default function EventModal({ date, onClose, event }: EventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { addEvent, updateEvent, deleteEvent } = useEvents();

  const isEditing = !!event;
  const dateString = format(date, "yyyy-MM-dd");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      const [h, m] = event.time.split(":");
      setHours(h || "");
      setMinutes(m || "");
    } else {
      setTitle("");
      setDescription("");
      setHours("");
      setMinutes("");
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    // Validate hours and minutes
    const hoursNum = parseInt(hours);
    const minutesNum = parseInt(minutes);

    if (!hours.trim() || !minutes.trim()) {
      setError("Both hours and minutes are required");
      return;
    }

    if (isNaN(hoursNum) || hoursNum < 0 || hoursNum > 23) {
      setError("Hours must be between 00 and 23");
      return;
    }

    if (isNaN(minutesNum) || minutesNum < 0 || minutesNum > 59) {
      setError("Minutes must be between 00 and 59");
      return;
    }

    if (!user) {
      setError("User not authenticated");
      return;
    }

    // Format time as HH:MM
    const timeString = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

    setLoading(true);

    try {
      if (isEditing && event) {
        updateEvent(event.id, {
          title: title.trim(),
          description: description.trim(),
          time: timeString,
        });
      } else {
        addEvent({
          title: title.trim(),
          description: description.trim(),
          date: dateString,
          time: timeString,
          userId: user.uid,
        });
      }
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!event) return;

    setLoading(true);
    try {
      deleteEvent(event.id);
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Event" : "Add Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date Display */}
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">
              {format(date, "EEEE, MMMM d, yyyy")}
            </span>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-blue-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Event title"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time *
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="hours"
                  value={hours}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      value === "" ||
                      (parseInt(value) >= 0 && parseInt(value) <= 23)
                    ) {
                      setHours(value);
                    }
                  }}
                  className="w-full pl-10 pr-3 py-2 text-blue-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="HH"
                  min="0"
                  max="23"
                  required
                />
              </div>
              <span className="text-gray-500 font-medium">:</span>
              <input
                type="number"
                id="minutes"
                value={minutes}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (parseInt(value) >= 0 && parseInt(value) <= 59)
                  ) {
                    setMinutes(value);
                  }
                }}
                className="flex-1 px-3 py-2 text-blue-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="MM"
                min="0"
                max="59"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="relative">
              <div className="absolute top-2 left-3 pointer-events-none">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full pl-10 pr-3 py-2 text-blue-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Event description (optional)"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Delete
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Saving..." : isEditing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
