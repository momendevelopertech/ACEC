const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") || "";

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  if (!API_BASE) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE environment variable");
  }

  const { body, headers, ...restOptions } = options;

  const response = await fetch(`${API_BASE}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let payload: unknown;
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    payload = await response.json();
  } else {
    payload = await response.text();
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof (payload as { error?: unknown }).error === "string"
        ? (payload as { error: string }).error
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return payload as T;
}
