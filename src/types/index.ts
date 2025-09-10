export type Money = {
  amount: number;
  currency: "USD" | "EUR";
};

export type Variant = {
  id: string;
  title: string;
  options: Record<string, string>;
  price: Money;
  stock: number;
  image?: string;
  sku?: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: Money;
  images: string[];
  tags: string[];
  category: "cabinet" | "pcb" | "controller" | "artwork";
  variants?: Variant[];
  specs?: Record<string, string>;
  createdAt: string;
  featured?: boolean;
};

export type CartItem = {
  productId: string;
  variantId?: string;
  qty: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: Money;
  email: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
};

export type Collection = {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  productIds: string[];
};