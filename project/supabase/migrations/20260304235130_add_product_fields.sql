/*
  # Add Product Fields

  1. Changes
    - Add `ingredients` column to products table (text)
    - Add `slug` column to products table (text, unique)
    - Update existing products with ingredient information
    - Generate slugs for existing products

  2. Notes
    - Ingredients will be stored as text for flexibility
    - Slugs will be unique for SEO-friendly URLs
*/

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'ingredients'
  ) THEN
    ALTER TABLE products ADD COLUMN ingredients text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'slug'
  ) THEN
    ALTER TABLE products ADD COLUMN slug text UNIQUE;
  END IF;
END $$;

-- Update existing products with ingredients and slugs
UPDATE products
SET 
  ingredients = 'Gelatin, milk, sugar, strawberry flavoring, vanilla extract, cream, food coloring',
  slug = 'classic-strawberry-gelatina'
WHERE name = 'Classic Strawberry Gelatina';

UPDATE products
SET 
  ingredients = 'Gelatin, evaporated milk, condensed milk, whole milk, sugar, vanilla extract, cinnamon',
  slug = 'tres-leches-gelatina'
WHERE name = 'Tres Leches Gelatina';

UPDATE products
SET 
  ingredients = 'Gelatin, mango puree, sugar, chamoy sauce, lime juice, tajin seasoning',
  slug = 'mango-chamoy-gelatina'
WHERE name = 'Mango Chamoy Gelatina';

UPDATE products
SET 
  ingredients = 'Gelatin, sugar, natural fruit flavors, food coloring (red, orange, yellow, green, blue, purple)',
  slug = 'rainbow-gelatina'
WHERE name = 'Rainbow Gelatina';

UPDATE products
SET 
  ingredients = 'Gelatin, coconut milk, coconut cream, sugar, vanilla extract, shredded coconut',
  slug = 'coconut-cream-gelatina'
WHERE name = 'Coconut Cream Gelatina';

UPDATE products
SET 
  ingredients = 'Gelatin, Mexican chocolate (Abuelita), milk, sugar, cinnamon, vanilla extract',
  slug = 'chocolate-abuelita-gelatina'
WHERE name = 'Chocolate Abuelita Gelatina';

UPDATE products
SET 
  ingredients = 'Gelatin, milk, sugar, assorted fruit flavors, vanilla extract, individual serving cups',
  slug = 'mini-gelatina-cups'
WHERE name = 'Mini Gelatina Cups (12 pack)';

UPDATE products
SET 
  ingredients = 'Gelatin, espresso, milk, condensed milk, coffee liqueur flavoring, vanilla extract',
  slug = 'cafe-con-leche-gelatina'
WHERE name = 'Cafe con Leche Gelatina';
