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

  SELECT id INTO v_contact_id
  FROM public.crm_contacts
  WHERE email IS NOT NULL AND lower(email) = lower(NEW.email)
  LIMIT 1;

  IF v_contact_id IS NULL THEN
    INSERT INTO public.crm_contacts (name, email, organization_name, contact_type, source, lifecycle_stage)
    VALUES (NEW.name, NEW.email, NEW.organization, v_type, COALESCE(NEW.source_page, 'website inquiry'), 'lead')
    RETURNING id INTO v_contact_id;
  ELSE
    UPDATE public.crm_contacts
    SET name = NEW.name,
        organization_name = COALESCE(NEW.organization, organization_name),
        updated_at = now()
    WHERE id = v_contact_id;
  END IF;

  NEW.contact_id := v_contact_id;

  INSERT INTO public.crm_activities (contact_id, activity_type, subject, body)
  VALUES (v_contact_id, 'form_submission', 'Website inquiry: ' || NEW.inquiry_type::text, NEW.message);

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.crm_capture_subscriber()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_contact_id uuid;
BEGIN
  SELECT id INTO v_contact_id
  FROM public.crm_contacts
  WHERE email IS NOT NULL AND lower(email) = lower(NEW.email)
  LIMIT 1;

  IF v_contact_id IS NULL THEN
    INSERT INTO public.crm_contacts (name, email, contact_type, source, lifecycle_stage, tags)
    VALUES (COALESCE(NEW.name, split_part(NEW.email,'@',1)), NEW.email, 'other', COALESCE(NEW.source_page,'newsletter'), 'lead', ARRAY['newsletter'])
    RETURNING id INTO v_contact_id;
  ELSE
    UPDATE public.crm_contacts
    SET tags = (SELECT ARRAY(SELECT DISTINCT unnest(tags || ARRAY['newsletter']))),
        updated_at = now()
    WHERE id = v_contact_id;
  END IF;

  INSERT INTO public.crm_activities (contact_id, activity_type, subject, body)
  VALUES (v_contact_id, 'form_submission', 'Newsletter subscription', NEW.source_page);

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.crm_capture_inquiry() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.crm_capture_subscriber() FROM anon, authenticated, public;