CREATE TABLE public.crm_notification_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  singleton boolean NOT NULL DEFAULT true,
  notifications_enabled boolean NOT NULL DEFAULT false,
  recipients text[] NOT NULL DEFAULT ARRAY[]::text[],
  notify_on_inquiry boolean NOT NULL DEFAULT true,
  notify_on_task boolean NOT NULL DEFAULT false,
  notify_on_donation boolean NOT NULL DEFAULT true,
  notify_on_newsletter boolean NOT NULL DEFAULT false,
  digest_frequency text NOT NULL DEFAULT 'instant',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT crm_notification_settings_singleton CHECK (singleton),
  CONSTRAINT crm_notification_settings_singleton_unique UNIQUE (singleton),
  CONSTRAINT crm_notification_settings_frequency CHECK (digest_frequency IN ('instant','daily','weekly'))
);

GRANT SELECT, INSERT, UPDATE ON public.crm_notification_settings TO authenticated;
GRANT ALL ON public.crm_notification_settings TO service_role;

ALTER TABLE public.crm_notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view notification settings"
  ON public.crm_notification_settings FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create notification settings"
  ON public.crm_notification_settings FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update notification settings"
  ON public.crm_notification_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER crm_notification_settings_updated_at
  BEFORE UPDATE ON public.crm_notification_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();