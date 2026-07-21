CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TYPE public.inquiry_type AS ENUM ('partnership','volunteer','media','general');
CREATE TYPE public.inquiry_status AS ENUM ('new','in_review','responded','archived');

CREATE TABLE public.foundation_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_type public.inquiry_type NOT NULL DEFAULT 'general',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  message TEXT NOT NULL,
  source_page TEXT,
  status public.inquiry_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT foundation_inquiries_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  CONSTRAINT foundation_inquiries_email_len CHECK (char_length(email) BETWEEN 3 AND 200),
  CONSTRAINT foundation_inquiries_org_len CHECK (organization IS NULL OR char_length(organization) <= 160),
  CONSTRAINT foundation_inquiries_msg_len CHECK (char_length(message) BETWEEN 10 AND 4000)
);

GRANT INSERT ON public.foundation_inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.foundation_inquiries TO authenticated;
GRANT ALL ON public.foundation_inquiries TO service_role;

ALTER TABLE public.foundation_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
  ON public.foundation_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view inquiries"
  ON public.foundation_inquiries
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update inquiries"
  ON public.foundation_inquiries
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete inquiries"
  ON public.foundation_inquiries
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER foundation_inquiries_set_updated_at
BEFORE UPDATE ON public.foundation_inquiries
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX foundation_inquiries_created_idx ON public.foundation_inquiries (created_at DESC);
CREATE INDEX foundation_inquiries_status_idx ON public.foundation_inquiries (status);