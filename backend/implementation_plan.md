# Supabase to Custom Express.js + PostgreSQL Migration Blueprint

## Overview
This document provides a comprehensive extraction of the PostgreSQL database schema from all 12 Supabase migration files (`supabase/migrations/`). It summarizes all enums, tables, columns, constraints, foreign keys, indexes, and triggers, and outlines a clean Express.js + PostgreSQL architecture for rebuilding the backend independently of Supabase.

---

## User Review Required

> [!IMPORTANT]
> **Database & Architecture Scope**
> - **No Code Generated**: This is strictly an analysis and architectural planning blueprint. No backend implementation, SQL scripts, Express routes, ORM schemas, or executable code have been written yet.
> - **Auth & Storage Abstraction**: Replacing Supabase requires implementing custom Auth (JWT + Password hashing) and File Storage (Multer + S3/Local disk storage).

---

## 1. Database Schema Analysis

### Enums (10 Total)

| Enum Name | Allowed Values |
| :--- | :--- |
| `public.app_role` | `'admin'`, `'user'` |
| `public.inquiry_type` | `'partnership'`, `'volunteer'`, `'media'`, `'general'` |
| `public.inquiry_status` | `'new'`, `'in_review'`, `'responded'`, `'archived'` |
| `public.crm_contact_type` | `'donor'`, `'partner'`, `'volunteer'`, `'media'`, `'beneficiary'`, `'staff'`, `'other'` |
| `public.crm_lifecycle_stage` | `'lead'`, `'engaged'`, `'active'`, `'lapsed'`, `'archived'` |
| `public.crm_deal_stage` | `'prospect'`, `'engaged'`, `'proposal'`, `'agreement'`, `'active'`, `'declined'` |
| `public.crm_activity_type` | `'note'`, `'call'`, `'email'`, `'meeting'`, `'event'`, `'form_submission'` |
| `public.crm_task_status` | `'open'`, `'in_progress'`, `'done'`, `'cancelled'` |
| `public.crm_task_priority` | `'low'`, `'medium'`, `'high'` |
| `public.newsletter_status` | `'subscribed'`, `'unsubscribed'`, `'bounced'` |

---

### Database Tables (16 Total)

#### 1. `user_roles`
* **Purpose**: Assigns application roles (`admin`, `user`) to authenticated users separately from profiles.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `user_id` (`UUID`): FK referencing auth user ID, `NOT NULL`
  * `role` (`app_role`): `NOT NULL`, DEFAULT `'user'`
  * `created_at` (`TIMESTAMPTZ`): DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: `user_id` → Auth Users (`id`) ON DELETE CASCADE
* **Constraints**: `NOT NULL` (`user_id`, `role`), `UNIQUE (user_id, role)`
* **Indexes**: Implicit unique index on `(user_id, role)`, PK index on `id`
* **Enums**: `app_role`
* **Triggers / Functions**: Affected by `handle_new_user()`, `ensure_profile()`, `claim_first_admin()`; checked by `has_role()`.

#### 2. `profiles`
* **Purpose**: Extended user profile information (display name, avatar, bio, email).
* **Columns**:
  * `id` (`UUID`): Primary key, FK referencing auth user ID
  * `email` (`TEXT`): User email
  * `display_name` (`TEXT`): User display name
  * `avatar_url` (`TEXT`): Avatar image URL
  * `bio` (`TEXT`): User bio
  * `created_at` (`TIMESTAMPTZ`): DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: `id` → Auth Users (`id`) ON DELETE CASCADE
* **Constraints**: PK on `id`
* **Indexes**: PK index on `id`
* **Enums**: None
* **Triggers / Functions**: Managed by `handle_new_user()` and `ensure_profile()`.

#### 3. `hero_content`
* **Purpose**: Stores banner headers, subtitles, CTAs, and background images for the landing page hero section.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `title` (`TEXT`): `NOT NULL`
  * `subtitle` (`TEXT`)
  * `cta_primary_text` (`TEXT`)
  * `cta_primary_link` (`TEXT`)
  * `cta_secondary_text` (`TEXT`)
  * `cta_secondary_link` (`TEXT`)
  * `background_image_url` (`TEXT`)
  * `is_active` (`BOOLEAN`): DEFAULT `true`
  * `created_at` (`TIMESTAMPTZ`): DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: None
* **Constraints**: `NOT NULL` on `title`
* **Indexes**: PK index on `id`
* **Enums**: None
* **Triggers / Functions**: None

#### 4. `team_members`
* **Purpose**: Foundation team directory, role titles, bios, image links, social handles, and display ordering.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `name` (`TEXT`): `NOT NULL`
  * `role` (`TEXT`)
  * `bio` (`TEXT`)
  * `image_url` (`TEXT`)
  * `linkedin_url` (`TEXT`)
  * `twitter_url` (`TEXT`)
  * `display_order` (`INT`): DEFAULT `0`
  * `is_active` (`BOOLEAN`): DEFAULT `true`
  * `created_at` (`TIMESTAMPTZ`): DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: None
* **Constraints**: `NOT NULL` on `name`
* **Indexes**: PK index on `id`
* **Enums**: None
* **Triggers / Functions**: None

#### 5. `services`
* **Purpose**: List of services and key offerings provided by the foundation for public CMS rendering.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `title` (`TEXT`): `NOT NULL`
  * `description` (`TEXT`)
  * `image_url` (`TEXT`)
  * `link` (`TEXT`)
  * `display_order` (`INT`): DEFAULT `0`
  * `is_active` (`BOOLEAN`): DEFAULT `true`
  * `created_at` (`TIMESTAMPTZ`): DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: None
* **Constraints**: `NOT NULL` on `title`
* **Indexes**: PK index on `id`
* **Enums**: None
* **Triggers / Functions**: None

#### 6. `programs`
* **Purpose**: Foundation initiatives and programs, including JSONB feature bullets and active toggles.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `title` (`TEXT`): `NOT NULL`
  * `description` (`TEXT`)
  * `image_url` (`TEXT`)
  * `features` (`JSONB`): DEFAULT `'[]'`
  * `link` (`TEXT`)
  * `display_order` (`INT`): DEFAULT `0`
  * `is_active` (`BOOLEAN`): DEFAULT `true`
  * `created_at` (`TIMESTAMPTZ`): DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: None
* **Constraints**: `NOT NULL` on `title`
* **Indexes**: PK index on `id`
* **Enums**: None
* **Triggers / Functions**: None

#### 7. `media_library`
* **Purpose**: Uploaded file metadata catalog (names, URLs, alt texts, types, sizes, uploader ID).
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `name` (`TEXT`): `NOT NULL`
  * `url` (`TEXT`): `NOT NULL`
  * `alt_text` (`TEXT`)
  * `file_type` (`TEXT`)
  * `file_size` (`INT`)
  * `uploaded_by` (`UUID`): FK referencing auth user
  * `created_at` (`TIMESTAMPTZ`): DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: `uploaded_by` → Auth Users (`id`)
* **Constraints**: `NOT NULL` on `name`, `url`
* **Indexes**: PK index on `id`
* **Enums**: None
* **Triggers / Functions**: None

#### 8. `foundation_inquiries`
* **Purpose**: Public website inquiry/contact form submissions (partnership, volunteer, media, general).
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `inquiry_type` (`inquiry_type`): `NOT NULL`, DEFAULT `'general'`
  * `name` (`TEXT`): `NOT NULL`
  * `email` (`TEXT`): `NOT NULL`
  * `organization` (`TEXT`)
  * `message` (`TEXT`): `NOT NULL`
  * `source_page` (`TEXT`)
  * `status` (`inquiry_status`): `NOT NULL`, DEFAULT `'new'`
  * `admin_notes` (`TEXT`)
  * `contact_id` (`UUID`): FK referencing `crm_contacts.id`
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: `contact_id` → `crm_contacts(id)` ON DELETE SET NULL
* **Constraints**:
  * `NOT NULL` on `inquiry_type`, `name`, `email`, `message`, `status`, `created_at`, `updated_at`
  * `CHECK (char_length(name) BETWEEN 1 AND 120)` (`foundation_inquiries_name_len`)
  * `CHECK (char_length(email) BETWEEN 3 AND 200)` (`foundation_inquiries_email_len`)
  * `CHECK (organization IS NULL OR char_length(organization) <= 160)` (`foundation_inquiries_org_len`)
  * `CHECK (char_length(message) BETWEEN 10 AND 4000)` (`foundation_inquiries_msg_len`)
* **Indexes**:
  * `foundation_inquiries_created_idx` ON `(created_at DESC)`
  * `foundation_inquiries_status_idx` ON `(status)`
* **Enums**: `inquiry_type`, `inquiry_status`
* **Triggers / Functions**:
  * `foundation_inquiries_set_updated_at`: BEFORE UPDATE calls `set_updated_at()`.
  * `crm_capture_inquiry_trg`: BEFORE INSERT calls `crm_capture_inquiry()`, auto-creating/updating a `crm_contacts` record, linking `contact_id`, and creating a `crm_activities` entry.

#### 9. `crm_organizations`
* **Purpose**: Companies, partners, and institution profiles managed within the CRM.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `name` (`TEXT`): `NOT NULL`
  * `website` (`TEXT`)
  * `org_type` (`TEXT`)
  * `country` (`TEXT`)
  * `notes` (`TEXT`)
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: None
* **Constraints**: `NOT NULL` on `name`, `created_at`, `updated_at`
* **Indexes**: PK index on `id`
* **Enums**: None
* **Triggers / Functions**: `set_updated_at_crm_organizations`: BEFORE UPDATE calls `set_updated_at()`.

#### 10. `crm_contacts`
* **Purpose**: Central CRM directory of individual contacts (donors, partners, volunteers, staff, leads).
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `name` (`TEXT`): `NOT NULL`
  * `email` (`TEXT`)
  * `phone` (`TEXT`)
  * `organization_id` (`UUID`): FK referencing `crm_organizations.id`
  * `organization_name` (`TEXT`)
  * `contact_type` (`crm_contact_type`): `NOT NULL`, DEFAULT `'other'`
  * `lifecycle_stage` (`crm_lifecycle_stage`): `NOT NULL`, DEFAULT `'lead'`
  * `tags` (`TEXT[]`): `NOT NULL`, DEFAULT `'{}'`
  * `source` (`TEXT`)
  * `notes` (`TEXT`)
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: `organization_id` → `crm_organizations(id)` ON DELETE SET NULL
* **Constraints**: `NOT NULL` on `name`, `contact_type`, `lifecycle_stage`, `tags`, `created_at`, `updated_at`
* **Indexes**: `crm_contacts_email_key` UNIQUE INDEX ON `lower(email)` WHERE `email IS NOT NULL`
* **Enums**: `crm_contact_type`, `crm_lifecycle_stage`
* **Triggers / Functions**:
  * `set_updated_at_crm_contacts`: BEFORE UPDATE calls `set_updated_at()`.
  * Automatically created/updated via database triggers on `foundation_inquiries` (`crm_capture_inquiry()`) and `newsletter_subscribers` (`crm_capture_subscriber()`).

#### 11. `crm_deals`
* **Purpose**: Deals and sponsorship pipeline tracking (stages, target values, currencies, target close dates).
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `title` (`TEXT`): `NOT NULL`
  * `contact_id` (`UUID`): FK referencing `crm_contacts.id`
  * `organization_id` (`UUID`): FK referencing `crm_organizations.id`
  * `stage` (`crm_deal_stage`): `NOT NULL`, DEFAULT `'prospect'`
  * `value` (`NUMERIC(14,2)`)
  * `currency` (`TEXT`): `NOT NULL`, DEFAULT `'USD'`
  * `owner_id` (`UUID`): Internal owner user ID
  * `expected_close_date` (`DATE`)
  * `notes` (`TEXT`)
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**:
  * `contact_id` → `crm_contacts(id)` ON DELETE SET NULL
  * `organization_id` → `crm_organizations(id)` ON DELETE SET NULL
* **Constraints**: `NOT NULL` on `title`, `stage`, `currency`, `created_at`, `updated_at`
* **Indexes**: PK index on `id`
* **Enums**: `crm_deal_stage`
* **Triggers / Functions**: `set_updated_at_crm_deals`: BEFORE UPDATE calls `set_updated_at()`.

#### 12. `crm_activities`
* **Purpose**: Activity logs, interaction records, and audit timeline for contacts and deals.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `contact_id` (`UUID`): FK referencing `crm_contacts.id`
  * `deal_id` (`UUID`): FK referencing `crm_deals.id`
  * `activity_type` (`crm_activity_type`): `NOT NULL`, DEFAULT `'note'`
  * `subject` (`TEXT`): `NOT NULL`
  * `body` (`TEXT`)
  * `occurred_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `created_by` (`UUID`): Internal creator user ID
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**:
  * `contact_id` → `crm_contacts(id)` ON DELETE CASCADE
  * `deal_id` → `crm_deals(id)` ON DELETE CASCADE
* **Constraints**: `NOT NULL` on `activity_type`, `subject`, `occurred_at`, `created_at`
* **Indexes**: PK index on `id`
* **Enums**: `crm_activity_type`
* **Triggers / Functions**: Inserted by `crm_capture_inquiry()` and `crm_capture_subscriber()`.

#### 13. `crm_tasks`
* **Purpose**: Internal task assignments, status tracking, priorities, and due dates linked to CRM entities.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `title` (`TEXT`): `NOT NULL`
  * `details` (`TEXT`)
  * `contact_id` (`UUID`): FK referencing `crm_contacts.id`
  * `deal_id` (`UUID`): FK referencing `crm_deals.id`
  * `due_date` (`DATE`)
  * `status` (`crm_task_status`): `NOT NULL`, DEFAULT `'open'`
  * `priority` (`crm_task_priority`): `NOT NULL`, DEFAULT `'medium'`
  * `assigned_to` (`UUID`)
  * `created_by` (`UUID`)
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**:
  * `contact_id` → `crm_contacts(id)` ON DELETE CASCADE
  * `deal_id` → `crm_deals(id)` ON DELETE CASCADE
* **Constraints**: `NOT NULL` on `title`, `status`, `priority`, `created_at`, `updated_at`
* **Indexes**: PK index on `id`
* **Enums**: `crm_task_status`, `crm_task_priority`
* **Triggers / Functions**: `set_updated_at_crm_tasks`: BEFORE UPDATE calls `set_updated_at()`.

#### 14. `crm_donations`
* **Purpose**: Monetary contributions, campaign sources, receipt delivery status, and recurring payment tracking.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `contact_id` (`UUID`): FK referencing `crm_contacts.id`
  * `organization_id` (`UUID`): FK referencing `crm_organizations.id`
  * `amount` (`NUMERIC(14,2)`): `NOT NULL`
  * `currency` (`TEXT`): `NOT NULL`, DEFAULT `'USD'`
  * `donated_at` (`DATE`): `NOT NULL`, DEFAULT `CURRENT_DATE`
  * `method` (`TEXT`)
  * `campaign` (`TEXT`)
  * `is_recurring` (`BOOLEAN`): `NOT NULL`, DEFAULT `false`
  * `receipt_sent` (`BOOLEAN`): `NOT NULL`, DEFAULT `false`
  * `notes` (`TEXT`)
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**:
  * `contact_id` → `crm_contacts(id)` ON DELETE SET NULL
  * `organization_id` → `crm_organizations(id)` ON DELETE SET NULL
* **Constraints**: `NOT NULL` on `amount`, `currency`, `donated_at`, `is_recurring`, `receipt_sent`, `created_at`, `updated_at`
* **Indexes**: PK index on `id`
* **Enums**: None
* **Triggers / Functions**: `set_updated_at_crm_donations`: BEFORE UPDATE calls `set_updated_at()`.

#### 15. `newsletter_subscribers`
* **Purpose**: Email subscription list for news updates and foundation announcements.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `email` (`TEXT`): `NOT NULL`
  * `name` (`TEXT`)
  * `source_page` (`TEXT`)
  * `status` (`newsletter_status`): `NOT NULL`, DEFAULT `'subscribed'`
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: None
* **Constraints**: `NOT NULL` on `email`, `status`, `created_at`, `updated_at`
* **Indexes**: `newsletter_subscribers_email_key` UNIQUE INDEX ON `lower(email)`
* **Enums**: `newsletter_status`
* **Triggers / Functions**:
  * `set_updated_at_newsletter`: BEFORE UPDATE calls `set_updated_at()`.
  * `crm_capture_subscriber_trg`: AFTER INSERT calls `crm_capture_subscriber()`, syncs/upserts `crm_contacts`, and logs activity.

#### 16. `crm_notification_settings`
* **Purpose**: Singleton table managing system email/alert preferences and recipient lists.
* **Columns**:
  * `id` (`UUID`): Primary key, DEFAULT `gen_random_uuid()`
  * `singleton` (`BOOLEAN`): `NOT NULL`, DEFAULT `true`
  * `notifications_enabled` (`BOOLEAN`): `NOT NULL`, DEFAULT `false`
  * `recipients` (`TEXT[]`): `NOT NULL`, DEFAULT `ARRAY[]::text[]`
  * `notify_on_inquiry` (`BOOLEAN`): `NOT NULL`, DEFAULT `true`
  * `notify_on_task` (`BOOLEAN`): `NOT NULL`, DEFAULT `false`
  * `notify_on_donation` (`BOOLEAN`): `NOT NULL`, DEFAULT `true`
  * `notify_on_newsletter` (`BOOLEAN`): `NOT NULL`, DEFAULT `false`
  * `digest_frequency` (`TEXT`): `NOT NULL`, DEFAULT `'instant'`
  * `created_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
  * `updated_at` (`TIMESTAMPTZ`): `NOT NULL`, DEFAULT `now()`
* **Primary Key**: `id`
* **Foreign Keys**: None
* **Constraints**:
  * `NOT NULL` on `singleton`, `notifications_enabled`, `recipients`, `notify_on_inquiry`, `notify_on_task`, `notify_on_donation`, `notify_on_newsletter`, `digest_frequency`, `created_at`, `updated_at`
  * `CHECK (singleton)` (`crm_notification_settings_singleton`)
  * `UNIQUE (singleton)` (`crm_notification_settings_singleton_unique`)
  * `CHECK (digest_frequency IN ('instant','daily','weekly'))` (`crm_notification_settings_frequency`)
* **Indexes**: Unique index on `singleton`
* **Enums**: None
* **Triggers / Functions**: `crm_notification_settings_updated_at`: BEFORE UPDATE calls `set_updated_at()`.

---

## 2. Express.js + PostgreSQL Architecture Blueprint

### Suggested Models / Entities
1. `User` / `UserRole` / `Profile`
2. `HeroContent`
3. `TeamMember`
4. `Service`
5. `Program`
6. `MediaFile`
7. `Inquiry`
8. `CrmOrganization`
9. `CrmContact`
10. `CrmDeal`
11. `CrmActivity`
12. `CrmTask`
13. `CrmDonation`
14. `NewsletterSubscriber`
15. `CrmNotificationSetting`

### Suggested Service Names
1. `AuthService`: Handles user authentication, password hashing, JWT generation, role assignments, and initial admin bootstrap.
2. `ProfileService`: Handles user profile retrieval and updates.
3. `CmsService`: Manages hero banners, team member profiles, foundation services, and programs.
4. `MediaService`: Handles file uploads, storage resolution (S3 or local disk), and media metadata management.
5. `InquiryService`: Processes visitor inquiry submissions, admin status updates, and handles CRM contact sync.
6. `CrmContactService`: Manages contacts directory, tagging, and lifecycle stage tracking.
7. `CrmOrganizationService`: Manages corporate and organizational profiles.
8. `CrmDealService`: Manages sales/partnership deal pipelines, values, and target close dates.
9. `CrmActivityService`: Logs interaction timeline records for contacts and deals.
10. `CrmTaskService`: Coordinates task assignment, status updates, and due dates.
11. `CrmDonationService`: Handles monetary donation entries, recurring billing tags, and receipt tracking.
12. `NewsletterService`: Handles email subscriptions, unsubscriptions, and CRM subscriber sync.
13. `NotificationService`: Manages system notification preferences, email alerts, and digest delivery.

### Suggested Repository / Data-Access Modules
1. `UserRepository`: Database queries for `users`, `user_roles`, and `profiles`.
2. `CmsRepository`: Database queries for `hero_content`, `team_members`, `services`, and `programs`.
3. `MediaRepository`: Database queries for `media_library`.
4. `InquiryRepository`: Database queries for `foundation_inquiries`.
5. `CrmContactRepository`: Database queries for `crm_contacts`.
6. `CrmOrganizationRepository`: Database queries for `crm_organizations`.
7. `CrmDealRepository`: Database queries for `crm_deals`.
8. `CrmActivityRepository`: Database queries for `crm_activities`.
9. `CrmTaskRepository`: Database queries for `crm_tasks`.
10. `CrmDonationRepository`: Database queries for `crm_donations`.
11. `NewsletterRepository`: Database queries for `newsletter_subscribers`.
12. `NotificationSettingsRepository`: Database queries for `crm_notification_settings`.

### Suggested Controllers
1. `AuthController`: `register`, `login`, `refreshToken`, `getMe`, `claimFirstAdmin`
2. `ProfileController`: `getProfile`, `updateProfile`
3. `CmsController`: `getPublicContent`, `createHero`, `updateHero`, `manageTeam`, `manageServices`, `managePrograms`
4. `MediaController`: `uploadMedia`, `listMedia`, `deleteMedia`
5. `InquiryController`: `submitInquiry`, `listInquiries`, `updateInquiryStatus`, `deleteInquiry`
6. `CrmContactController`: `listContacts`, `getContact`, `createContact`, `updateContact`, `deleteContact`
7. `CrmOrganizationController`: `listOrganizations`, `createOrganization`, `updateOrganization`, `deleteOrganization`
8. `CrmDealController`: `listDeals`, `createDeal`, `updateDeal`, `deleteDeal`
9. `CrmActivityController`: `listActivities`, `createActivity`
10. `CrmTaskController`: `listTasks`, `createTask`, `updateTask`, `deleteTask`
11. `CrmDonationController`: `listDonations`, `createDonation`, `updateDonation`, `deleteDonation`
12. `NewsletterController`: `subscribe`, `unsubscribe`, `listSubscribers`, `updateSubscriber`
13. `NotificationSettingsController`: `getSettings`, `updateSettings`

### Shared Utilities Required
1. **Authentication & Authorization**: JWT token verification middleware, Password hashing utility (bcrypt/argon2), Role-Based Access Control (RBAC) middleware.
2. **Validation**: Schema-based payload validator (e.g. Zod / Joi) enforcing DB constraints (string length bounds, enum check constraints).
3. **Database Connection & Transaction Manager**: PostgreSQL pool manager (`pg`) with explicit transaction wrapper helper.
4. **Pagination & Query Builder**: Cursor and offset pagination helper, dynamic filter parser, sorting builder.
5. **Storage Provider**: File upload middleware (Multer) with local filesystem or cloud object storage provider (S3/R2).
6. **Error Handling**: Centralized error middleware with structured custom Error exceptions (`BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`).
7. **Logger**: Structured logging utility (Winston/Pino) for API audit trails.

---

## Verification Plan

### Automated Verification
- Schema structure validation against SQL source migrations in `supabase/migrations/`.

### Manual Verification
- Review the generated blueprint with project stakeholders to ensure all tables, columns, enums, triggers, and Express.js architecture components cover all functional capabilities.
