DELETE FROM public.crm_activities
WHERE contact_id IN (SELECT id FROM public.crm_contacts WHERE lower(email) = 'e2e-inquiry@test.dev');

DELETE FROM public.foundation_inquiries WHERE lower(email) = 'e2e-inquiry@test.dev';

DELETE FROM public.crm_contacts WHERE lower(email) = 'e2e-inquiry@test.dev';