import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Restaurant {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  settings?: any;
  created_at: string;
  updated_at: string;
}

export interface Table {
  id: string;
  restaurant_id: string;
  table_number: string;
  capacity: number;
  status: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface MenuCategory {
  id: string;
  restaurant_id: string;
  name: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_id?: string;
  name: string;
  description?: string;
  price: number;
  cost?: number;
  is_available: boolean;
  preparation_time: number;
  allergens?: string[];
  nutritional_info?: any;
  image_url?: string;
  created_at: string;
  updated_at: string;
  category?: MenuCategory;
}

export interface Customer {
  id: string;
  restaurant_id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  preferences?: any;
  total_visits: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  restaurant_id: string;
  customer_id?: string;
  table_id?: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  special_requests?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  table?: Table;
}

export interface Order {
  id: string;
  restaurant_id: string;
  table_id?: string;
  customer_id?: string;
  order_number: string;
  order_type: 'dine_in' | 'takeout' | 'delivery';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  special_instructions?: string;
  estimated_completion_time?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  table?: Table;
  customer?: Customer;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  special_instructions?: string;
  created_at: string;
  menu_item?: MenuItem;
}

export interface Bill {
  id: string;
  restaurant_id: string;
  order_id?: string;
  customer_id?: string;
  bill_number: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  tip_amount: number;
  total_amount: number;
  payment_method?: 'cash' | 'credit_card' | 'debit_card' | 'digital_wallet';
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paid_at?: string;
  created_at: string;
  updated_at: string;
  order?: Order;
  customer?: Customer;
  bill_items?: BillItem[];
}

export interface BillItem {
  id: string;
  bill_id: string;
  menu_item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface InventoryCategory {
  id: string;
  restaurant_id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  restaurant_id: string;
  category_id?: string;
  name: string;
  description?: string;
  unit: string;
  current_stock: number;
  minimum_stock: number;
  maximum_stock?: number;
  unit_cost?: number;
  supplier_id?: string;
  last_restocked_at?: string;
  created_at: string;
  updated_at: string;
  category?: InventoryCategory;
  supplier?: Supplier;
}

export interface Supplier {
  id: string;
  restaurant_id: string;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  payment_terms?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  restaurant_id: string;
  employee_number?: string;
  name: string;
  email?: string;
  phone?: string;
  position: string;
  department: string;
  hourly_rate?: number;
  hire_date: string;
  status: 'active' | 'inactive' | 'on_leave';
  emergency_contact?: any;
  created_at: string;
  updated_at: string;
  shifts?: Shift[];
  performance?: EmployeePerformance[];
}

export interface Shift {
  id: string;
  restaurant_id: string;
  employee_id: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  break_duration: number;
  hourly_rate?: number;
  total_hours?: number;
  total_pay?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  employee?: Employee;
}

export interface EmployeePerformance {
  id: string;
  restaurant_id: string;
  employee_id: string;
  review_date: string;
  rating: 'excellent' | 'good' | 'average' | 'poor';
  comments?: string;
  goals?: string;
  reviewer_id?: string;
  created_at: string;
  employee?: Employee;
  reviewer?: Employee;
}