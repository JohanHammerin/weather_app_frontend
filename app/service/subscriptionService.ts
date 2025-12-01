const SUBSCRIPTION_BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_URL!;

export type UpdateSubscriptionPayload = {
  city: string;
  time: string;
};

export async function updateSubscription(payload: UpdateSubscriptionPayload) {
  const res = await fetch(`${SUBSCRIPTION_BASE_URL}/api/subscriptions/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorMessage = "Unexpected error";

    try {
      const data = await res.json();
      errorMessage = data.error || data.message || errorMessage;
    } catch (e) {
        console.log(e)
    }

    throw new Error(errorMessage);
  }

  return res.json().catch(() => null);
}
