/*
  # Ecommerce Database Schema for Delicious Gelatin Cakes

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique product identifier
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (decimal) - Product price in dollars
      - `image_url` (text) - URL to product image
      - `category` (text) - Product category (e.g., "Classic", "Premium", "Mini")
      - `in_stock` (boolean) - Whether product is available
      - `created_at` (timestamptz) - When product was added
      
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `customer_name` (text) - Customer's full name
      - `customer_email` (text) - Customer's email
      - `customer_phone` (text) - Customer's phone number
      - `pickup_date` (date) - Requested pickup date
      - `pickup_time` (text) - Requested pickup time
      - `total` (decimal) - Order total amount
      - `status` (text) - Order status (pending, confirmed, ready, completed)
      - `payment_intent_id` (text) - Stripe payment intent ID
      - `notes` (text) - Special instructions or notes
      - `created_at` (timestamptz) - When order was placed
      
    - `order_items`
      - `id` (uuid, primary key) - Unique order item identifier
      - `order_id` (uuid, foreign key) - Reference to orders table
      - `product_id` (uuid, foreign key) - Reference to products table
      - `quantity` (integer) - Quantity ordered
      - `price` (decimal) - Price at time of order
      - `created_at` (timestamptz) - When item was added
      
  2. Security
    - Enable RLS on all tables
    - Products: Allow public read access (no auth required for browsing)
    - Orders: Allow public insert (guest checkout)
    - Order_items: Allow public insert (guest checkout)
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10, 2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'Classic',
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  pickup_date date NOT NULL,
  pickup_time text NOT NULL,
  total decimal(10, 2) NOT NULL,
  status text DEFAULT 'pending',
  payment_intent_id text,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 1,
  price decimal(10, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read access)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Orders policies (public insert for guest checkout)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

-- Order items policies (public insert for guest checkout)
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, in_stock) VALUES
  ('Classic Strawberry Gelatina', 'Traditional Mexican gelatin cake with layers of creamy strawberry and vanilla. A crowd favorite!', 35.00, 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg', 'Classic', true),
  ('Tres Leches Gelatina', 'Our signature three-milk gelatin cake with a hint of cinnamon and vanilla', 40.00, 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg', 'Premium', true),
  ('Mango Chamoy Gelatina', 'Sweet mango layers with a tangy chamoy twist. Perfect for parties!', 42.00, 'https://images.pexels.com/photos/1120970/pexels-photo-1120970.jpeg', 'Premium', true),
  ('Rainbow Gelatina', 'Vibrant rainbow layers that will brighten any celebration', 38.00, 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg', 'Classic', true),
  ('Coconut Cream Gelatina', 'Creamy coconut layers with a tropical flavor', 36.00, 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg', 'Classic', true),
  ('Chocolate Abuelita Gelatina', 'Rich Mexican chocolate layers with a hint of cinnamon', 39.00, 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg', 'Premium', true),
  ('Mini Gelatina Cups (12 pack)', 'Assorted flavors in individual serving cups. Perfect for parties!', 25.00, 'https://images.pexels.com/photos/1028706/pexels-photo-1028706.jpeg', 'Mini', true),
  ('Cafe con Leche Gelatina', 'Coffee-flavored layers with sweet cream. A coffee lovers dream!', 37.00, 'https://images.pexels.com/photos/2373521/pexels-photo-2373521.jpeg', 'Classic', true)
ON CONFLICT DO NOTHING;