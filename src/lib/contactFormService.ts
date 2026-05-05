import { apiRequest } from "./api";

export interface InsertContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function sendContactForm(
  payload: InsertContactPayload
): Promise<ContactResponse> {
  try {
    if (!payload.name || !payload.name.trim()) {
      return { success: false, error: "Name is required" };
    }

    if (!payload.email || !payload.email.trim()) {
      return { success: false, error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    if (!payload.message || !payload.message.trim()) {
      return { success: false, error: "Message is required" };
    }

    if (payload.message.length < 10) {
      return {
        success: false,
        error: "Message must be at least 10 characters long",
      };
    }

    const data = await apiRequest<unknown>("/api/v1/contact", {
      method: "POST",
      body: {
        name: payload.name.trim(),
        email: payload.email.trim(),
        message: payload.message.trim(),
      },
    });

    return { success: true, data };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  }
}
