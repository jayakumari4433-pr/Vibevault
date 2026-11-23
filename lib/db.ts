import "server-only";
import { supabaseAdmin } from "./supabase/admin";
import type { CartItem, OrderStatus, PaymentMode } from "./types";

// ---------- Shapes returned to the UI ----------

export interface DbOrderItem {
  id: string;
  product_id: string | null;
  type: string | null;
  name: string | null;
  price: number;
  qty: number;
  vibe: string | null;
  colour: string | null;
  note: string | null;
  category: string | null;
}

export interface DbOrder {
  id: string;
  customer_name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
  amount: number;
  shipping: number;
  status: OrderStatus;
  payment: PaymentMode;
  vibe: string | null;
  colour: string | null;
  note: string | null;
  placed_at: string;
  order_items: DbOrderItem[];
}

export interface DbReview {
  id: string;
  name: string;
  city: string | null;
  vibe: string | null;
  rating: number;
  text: string;
  verified: boolean;
  status: "pending" | "approved" | "hidden";
  created_at: string;
}

export interface DbInventory {
  id: string;
  name: string;
  vibe: string | null;
  stock: number;
  threshold: number;
  used: number;
}

export interface DbCoupon {
  code: string;
  description: string | null;
  type: string | null;
  uses: number;
  active: boolean;
}

export interface CustomerRow {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  created_at: string;
  orders: number;
  spent: number;
  repeat: boolean;
  vibe: string | null;
}

// ---------- Orders ----------

export async function getOrders(): Promise<DbOrder[]> {
  const { data, error } = await supabaseAdmin()
    .from("orders")
    .select("*, order_items(*)")
    .order("placed_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbOrder[];
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const { error } = await supabaseAdmin()
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export interface CreateOrderInput {
  items: CartItem[];
  payment: PaymentMode;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  amount: number;
  shipping: number;
}

export async function createOrder(input: CreateOrderInput): Promise<string> {
  const sb = supabaseAdmin();
  const orderId = `VV-${Math.floor(10000 + Math.random() * 89999)}`;
  const { customer, items } = input;

  // Upsert the customer by email so we can reach them later.
  let customerId: string | null = null;
  if (customer.email) {
    const { data: cust } = await sb
      .from("customers")
      .upsert(
        {
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          city: customer.city,
        },
        { onConflict: "email" },
      )
      .select("id")
      .single();
    customerId = cust?.id ?? null;
  }

  const first = items[0];
  const { error: orderErr } = await sb.from("orders").insert({
    id: orderId,
    customer_id: customerId,
    customer_name: customer.name,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    city: customer.city,
    pincode: customer.pincode,
    amount: input.amount,
    shipping: input.shipping,
    status: "new",
    payment: input.payment,
    vibe: first?.vibe ?? null,
    colour: first?.colour ?? null,
    note: first?.note ?? null,
  });
  if (orderErr) throw orderErr;

  const rows = items.map((i) => ({
    order_id: orderId,
    product_id: i.productId,
    type: i.type,
    name: i.name,
    price: i.price,
    qty: i.qty,
    vibe: i.vibe ?? null,
    colour: i.colour ?? null,
    note: i.note ?? null,
    category: i.category ?? null,
  }));
  const { error: itemsErr } = await sb.from("order_items").insert(rows);
  if (itemsErr) throw itemsErr;

  return orderId;
}

// ---------- Customers ----------

export async function getCustomers(): Promise<CustomerRow[]> {
  const sb = supabaseAdmin();
  const [{ data: customers }, { data: orders }] = await Promise.all([
    sb.from("customers").select("*").order("created_at", { ascending: false }),
    sb.from("orders").select("email, amount, vibe"),
  ]);

  const byEmail = new Map<string, { orders: number; spent: number; vibe: string | null }>();
  for (const o of orders ?? []) {
    const key = o.email ?? "";
    const agg = byEmail.get(key) ?? { orders: 0, spent: 0, vibe: null };
    agg.orders += 1;
    agg.spent += o.amount ?? 0;
    if (!agg.vibe && o.vibe) agg.vibe = o.vibe;
    byEmail.set(key, agg);
  }

  return (customers ?? []).map((c): CustomerRow => {
    const agg = byEmail.get(c.email ?? "") ?? { orders: 0, spent: 0, vibe: null };
    return {
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      city: c.city,
      created_at: c.created_at,
      orders: agg.orders,
      spent: agg.spent,
      repeat: agg.orders > 1,
      vibe: agg.vibe,
    };
  });
}

// ---------- Reviews ----------

export async function getReviews(): Promise<DbReview[]> {
  const { data, error } = await supabaseAdmin()
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbReview[];
}

export async function getApprovedReviews(): Promise<DbReview[]> {
  const { data, error } = await supabaseAdmin()
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DbReview[];
}

export async function setReviewStatus(
  id: string,
  status: "pending" | "approved" | "hidden",
) {
  const { error } = await supabaseAdmin()
    .from("reviews")
    .update({ status, verified: status === "approved" })
    .eq("id", id);
  if (error) throw error;
}

// ---------- Inventory ----------

export async function getInventory(): Promise<DbInventory[]> {
  const { data, error } = await supabaseAdmin()
    .from("inventory")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as DbInventory[];
}

export async function adjustInventory(id: string, stock: number, used: number) {
  const { error } = await supabaseAdmin()
    .from("inventory")
    .update({ stock, used })
    .eq("id", id);
  if (error) throw error;
}

// ---------- Coupons ----------

export async function getCoupons(): Promise<DbCoupon[]> {
  const { data, error } = await supabaseAdmin()
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as DbCoupon[];
}

export async function toggleCoupon(code: string, active: boolean) {
  const { error } = await supabaseAdmin()
    .from("coupons")
    .update({ active })
    .eq("code", code);
  if (error) throw error;
}

// ---------- Dashboard ----------

export async function getDashboardStats() {
  const orders = await getOrders();
  const inventory = await getInventory();
  const revenue = orders.reduce((s, o) => s + o.amount, 0);
  const pending = orders.filter((o) => o.status === "new" || o.status === "packed").length;
  const codCount = orders.filter((o) => o.payment === "cod").length;
  const lowStock = inventory.filter((i) => i.stock <= i.threshold);
  return {
    ordersCount: orders.length,
    revenue,
    pending,
    codCount,
    prepaidCount: orders.length - codCount,
    lowStock,
    recentOrders: orders.slice(0, 5),
  };
}
