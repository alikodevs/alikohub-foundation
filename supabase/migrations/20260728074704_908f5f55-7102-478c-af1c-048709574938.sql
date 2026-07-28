DELETE FROM public.crm_activities
WHERE contact_id IN (
  SELECT id FROM public.crm_contacts
  WHERE lower(email) IN ('e2e-news@test.dev','e2e-inquiry@test.dev','qa-8167fa@example.com')
);

DELETE FROM public.foundation_inquiries
WHERE lower(email) IN ('e2e-inquiry@test.dev','qa-8167fa@example.com');

DELETE FROM public.newsletter_subscribers
WHERE lower(email) IN ('e2e-news@test.dev','qa-8167fa@example.com');

DELETE FROM public.crm_contacts
WHERE lower(email) IN ('e2e-news@test.dev','e2e-inquiry@test.dev','qa-8167fa@example.com');