import type { OnePagerResponse } from "../types";

export async function fetchOnePager(symbol: string): Promise<OnePagerResponse> {
  const res = await fetch(`/api/onepager/${encodeURIComponent(symbol)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed with status ${res.status}`);
  }
  return res.json();
}
