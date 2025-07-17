/*
  # Add Kenyan Menu Items and Categories

  1. New Tables
    - Creates menu categories for Kenyan cuisine
    - Adds 50 authentic Kenyan menu items with proper pricing in KES
    
  2. Categories
    - Traditional Kenyan Dishes
    - Swahili & Coastal Cuisine  
    - Fast Food & Street Eats
    - International & Fusion Dishes
    - Drinks & Sides
    
  3. Menu Items
    - All items priced in Kenyan Shillings (KES)
    - Authentic Kenyan dishes with proper descriptions
    - Preparation times estimated for each dish
*/

-- First, let's add the menu categories
INSERT INTO menu_categories (id, restaurant_id, name, description, sort_order, is_active) VALUES
('cat-traditional', '550e8400-e29b-41d4-a716-446655440000', 'Traditional Kenyan Dishes', 'Authentic Kenyan traditional meals', 1, true),
('cat-swahili', '550e8400-e29b-41d4-a716-446655440000', 'Swahili & Coastal Cuisine', 'Coastal and Swahili-inspired dishes', 2, true),
('cat-fastfood', '550e8400-e29b-41d4-a716-446655440000', 'Fast Food & Street Eats', 'Quick bites and street food favorites', 3, true),
('cat-international', '550e8400-e29b-41d4-a716-446655440000', 'International & Fusion Dishes', 'International cuisine with local touches', 4, true),
('cat-drinks', '550e8400-e29b-41d4-a716-446655440000', 'Drinks & Sides', 'Beverages and side dishes', 5, true);

-- Now add all the menu items
INSERT INTO menu_items (id, restaurant_id, category_id, name, description, price, cost, is_available, preparation_time) VALUES
-- Traditional Kenyan Dishes
('item-001', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Ugali with Sukuma Wiki', 'Traditional maize meal served with collard greens', 300, 120, true, 20),
('item-002', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Nyama Choma (Goat/Beef)', 'Grilled meat - choice of goat or beef', 800, 400, true, 45),
('item-003', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Chapati with Beef Stew', 'Soft flatbread served with tender beef stew', 450, 200, true, 30),
('item-004', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Githeri (Maize & Beans)', 'Traditional mix of maize and beans', 300, 100, true, 25),
('item-005', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Mukimo with Chicken', 'Mashed potatoes, maize and greens with chicken', 600, 250, true, 35),
('item-006', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Matoke with Minced Meat', 'Green bananas cooked with seasoned minced meat', 500, 200, true, 30),
('item-007', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Pilau (Beef/Chicken)', 'Spiced rice with choice of beef or chicken', 600, 250, true, 40),
('item-008', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Fish Fillet with Ugali', 'Fresh fish fillet served with ugali', 800, 350, true, 25),
('item-009', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Chips Mayai', 'French fries mixed with scrambled eggs', 400, 150, true, 15),
('item-010', '550e8400-e29b-41d4-a716-446655440000', 'cat-traditional', 'Kienyeji Chicken & Ugali', 'Free-range chicken served with ugali', 900, 400, true, 50),

-- Swahili & Coastal Cuisine
('item-011', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Chicken Biryani', 'Fragrant spiced rice with tender chicken', 800, 300, true, 45),
('item-012', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Beef Biryani', 'Aromatic spiced rice with beef', 750, 300, true, 45),
('item-013', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Coconut Fish Curry', 'Fish cooked in rich coconut curry sauce', 900, 400, true, 35),
('item-014', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Wali wa Nazi (Coconut Rice)', 'Rice cooked in coconut milk', 400, 150, true, 25),
('item-015', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Samaki wa Kupaka', 'Fish in coconut curry sauce', 1000, 450, true, 40),
('item-016', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Viazi Karai', 'Spiced potato curry', 300, 100, true, 20),
('item-017', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Bhajia', 'Spiced potato fritters', 300, 100, true, 15),
('item-018', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Mandazi', 'Sweet fried dough - Kenyan donut', 50, 20, true, 10),
('item-019', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Samosa (Beef/Vegetable)', 'Crispy pastry with beef or vegetable filling', 80, 30, true, 12),
('item-020', '550e8400-e29b-41d4-a716-446655440000', 'cat-swahili', 'Mbaazi wa Nazi', 'Pigeon peas in coconut sauce', 400, 150, true, 30),

-- Fast Food & Street Eats
('item-021', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Cheeseburger', 'Beef patty with cheese and vegetables', 300, 120, true, 15),
('item-022', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'McMeal Combo', 'Burger, fries and drink combo', 900, 350, true, 20),
('item-023', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Pizza (Medium)', 'Medium-sized pizza with toppings', 1200, 500, true, 25),
('item-024', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Hot Dog', 'Grilled sausage in a bun', 300, 100, true, 10),
('item-025', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Chips Masala', 'French fries with spicy masala seasoning', 400, 150, true, 15),
('item-026', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Fried Chicken (2 pcs)', 'Two pieces of crispy fried chicken', 600, 250, true, 20),
('item-027', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Shawarma', 'Rolled flatbread with meat and vegetables', 500, 200, true, 15),
('item-028', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Smokie Pasua', 'Grilled sausage with kachumbari', 200, 80, true, 10),
('item-029', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Grilled Corn', 'Roasted corn on the cob', 100, 40, true, 8),
('item-030', '550e8400-e29b-41d4-a716-446655440000', 'cat-fastfood', 'Mutura (Kenyan Sausage)', 'Traditional Kenyan blood sausage', 250, 100, true, 12),

-- International & Fusion Dishes
('item-031', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Butter Chicken & Naan', 'Creamy chicken curry with Indian bread', 1000, 400, true, 35),
('item-032', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Spaghetti Bolognese', 'Pasta with meat sauce', 800, 300, true, 25),
('item-033', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Chicken Alfredo Pasta', 'Creamy pasta with grilled chicken', 900, 350, true, 25),
('item-034', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Beef Stir Fry with Rice', 'Stir-fried beef with vegetables and rice', 800, 300, true, 20),
('item-035', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Vegetable Curry & Rice', 'Mixed vegetable curry with rice', 700, 250, true, 25),
('item-036', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Lamb Gyro Plate', 'Greek-style lamb with pita and tzatziki', 1200, 500, true, 30),
('item-037', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Sushi Platter (Small)', 'Assorted sushi rolls', 1500, 600, true, 30),
('item-038', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Chicken Caesar Salad', 'Fresh salad with grilled chicken', 700, 250, true, 15),
('item-039', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Grilled Pork Ribs', 'BBQ pork ribs with sauce', 1200, 500, true, 45),
('item-040', '550e8400-e29b-41d4-a716-446655440000', 'cat-international', 'Tandoori Chicken', 'Indian-spiced grilled chicken', 1000, 400, true, 35),

-- Drinks & Sides
('item-041', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Cappuccino', 'Italian coffee with steamed milk', 350, 100, true, 5),
('item-042', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Fresh Juice (Passion/Mango)', 'Freshly squeezed tropical fruit juice', 300, 100, true, 5),
('item-043', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Soda (Coke/Fanta/Sprite)', 'Carbonated soft drinks', 100, 40, true, 2),
('item-044', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Bottled Water', 'Pure drinking water', 80, 30, true, 1),
('item-045', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Tea (Chai)', 'Kenyan-style spiced tea', 100, 30, true, 5),
('item-046', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Fruit Salad', 'Fresh mixed seasonal fruits', 400, 150, true, 10),
('item-047', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Yogurt Parfait', 'Layered yogurt with fruits and granola', 500, 200, true, 8),
('item-048', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Toast & Eggs', 'Buttered toast with scrambled eggs', 350, 120, true, 10),
('item-049', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Pancakes', 'Fluffy pancakes with syrup', 400, 150, true, 15),
('item-050', '550e8400-e29b-41d4-a716-446655440000', 'cat-drinks', 'Sausages', 'Grilled breakfast sausages', 250, 100, true, 10);