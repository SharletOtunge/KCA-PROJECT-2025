/*
  # Sample Data for Restaurant Management System

  1. Sample Data
    - Restaurant information
    - Tables and seating arrangements
    - Menu categories and items
    - Sample customers
    - Reservations
    - Orders and order items
    - Inventory categories and items
    - Suppliers
    - Employees and shifts
    - Sample bills

  2. Purpose
    - Provide realistic test data
    - Demonstrate system functionality
    - Enable immediate testing of features
*/

-- Insert sample restaurant
INSERT INTO restaurants (id, name, address, phone, email, settings) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'RestaurantPro Demo', '123 Main Street, City, State 12345', '(555) 123-4567', 'info@restaurantpro.com', '{"tax_rate": 0.09, "service_charge": 0.18}');

-- Insert sample tables
INSERT INTO tables (restaurant_id, table_number, capacity, status, location) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Table 1', 2, 'available', 'Main Dining'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 2', 2, 'available', 'Main Dining'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 3', 4, 'available', 'Main Dining'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 4', 4, 'available', 'Main Dining'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 5', 4, 'occupied', 'Main Dining'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 6', 6, 'available', 'Main Dining'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 7', 6, 'available', 'Main Dining'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 8', 8, 'reserved', 'Private Dining'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 9', 4, 'available', 'Patio'),
('550e8400-e29b-41d4-a716-446655440000', 'Table 10', 4, 'available', 'Patio');

-- Insert menu categories
INSERT INTO menu_categories (restaurant_id, name, description, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Appetizers', 'Start your meal with our delicious appetizers', 1),
('550e8400-e29b-41d4-a716-446655440000', 'Salads', 'Fresh and healthy salad options', 2),
('550e8400-e29b-41d4-a716-446655440000', 'Main Courses', 'Our signature main dishes', 3),
('550e8400-e29b-41d4-a716-446655440000', 'Seafood', 'Fresh seafood selections', 4),
('550e8400-e29b-41d4-a716-446655440000', 'Desserts', 'Sweet endings to your meal', 5),
('550e8400-e29b-41d4-a716-446655440000', 'Beverages', 'Drinks and refreshments', 6);

-- Insert menu items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, cost, preparation_time) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Appetizers' LIMIT 1), 'Caesar Salad', 'Crisp romaine lettuce with parmesan cheese and croutons', 12.99, 4.50, 10),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Appetizers' LIMIT 1), 'Bruschetta', 'Toasted bread with fresh tomatoes and basil', 9.99, 3.20, 8),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Appetizers' LIMIT 1), 'Calamari Rings', 'Crispy fried squid rings with marinara sauce', 14.99, 5.80, 12),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Main Courses' LIMIT 1), 'Grilled Salmon', 'Atlantic salmon with lemon herb butter', 24.99, 12.00, 18),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Main Courses' LIMIT 1), 'Ribeye Steak', 'Premium 12oz ribeye steak grilled to perfection', 32.99, 18.50, 25),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Main Courses' LIMIT 1), 'Chicken Parmesan', 'Breaded chicken breast with marinara and mozzarella', 19.99, 8.75, 20),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Main Courses' LIMIT 1), 'Pasta Carbonara', 'Creamy pasta with pancetta and parmesan', 16.99, 6.25, 15),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Beverages' LIMIT 1), 'House Wine', 'Red or white wine selection', 8.99, 3.50, 2),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Beverages' LIMIT 1), 'Craft Beer', 'Local brewery selection', 5.99, 2.25, 2),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM menu_categories WHERE name = 'Beverages' LIMIT 1), 'Soft Drinks', 'Coca-Cola, Pepsi, Sprite, etc.', 3.99, 0.75, 1);

-- Insert sample customers
INSERT INTO customers (restaurant_id, name, email, phone, total_visits, total_spent) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Johnson Family', 'johnson@email.com', '(555) 123-4567', 5, 287.50),
('550e8400-e29b-41d4-a716-446655440000', 'Williams Couple', 'williams@email.com', '(555) 987-6543', 3, 156.75),
('550e8400-e29b-41d4-a716-446655440000', 'Brown Group', 'brown@email.com', '(555) 456-7890', 2, 198.25),
('550e8400-e29b-41d4-a716-446655440000', 'Davis Family', 'davis@email.com', '(555) 321-0987', 4, 245.80);

-- Insert sample reservations
INSERT INTO reservations (restaurant_id, customer_id, table_id, customer_name, customer_phone, customer_email, party_size, reservation_date, reservation_time, status, special_requests) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM customers WHERE name = 'Johnson Family' LIMIT 1), (SELECT id FROM tables WHERE table_number = 'Table 8' LIMIT 1), 'Johnson Family', '(555) 123-4567', 'johnson@email.com', 4, CURRENT_DATE, '18:00', 'confirmed', 'Birthday celebration'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM customers WHERE name = 'Williams Couple' LIMIT 1), (SELECT id FROM tables WHERE table_number = 'Table 2' LIMIT 1), 'Williams Couple', '(555) 987-6543', 'williams@email.com', 2, CURRENT_DATE, '18:30', 'confirmed', 'Anniversary dinner'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM customers WHERE name = 'Brown Group' LIMIT 1), (SELECT id FROM tables WHERE table_number = 'Table 6' LIMIT 1), 'Brown Group', '(555) 456-7890', 'brown@email.com', 6, CURRENT_DATE, '19:00', 'pending', 'Business dinner'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM customers WHERE name = 'Davis Family' LIMIT 1), (SELECT id FROM tables WHERE table_number = 'Table 7' LIMIT 1), 'Davis Family', '(555) 321-0987', 'davis@email.com', 3, CURRENT_DATE, '19:30', 'confirmed', '');

-- Insert inventory categories
INSERT INTO inventory_categories (restaurant_id, name, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Meat', 'Fresh and frozen meat products'),
('550e8400-e29b-41d4-a716-446655440000', 'Seafood', 'Fresh fish and seafood'),
('550e8400-e29b-41d4-a716-446655440000', 'Vegetables', 'Fresh produce and vegetables'),
('550e8400-e29b-41d4-a716-446655440000', 'Dairy', 'Milk, cheese, and dairy products'),
('550e8400-e29b-41d4-a716-446655440000', 'Pantry', 'Dry goods and pantry items'),
('550e8400-e29b-41d4-a716-446655440000', 'Beverages', 'Drinks and beverage supplies');

-- Insert suppliers
INSERT INTO suppliers (restaurant_id, name, contact_person, email, phone, address) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Premium Meat Co.', 'John Smith', 'john@premiummeat.com', '(555) 111-2222', '456 Meat Street, City, State'),
('550e8400-e29b-41d4-a716-446655440000', 'Ocean Fresh Seafood', 'Mary Johnson', 'mary@oceanfresh.com', '(555) 333-4444', '789 Harbor Ave, City, State'),
('550e8400-e29b-41d4-a716-446655440000', 'Green Valley Farm', 'Bob Wilson', 'bob@greenvalley.com', '(555) 555-6666', '321 Farm Road, City, State'),
('550e8400-e29b-41d4-a716-446655440000', 'Artisan Dairy', 'Lisa Brown', 'lisa@artisandairy.com', '(555) 777-8888', '654 Dairy Lane, City, State');

-- Insert inventory items
INSERT INTO inventory_items (restaurant_id, category_id, name, unit, current_stock, minimum_stock, unit_cost, supplier_id, last_restocked_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM inventory_categories WHERE name = 'Meat' LIMIT 1), 'Ribeye Steak', 'pieces', 25, 15, 12.99, (SELECT id FROM suppliers WHERE name = 'Premium Meat Co.' LIMIT 1), now() - interval '5 days'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM inventory_categories WHERE name = 'Seafood' LIMIT 1), 'Fresh Salmon', 'lbs', 8, 12, 15.99, (SELECT id FROM suppliers WHERE name = 'Ocean Fresh Seafood' LIMIT 1), now() - interval '3 days'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM inventory_categories WHERE name = 'Vegetables' LIMIT 1), 'Romaine Lettuce', 'heads', 45, 20, 2.49, (SELECT id FROM suppliers WHERE name = 'Green Valley Farm' LIMIT 1), now() - interval '1 day'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM inventory_categories WHERE name = 'Dairy' LIMIT 1), 'Parmesan Cheese', 'wheels', 3, 8, 25.99, (SELECT id FROM suppliers WHERE name = 'Artisan Dairy' LIMIT 1), now() - interval '7 days'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM inventory_categories WHERE name = 'Pantry' LIMIT 1), 'Olive Oil', 'bottles', 12, 6, 8.99, (SELECT id FROM suppliers WHERE name = 'Green Valley Farm' LIMIT 1), now() - interval '4 days'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM inventory_categories WHERE name = 'Vegetables' LIMIT 1), 'Tomatoes', 'lbs', 18, 25, 3.99, (SELECT id FROM suppliers WHERE name = 'Green Valley Farm' LIMIT 1), now() - interval '2 days');

-- Insert employees
INSERT INTO employees (restaurant_id, name, email, phone, position, department, hourly_rate, hire_date, status) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Sarah Johnson', 'sarah.johnson@restaurant.com', '(555) 123-4567', 'Head Chef', 'Kitchen', 25.00, '2023-01-15', 'active'),
('550e8400-e29b-41d4-a716-446655440000', 'Mike Rodriguez', 'mike.rodriguez@restaurant.com', '(555) 987-6543', 'Server', 'Front of House', 15.00, '2023-03-20', 'active'),
('550e8400-e29b-41d4-a716-446655440000', 'Lisa Chen', 'lisa.chen@restaurant.com', '(555) 456-7890', 'Sous Chef', 'Kitchen', 20.00, '2023-02-10', 'active'),
('550e8400-e29b-41d4-a716-446655440000', 'David Thompson', 'david.thompson@restaurant.com', '(555) 321-0987', 'Bartender', 'Bar', 18.00, '2023-04-05', 'active'),
('550e8400-e29b-41d4-a716-446655440000', 'Emma Wilson', 'emma.wilson@restaurant.com', '(555) 654-3210', 'Host', 'Front of House', 14.00, '2023-05-12', 'active');

-- Insert sample shifts for today
INSERT INTO shifts (restaurant_id, employee_id, shift_date, start_time, end_time, hourly_rate, total_hours, total_pay) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'Sarah Johnson' LIMIT 1), CURRENT_DATE, '10:00', '18:00', 25.00, 8.0, 200.00),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'Mike Rodriguez' LIMIT 1), CURRENT_DATE, '17:00', '23:00', 15.00, 6.0, 90.00),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'Lisa Chen' LIMIT 1), CURRENT_DATE, '14:00', '22:00', 20.00, 8.0, 160.00),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'David Thompson' LIMIT 1), CURRENT_DATE, '18:00', '00:00', 18.00, 6.0, 108.00),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'Emma Wilson' LIMIT 1), CURRENT_DATE, '16:00', '22:00', 14.00, 6.0, 84.00);

-- Insert sample orders
INSERT INTO orders (restaurant_id, table_id, order_number, order_type, status, subtotal, tax_amount, total_amount, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM tables WHERE table_number = 'Table 5' LIMIT 1), 'ORD-001', 'dine_in', 'preparing', 55.96, 5.04, 60.00, now() - interval '10 minutes'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM tables WHERE table_number = 'Table 3' LIMIT 1), 'ORD-002', 'dine_in', 'ready', 30.96, 2.79, 33.75, now() - interval '5 minutes'),
('550e8400-e29b-41d4-a716-446655440000', NULL, 'ORD-003', 'takeout', 'delivered', 37.97, 3.42, 41.39, now() - interval '25 minutes');

-- Insert order items for the orders
INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, total_price) VALUES
-- Order 1 items
((SELECT id FROM orders WHERE order_number = 'ORD-001' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'Caesar Salad' LIMIT 1), 1, 12.99, 12.99),
((SELECT id FROM orders WHERE order_number = 'ORD-001' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'Grilled Salmon' LIMIT 1), 1, 24.99, 24.99),
((SELECT id FROM orders WHERE order_number = 'ORD-001' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'House Wine' LIMIT 1), 2, 8.99, 17.98),
-- Order 2 items
((SELECT id FROM orders WHERE order_number = 'ORD-002' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'Chicken Parmesan' LIMIT 1), 1, 19.99, 19.99),
((SELECT id FROM orders WHERE order_number = 'ORD-002' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'Soft Drinks' LIMIT 1), 2, 3.99, 7.98),
((SELECT id FROM orders WHERE order_number = 'ORD-002' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'Bruschetta' LIMIT 1), 1, 9.99, 9.99),
-- Order 3 items
((SELECT id FROM orders WHERE order_number = 'ORD-003' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'Pasta Carbonara' LIMIT 1), 1, 16.99, 16.99),
((SELECT id FROM orders WHERE order_number = 'ORD-003' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'Caesar Salad' LIMIT 1), 1, 12.99, 12.99),
((SELECT id FROM orders WHERE order_number = 'ORD-003' LIMIT 1), (SELECT id FROM menu_items WHERE name = 'Craft Beer' LIMIT 1), 1, 5.99, 5.99);

-- Insert sample bills
INSERT INTO bills (restaurant_id, order_id, customer_id, bill_number, subtotal, tax_amount, total_amount, payment_method, status, paid_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM orders WHERE order_number = 'ORD-003' LIMIT 1), NULL, 'INV-001', 37.97, 3.42, 41.39, 'credit_card', 'paid', now() - interval '20 minutes'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM orders WHERE order_number = 'ORD-001' LIMIT 1), (SELECT id FROM customers WHERE name = 'Johnson Family' LIMIT 1), 'INV-002', 55.96, 5.04, 60.00, 'credit_card', 'pending', NULL);

-- Insert bill items
INSERT INTO bill_items (bill_id, menu_item_name, quantity, unit_price, total_price) VALUES
-- Bill 1 items
((SELECT id FROM bills WHERE bill_number = 'INV-001' LIMIT 1), 'Pasta Carbonara', 1, 16.99, 16.99),
((SELECT id FROM bills WHERE bill_number = 'INV-001' LIMIT 1), 'Caesar Salad', 1, 12.99, 12.99),
((SELECT id FROM bills WHERE bill_number = 'INV-001' LIMIT 1), 'Craft Beer', 1, 5.99, 5.99),
-- Bill 2 items
((SELECT id FROM bills WHERE bill_number = 'INV-002' LIMIT 1), 'Caesar Salad', 1, 12.99, 12.99),
((SELECT id FROM bills WHERE bill_number = 'INV-002' LIMIT 1), 'Grilled Salmon', 1, 24.99, 24.99),
((SELECT id FROM bills WHERE bill_number = 'INV-002' LIMIT 1), 'House Wine', 2, 8.99, 17.98);

-- Insert employee performance records
INSERT INTO employee_performance (restaurant_id, employee_id, rating, comments) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'Sarah Johnson' LIMIT 1), 'excellent', 'Outstanding leadership and culinary skills'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'Mike Rodriguez' LIMIT 1), 'good', 'Great customer service, punctual and reliable'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'Lisa Chen' LIMIT 1), 'excellent', 'Excellent technical skills and team collaboration'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'David Thompson' LIMIT 1), 'good', 'Good bartending skills, friendly with customers'),
('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM employees WHERE name = 'Emma Wilson' LIMIT 1), 'average', 'Improving steadily, needs more confidence');