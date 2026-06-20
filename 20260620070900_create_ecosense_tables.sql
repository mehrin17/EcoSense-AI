/*
# EcoSense AI Database Schema

1. New Tables
- `climate_risk_predictions`: Stores climate risk predictions by location
  - `id` (uuid, primary key)
  - `country` (text, not null)
  - `state` (text, not null)
  - `city` (text, not null)
  - `flood_risk` (text, not null)
  - `heatwave_risk` (text, not null)
  - `drought_risk` (text, not null)
  - `flood_score` (integer, not null)
  - `heatwave_score` (integer, not null)
  - `drought_score` (integer, not null)
  - `created_at` (timestamptz)

- `carbon_footprints`: Stores carbon footprint calculations
  - `id` (uuid, primary key)
  - `vehicle_type` (text, not null)
  - `daily_distance` (integer, not null)
  - `monthly_electricity` (integer, not null)
  - `diet_type` (text, not null)
  - `waste_generation` (text, not null)
  - `annual_co2` (numeric, not null)
  - `monthly_co2` (numeric, not null)
  - `category` (text, not null)
  - `sustainability_score` (integer, not null)
  - `created_at` (timestamptz)

- `ai_recommendations`: Stores generated AI recommendations
  - `id` (uuid, primary key)
  - `climate_risk_id` (uuid, foreign key)
  - `carbon_footprint_id` (uuid, foreign key)
  - `recommendations` (jsonb, not null)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all three tables
- Allow anon and authenticated access (public data, single-tenant app)
*/

CREATE TABLE IF NOT EXISTS climate_risk_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  state text NOT NULL,
  city text NOT NULL,
  flood_risk text NOT NULL,
  heatwave_risk text NOT NULL,
  drought_risk text NOT NULL,
  flood_score integer NOT NULL,
  heatwave_score integer NOT NULL,
  drought_score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS carbon_footprints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_type text NOT NULL,
  daily_distance integer NOT NULL,
  monthly_electricity integer NOT NULL,
  diet_type text NOT NULL,
  waste_generation text NOT NULL,
  annual_co2 numeric(10,2) NOT NULL,
  monthly_co2 numeric(10,2) NOT NULL,
  category text NOT NULL,
  sustainability_score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  climate_risk_id uuid REFERENCES climate_risk_predictions(id) ON DELETE CASCADE,
  carbon_footprint_id uuid REFERENCES carbon_footprints(id) ON DELETE CASCADE,
  recommendations jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE climate_risk_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_footprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_climate_risk" ON climate_risk_predictions;
CREATE POLICY "anon_select_climate_risk" ON climate_risk_predictions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_climate_risk" ON climate_risk_predictions;
CREATE POLICY "anon_insert_climate_risk" ON climate_risk_predictions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_climate_risk" ON climate_risk_predictions;
CREATE POLICY "anon_update_climate_risk" ON climate_risk_predictions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_climate_risk" ON climate_risk_predictions;
CREATE POLICY "anon_delete_climate_risk" ON climate_risk_predictions FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_carbon_footprints" ON carbon_footprints;
CREATE POLICY "anon_select_carbon_footprints" ON carbon_footprints FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_carbon_footprints" ON carbon_footprints;
CREATE POLICY "anon_insert_carbon_footprints" ON carbon_footprints FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_carbon_footprints" ON carbon_footprints;
CREATE POLICY "anon_update_carbon_footprints" ON carbon_footprints FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_carbon_footprints" ON carbon_footprints;
CREATE POLICY "anon_delete_carbon_footprints" ON carbon_footprints FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_ai_recommendations" ON ai_recommendations;
CREATE POLICY "anon_select_ai_recommendations" ON ai_recommendations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_ai_recommendations" ON ai_recommendations;
CREATE POLICY "anon_insert_ai_recommendations" ON ai_recommendations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_ai_recommendations" ON ai_recommendations;
CREATE POLICY "anon_update_ai_recommendations" ON ai_recommendations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_ai_recommendations" ON ai_recommendations;
CREATE POLICY "anon_delete_ai_recommendations" ON ai_recommendations FOR DELETE
  TO anon, authenticated USING (true);
