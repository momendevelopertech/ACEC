import { supabase, InsertContactPayload, ContactResponse } from "./supabaseClient";

/**
 * Send contact form data to Supabase
 * @param payload - Contact form data (name, email, message)
 * @returns Promise with success/error response
 */
export async function sendContactForm(
  payload: InsertContactPayload
): Promise<ContactResponse> {
  try {
    // Validate inputs
    if (!payload.name || !payload.name.trim()) {
      return {
        success: false,
        error: "Name is required",
      };
    }

    if (!payload.email || !payload.email.trim()) {
      return {
        success: false,
        error: "Email is required",
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    if (!payload.message || !payload.message.trim()) {
      return {
        success: false,
        error: "Message is required",
      };
    }

    if (payload.message.length < 10) {
      return {
        success: false,
        error: "Message must be at least 10 characters long",
      };
    }

    // Prepare data for insertion
    const dataToInsert = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("contacts")
      .insert([dataToInsert])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return {
        success: false,
        error: error.message || "Failed to submit contact form",
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (err) {
    console.error("Contact form error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
