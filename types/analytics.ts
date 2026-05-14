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