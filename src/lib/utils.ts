import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasDialogue(text: string): boolean {
    // A simple regex to check for lines starting with "Name:"
    const speakerRegex = /^([a-zA-Z0-9_]+):/m;
    return speakerRegex.test(text);
}
