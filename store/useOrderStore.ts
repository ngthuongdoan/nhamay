import create from 'zustand';
import { supabase } from '../lib/supabaseClient';

/**
 * Order type reflects the schema stored in Supabase. When you create your
 * Supabase database table, ensure the column names match these keys. The
 * `date` is stored as an ISO string. `is_debt` indicates whether the order
 * amount is to be collected later.
 */
export interface Order {
  id?: number;
  customer_name: string;
  quantity: number;
  type: string;
  price: number;
  date: string;
  is_debt: boolean;
}

interface OrderState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => Promise<void>;
  fetchOrders: () => Promise<void>;
}

/**
 * Zustand store used to manage in-memory order data and synchronize with Supabase.
 * The store exposes methods to fetch orders and to add new ones. When adding
 * an order, it inserts the record into Supabase and updates local state.
 */
const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: async (order) => {
    // Insert into the `orders` table. Make sure the table exists in Supabase
    // with columns corresponding to the order object.
    try {
      const { error } = await supabase.from('orders').insert([order]);
      if (error) {
        console.error('Insert error:', error.message);
      }
      set((state) => ({ orders: [...state.orders, order] }));
    } catch (err) {
      console.error('Unexpected error inserting order:', err);
    }
  },
  fetchOrders: async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('id', { ascending: false });
      if (error) {
        console.error('Fetch error:', error.message);
        return;
      }
      set({ orders: data || [] });
    } catch (err) {
      console.error('Unexpected error fetching orders:', err);
    }
  },
}));

export default useOrderStore;
