-- Programme overhaul: replace individual-focused fields with company/investor fields
DROP TABLE IF EXISTS programme_applications;

CREATE TABLE programme_applications (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT,
  headquarters TEXT,
  company_name TEXT NOT NULL,
  company_website TEXT,
  role_title TEXT,
  market_served TEXT,
  ecosystem TEXT,
  company_type TEXT,
  company_stage TEXT,
  funding_raised TEXT,
  company_overview_url TEXT,
  china_objectives TEXT,
  target_customer TEXT,
  china_relevance TEXT,
  china_engagement TEXT,
  china_concerns TEXT,
  worthwhile_outcome TEXT,
  consent_data BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'submitted',
  status_updated_at TIMESTAMP,
  admin_notes TEXT,
  reference_number TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
