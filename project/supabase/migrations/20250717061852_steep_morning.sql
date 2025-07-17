/*
  # Add Kenyan Menu Items and Categories

  1. New Tables
    - Updates menu_categories with Kenyan food categories
    - Updates menu_items with authentic Kenyan dishes and KES pricing
  2. Security
    - Maintains existing RLS policies
  3. Changes
    - Adds Kenyan food categories
    - Populates menu with 50 authentic Kenyan dishes
    - All prices in Kenyan Shillings (KES)
*/

-- Insert Kenyan menu categories
INSERT INTO menu_categories (restaurant_id, name, description, sort_order, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Traditional Kenyan Dishes', 'Authentic local favorites', 1, true),
('550e8400-e29b-41d4-a716-446655440000', 'Swahili & Coastal Cuisine', 'Coastal and Swahili specialties', 2, true),
('550e8400-e29b-41d4-a716-446655440000', 'Fast Food & Street Eats', 'Quick bites and street food', 3, true),
('550e8400-e29b-41d4-a716-446655440000', 'International & Fusion', 'Global cuisine with local twist', 4, true),
('550e8400-e29b-41d4-a716-446655440000', 'Drinks & Sides', 'Beverages and accompaniments', 5, true)
ON CONFLICT (restaurant_id, name) DO NOTHING;

-- Get category IDs for menu items
DO $$
DECLARE
    traditional_id uuid;
    swahili_id uuid;
    fastfood_id uuid;
    international_id uuid;
    drinks_id uuid;
BEGIN
    SELECT id INTO traditional_id FROM menu_categories WHERE name = 'Traditional Kenyan Dishes' AND restaurant_id = '550e8400-e29b-41d4-a716-446655440000';
    SELECT id INTO swahili_id FROM menu_categories WHERE name = 'Swahili & Coastal Cuisine' AND restaurant_id = '550e8400-e29b-41d4-a716-446655440000';
    SELECT id INTO fastfood_id FROM menu_categories WHERE name = 'Fast Food & Street Eats' AND restaurant_id = '550e8400-e29b-41d4-a716-446655440000';
    SELECT id INTO international_id FROM menu_categories WHERE name = 'International & Fusion' AND restaurant_id = '550e8400-e29b-41d4-a716-446655440000';
    SELECT id INTO drinks_id FROM menu_categories WHERE name = 'Drinks & Sides' AND restaurant_id = '550e8400-e29b-41d4-a716-446655440000';

    -- Traditional Kenyan Dishes
    INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_available, preparation_time) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Ugali with Sukuma Wiki', 'Traditional maize meal with collard greens', 300, true, 20),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Nyama Choma (Goat/Beef)', 'Grilled meat Kenyan style', 800, true, 45),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Chapati with Beef Stew', 'Soft flatbread with tender beef stew', 450, true, 30),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Githeri (Maize & Beans)', 'Mixed maize and beans', 300, true, 25),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Mukimo with Chicken', 'Mashed green peas, potatoes and maize with chicken', 600, true, 35),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Matoke with Minced Meat', 'Green bananas with minced meat', 500, true, 30),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Pilau (Beef/Chicken)', 'Spiced rice with meat', 600, true, 40),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Fish Fillet with Ugali', 'Fresh fish with traditional ugali', 800, true, 25),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Chips Mayai', 'French fries with scrambled eggs', 400, true, 15),
    ('550e8400-e29b-41d4-a716-446655440000', traditional_id, 'Kienyeji Chicken & Ugali', 'Free-range chicken with ugali', 900, true, 50);

    -- Swahili & Coastal Cuisine
    INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_available, preparation_time) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Chicken Biryani', 'Aromatic spiced rice with chicken', 800, true, 45),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Beef Biryani', 'Aromatic spiced rice with beef', 750, true, 45),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Coconut Fish Curry', 'Fish cooked in rich coconut curry', 900, true, 35),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Wali wa Nazi (Coconut Rice)', 'Rice cooked in coconut milk', 400, true, 25),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Samaki wa Kupaka', 'Fish in coconut curry sauce', 1000, true, 40),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Viazi Karai', 'Spiced potato curry', 300, true, 20),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Bhajia', 'Spiced potato fritters', 300, true, 15),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Mandazi', 'Sweet fried dough', 50, true, 10),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Samosa (Beef/Vegetable)', 'Crispy triangular pastries', 80, true, 15),
    ('550e8400-e29b-41d4-a716-446655440000', swahili_id, 'Mbaazi wa Nazi', 'Pigeon peas in coconut milk', 400, true, 30);

    -- Fast Food & Street Eats
    INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_available, preparation_time) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Cheeseburger', 'Beef patty with cheese and vegetables', 300, true, 15),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'McMeal Combo', 'Burger, fries and drink combo', 900, true, 20),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Pizza (Medium)', 'Medium pizza with toppings', 1200, true, 25),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Hot Dog', 'Grilled sausage in bun', 300, true, 10),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Chips Masala', 'Spiced french fries', 400, true, 15),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Fried Chicken (2 pcs)', 'Crispy fried chicken pieces', 600, true, 20),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Shawarma', 'Wrapped meat with vegetables', 500, true, 15),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Smokie Pasua', 'Grilled sausage with kachumbari', 200, true, 10),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Grilled Corn', 'Roasted maize with spices', 100, true, 10),
    ('550e8400-e29b-41d4-a716-446655440000', fastfood_id, 'Mutura (Kenyan Sausage)', 'Traditional blood sausage', 250, true, 15);

    -- International & Fusion
    INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_available, preparation_time) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Butter Chicken & Naan', 'Creamy chicken curry with bread', 1000, true, 30),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Spaghetti Bolognese', 'Pasta with meat sauce', 800, true, 25),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Chicken Alfredo Pasta', 'Creamy pasta with chicken', 900, true, 25),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Beef Stir Fry with Rice', 'Asian-style beef with vegetables', 800, true, 20),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Vegetable Curry & Rice', 'Mixed vegetable curry', 700, true, 25),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Lamb Gyro Plate', 'Mediterranean lamb with sides', 1200, true, 30),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Sushi Platter (Small)', 'Assorted sushi rolls', 1500, true, 35),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Chicken Caesar Salad', 'Fresh salad with grilled chicken', 700, true, 15),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Grilled Pork Ribs', 'BBQ pork ribs with sauce', 1200, true, 45),
    ('550e8400-e29b-41d4-a716-446655440000', international_id, 'Tandoori Chicken', 'Indian spiced grilled chicken', 1000, true, 40);

    -- Drinks & Sides
    INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_available, preparation_time) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Cappuccino', 'Italian coffee with steamed milk', 350, true, 5),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Fresh Juice (Passion/Mango)', 'Freshly squeezed tropical juice', 300, true, 5),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Soda (Coke/Fanta/Sprite)', 'Carbonated soft drinks', 100, true, 2),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Bottled Water', 'Pure drinking water', 80, true, 1),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Tea (Chai)', 'Kenyan spiced tea', 100, true, 5),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Fruit Salad', 'Mixed seasonal fruits', 400, true, 10),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Yogurt Parfait', 'Layered yogurt with fruits', 500, true, 5),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Toast & Eggs', 'Buttered toast with eggs', 350, true, 10),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Pancakes', 'Fluffy pancakes with syrup', 400, true, 15),
    ('550e8400-e29b-41d4-a716-446655440000', drinks_id, 'Sausages', 'Grilled breakfast sausages', 250, true, 10);

END $$;