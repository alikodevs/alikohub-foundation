-- ENUMS
CREATE TYPE public.crm_contact_type AS ENUM ('donor','partner','volunteer','media','beneficiary','staff','other');
CREATE TYPE public.crm_lifecycle_stage AS ENUM ('lead','engaged','active','lapsed','archived');
CREATE TYPE public.crm_deal_stage AS ENUM ('prospect','engaged','proposal','agreement','active','declined');
CREATE TYPE public.crm_activity_type AS ENUM ('note','call','email','meeting','event','form_submission');
CREATE TYPE public.crm_task_status AS ENUM ('open','in_progress','done','cancelled');
CREATE TYPE public.crm_task_priority AS ENUM ('low','medium','high');
CREATE TYPE public.newsletter_status AS ENUM ('subscribed','unsubscribed','bounced');

-- ORGANIZATIONS
CREATE TABLE public.crm_organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text,
  org_type text,
  country text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_organizations TO authenticated;
GRANT ALL ON public.crm_organizations TO service_role;
ALTER TABLE public.crm_organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage organizations" ON public.crm_organizations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- CONTACTS
CREATE TABLE public.crm_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE SET NULL,
  organization_name text,
  contact_type public.crm_contact_type NOT NULL DEFAULT 'other',
  lifecycle_stage public.crm_lifecycle_stage NOT NULL DEFAULT 'lead',
  tags text[] NOT NULL DEFAULT '{}',
  source text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX crm_contacts_email_key ON public.crm_contacts (lower(email)) WHERE email IS NOT NULL;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_contacts TO authenticated;
GRANT ALL ON public.crm_contacts TO service_role;
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage contacts" ON public.crm_contacts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- DEALS (partnership pipeline)
CREATE TABLE public.crm_deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE SET NULL,
  stage public.crm_deal_stage NOT NULL DEFAULT 'prospect',
  value numeric(14,2),
  currency text NOT NULL DEFAULT 'USD',
  owner_id uuid,
  expected_close_date date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_deals TO authenticated;
GRANT ALL ON public.crm_deals TO service_role;
ALTER TABLE public.crm_deals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage deals" ON public.crm_deals FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ACTIVITIES
CREATE TABLE public.crm_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  deal_id uuid REFERENCES public.crm_deals(id) ON DELETE CASCADE,
  activity_type public.crm_activity_type NOT NULL DEFAULT 'note',
  subject text NOT NULL,
  body text,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_activities TO authenticated;
GRANT ALL ON public.crm_activities TO service_role;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage activities" ON public.crm_activities FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- TASKS
CREATE TABLE public.crm_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  details text,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  deal_id uuid REFERENCES public.crm_deals(id) ON DELETE CASCADE,
  due_date date,
  status public.crm_task_status NOT NULL DEFAULT 'open',
  priority public.crm_task_priority NOT NULL DEFAULT 'medium',
  assigned_to uuid,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_tasks TO authenticated;
GRANT ALL ON public.crm_tasks TO service_role;
ALTER TABLE public.crm_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage tasks" ON public.crm_tasks FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- DONATIONS
CREATE TABLE public.crm_donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  organization_id uuid REFERENCES public.crm_organizations(id) ON DELETE SET NULL,
  amount numeric(14,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  donated_at date NOT NULL DEFAULT CURRENT_DATE,
  method text,
  campaign text,
  is_recurring boolean NOT NULL DEFAULT false,
  receipt_sent boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_donations TO authenticated;
GRANT ALL ON public.crm_donations TO service_role;
ALTER TABLE public.crm_donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage donations" ON public.crm_donations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- NEWSLETTER
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  source_page text,
  status public.newsletter_status NOT NULL DEFAULT 'subscribed',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX newsletter_subscribers_email_key ON public.newsletter_subscribers (lower(email));
GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update subscribers" ON public.newsletter_subscribers FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete subscribers" ON public.newsletter_subscribers FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- link inquiries to contacts
ALTER TABLE public.foundation_inquiries ADD COLUMN IF NOT EXISTS contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL;

-- updated_at triggers
CREATE TRIGGER set_updated_at_crm_organizations BEFORE UPDATE ON public.crm_organizations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_crm_contacts BEFORE UPDATE ON public.crm_contacts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_crm_deals BEFORE UPDATE ON public.crm_deals FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_crm_tasks BEFORE UPDATE ON public.crm_tasks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_crm_donations BEFORE UPDATE ON public.crm_donations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_newsletter BEFORE UPDATE ON public.newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_updated_at_foundation_inquiries BEFORE UPDATE ON public.foundation_inquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- AUTO-CREATE CRM CONTACT FROM INQUIRY
CREATE OR REPLACE FUNCTION public.crm_capture_inquiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_contact_id uuid;
  v_type public.crm_contact_type;
BEGIN
  v_type := CASE NEW.inquiry_type
    WHEN 'partnership' THEN 'partner'::public.crm_contact_type
    WHEN 'volunteer' THEN 'volunteer'::public.crm_contact_type
    WHEN 'media' THEN 'media'::public.crm_contact_type
    ELSE 'other'::public.crm_contact_type
  END;

  INSERT INTO public.crm_contacts (name, email, organization_name, contact_type, source, lifecycle_stage)
  VALUES (NEW.name, NEW.email, NEW.organization, v_type, COALESCE(NEW.source_page, 'website inquiry'), 'lead')
  ON CONFLICT (lower(email)) DO UPDATE
    SET name = EXCLUDED.name,
        organization_name = COALESCE(EXCLUDED.organization_name, public.crm_contacts.organization_name),
        updated_at = now()
  RETURNING id INTO v_contact_id;

  IF v_contact_id IS NULL THEN
    SELECT id INTO v_contact_id FROM public.crm_contacts WHERE lower(email) = lower(NEW.email) LIMIT 1;
  END IF;

  NEW.contact_id := v_contact_id;

  INSERT INTO public.crm_activities (contact_id, activity_type, subject, body)
  VALUES (v_contact_id, 'form_submission', 'Website inquiry: ' || NEW.inquiry_type::text, NEW.message);

  RETURN NEW;
END;
$$;

CREATE TRIGGER crm_capture_inquiry_trg
BEFORE INSERT ON public.foundation_inquiries
FOR EACH ROW EXECUTE FUNCTION public.crm_capture_inquiry();

-- AUTO-CREATE CRM CONTACT FROM NEWSLETTER SIGNUP
CREATE OR REPLACE FUNCTION public.crm_capture_subscriber()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_contact_id uuid;
BEGIN
  INSERT INTO public.crm_contacts (name, email, contact_type, source, lifecycle_stage, tags)
  VALUES (COALESCE(NEW.name, split_part(NEW.email,'@',1)), NEW.email, 'other', COALESCE(NEW.source_page,'newsletter'), 'lead', ARRAY['newsletter'])
  ON CONFLICT (lower(email)) DO UPDATE
    SET tags = (SELECT ARRAY(SELECT DISTINCT unnest(public.crm_contacts.tags || ARRAY['newsletter']))),
        updated_at = now()
  RETURNING id INTO v_contact_id;

  IF v_contact_id IS NULL THEN
    SELECT id INTO v_contact_id FROM public.crm_contacts WHERE lower(email) = lower(NEW.email) LIMIT 1;
  END IF;

  INSERT INTO public.crm_activities (contact_id, activity_type, subject, body)
  VALUES (v_contact_id, 'form_submission', 'Newsletter subscription', NEW.source_page);

  RETURN NEW;
END;
$$;

CREATE TRIGGER crm_capture_subscriber_trg
AFTER INSERT ON public.newsletter_subscribers
FOR EACH ROW EXECUTE FUNCTION public.crm_capture_subscriber();