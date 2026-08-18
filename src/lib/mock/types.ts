export interface Opportunity {
  id: string;
  title: string;
  titleAr: string;
  buyer: string;
  sector: string;
  sectorAr: string;
  value: number;
  deadlineDays: number;
  location: string;
  locationAr: string;
  postedMinutesAgo: number;
}

export type RfqStatus = "draft" | "sent" | "quoted" | "closed";

export interface Rfq {
  id: string;
  title: string;
  titleAr: string;
  supplierCount: number;
  deadlineDays: number;
  value: number;
  status: RfqStatus;
}

export type OrderStage = "confirmed" | "production" | "shipped" | "delivered";

export interface Order {
  id: string;
  title: string;
  titleAr: string;
  supplier: string;
  stage: OrderStage;
  eta: string;
}

export interface Quote {
  id: string;
  supplier: string;
  rating: number;
  price: number;
  leadTimeDays: number;
  isBestPrice?: boolean;
  isFastest?: boolean;
}

export interface NeedsActionItem {
  id: string;
  title: string;
  titleAr: string;
  detail: string;
  detailAr: string;
  urgency: "high" | "medium" | "low";
}

export interface SupplierRfqInboxItem {
  id: string;
  title: string;
  titleAr: string;
  buyer: string;
  quantity: string;
  deadlineDays: number;
  value: number;
}

export interface CatalogueItem {
  id: string;
  product: string;
  productAr: string;
  sku: string;
  price: number;
  moq: number;
  leadTimeDays: number;
}
