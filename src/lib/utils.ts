import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fetches events from the backend API by category.
 * @param category - The category of events to fetch (default: 'education')
 * @returns {Promise<Array>} Array of event objects in the app's format.
 */
export async function fetchEventsByCategory(category: string = 'education') {
  // Call your backend endpoint with category parameter
  const response = await fetch(`/api/events?category=${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events from backend');
  }
  return await response.json();
}

// Keep the original function for backward compatibility
export async function fetchEducationEventsFromEventbrite() {
  return fetchEventsByCategory('education');
}

/**
 * Fetches event details by ID from the backend API.
 * @param id - The event ID
 * @returns {Promise<Object>} Event details object
 */
export async function fetchEventDetailsById(id: string) {
  const response = await fetch(`/api/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event details from backend');
  }
  return await response.json();
}
