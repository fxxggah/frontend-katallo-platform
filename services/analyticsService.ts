import { api, unwrap } from "./api";

export type AnalyticsEventRequest = {
  sessionId?: string;
  referrer?: string;
  userAgent?: string;
};

export type AnalyticsSummaryResponse = {
  storeViews: number;
  productViews: number;
  whatsappClicks: number;
  mostViewedProductId?: number;
  mostViewedProductName?: string;
  mostViewedProductViews: number;
};

export type TopProductAnalyticsResponse = {
  productId: number;
  productName: string;
  productSlug: string;
  views: number;
};

export type DailyVisitsResponse = {
  date: string;
  visits: number;
};

function getSessionId() {
  if (typeof window === "undefined") return undefined;

  const STORAGE_KEY = "catalog_session_id";
  let sessionId = localStorage.getItem(STORAGE_KEY);

  if (!sessionId) {
    sessionId =
      crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem(STORAGE_KEY, sessionId);
  }

  return sessionId;
}

function buildPayload(): AnalyticsEventRequest {
  if (typeof window === "undefined") return {};

  return {
    sessionId: getSessionId(),
    referrer: document.referrer || undefined,
    userAgent: navigator.userAgent,
  };
}

function shouldRegisterOnce(key: string, ttlMs = 30_000) {
  if (typeof window === "undefined") return false;

  const now = Date.now();
  const last = Number(sessionStorage.getItem(key) ?? 0);

  if (last && now - last < ttlMs) {
    return false;
  }

  sessionStorage.setItem(key, String(now));
  return true;
}

function postWithBeacon(path: string) {
  if (typeof window === "undefined") return false;

  const baseURL = api.defaults.baseURL;
  if (!baseURL) return false;

  const payload = buildPayload();
  const blob = new Blob([JSON.stringify(payload)], {
    type: "application/json",
  });

  return navigator.sendBeacon(`${baseURL}${path}`, blob);
}

export const analyticsService = {
  async registerStoreView(storeSlug: string): Promise<void> {
    const key = `analytics_store_view_${storeSlug}`;

    if (!shouldRegisterOnce(key)) return;

    await api.post(`/stores/${storeSlug}/analytics/store-view`, buildPayload());
  },

  async registerProductView(
    storeSlug: string,
    productSlug: string
  ): Promise<void> {
    const key = `analytics_product_view_${storeSlug}_${productSlug}`;

    if (!shouldRegisterOnce(key)) return;

    await api.post(
      `/stores/${storeSlug}/analytics/products/${productSlug}/view`,
      buildPayload()
    );
  },

  async registerWhatsappClick(storeSlug: string): Promise<void> {
    const path = `/stores/${storeSlug}/analytics/whatsapp-click`;

    const sentByBeacon = postWithBeacon(path);

    if (sentByBeacon) return;

    await api.post(path, buildPayload());
  },

  async getSummary(storeSlug: string): Promise<AnalyticsSummaryResponse> {
    return unwrap(
      await api.get<AnalyticsSummaryResponse>(
        `/admin/stores/${storeSlug}/analytics/summary`
      )
    );
  },

  async getTopProducts(
    storeSlug: string,
    limit = 5
  ): Promise<TopProductAnalyticsResponse[]> {
    return unwrap(
      await api.get<TopProductAnalyticsResponse[]>(
        `/admin/stores/${storeSlug}/analytics/top-products`,
        {
          params: { limit },
        }
      )
    );
  },

  async getDailyVisits(
    storeSlug: string,
    days = 7
  ): Promise<DailyVisitsResponse[]> {
    return unwrap(
      await api.get<DailyVisitsResponse[]>(
        `/admin/stores/${storeSlug}/analytics/daily-visits`,
        {
          params: { days },
        }
      )
    );
  },
};