-- Speaker overhaul: replace minimal fields with full speaker application schema
DROP TABLE IF EXISTS speaker_applications;

CREATE TABLE speaker_applications (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT,
  headquarters TEXT,
  company_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  headshot_url TEXT,
  bio TEXT,
  speaking_topics TEXT,
  session_format TEXT,
  interested_events TEXT,
  previous_experience TEXT,
  message TEXT,
  consent_data BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'submitted',
  status_updated_at TIMESTAMP,
  admin_notes TEXT,
  reference_number TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
