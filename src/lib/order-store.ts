export type PendingOrder = {
  slug: string;
  productName: string;
  denomLabel: string;
  price: number;
  userId: string;
  serverId?: string;
  payment: string;
};

const KEY = "pojan-pending-order";

export function savePendingOrder(order: PendingOrder) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(order));
}

export function readPendingOrder(): PendingOrder | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingOrder;
  } catch {
    return null;
  }
}

export function clearPendingOrder() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
