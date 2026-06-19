import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string) => {
  const normalizedTech = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTech]
    ? `${techMap[normalizedTech]} colored`
    : "devicon-devicon-plain";
};

/**
 * Convert a date (or ISO date string) into a human‑readable relative timestamp.
 * Supports seconds, minutes, hours, days, months and years.
 * Accepts both `Date` objects and ISO date strings to be defensive against
 * mismatched types coming from the API.
 */
export const getTimeStamp = (date: Date | string): string => {
  // Ensure we are working with a Date instance
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - targetDate.getTime();

  // Guard against future dates or invalid dates
  if (isNaN(diff) || diff < 0) {
    return "just now";
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};
