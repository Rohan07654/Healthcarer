import { create } from "zustand";

// Zustand store (JavaScript version)
export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"), // Load user from localStorage

  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
    set({ user: userData });
  },

  logout: () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    set({ user: null });
  },

  setUser: (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
    set({ user: updatedUser });
  },
}));
