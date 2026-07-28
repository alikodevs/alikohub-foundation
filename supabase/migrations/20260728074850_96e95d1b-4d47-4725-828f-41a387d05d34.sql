CREATE OR REPLACE FUNCTION public.ensure_profile()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text;
  v_name text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT u.email, COALESCE(u.raw_user_meta_data->>'display_name', split_part(u.email, '@', 1))
    INTO v_email, v_name
  FROM auth.users u
  WHERE u.id = v_uid;

  INSERT INTO public.profiles (id, email, display_name)
  VALUES (v_uid, v_email, v_name)
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        display_name = COALESCE(public.profiles.display_name, EXCLUDED.display_name),
        updated_at = now();

  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_uid, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.ensure_profile() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.ensure_profile() TO authenticated, service_role;