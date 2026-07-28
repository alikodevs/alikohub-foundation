REVOKE EXECUTE ON FUNCTION public.crm_capture_inquiry() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.crm_capture_subscriber() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;