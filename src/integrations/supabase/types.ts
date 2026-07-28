export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      crm_activities: {
        Row: {
          activity_type: Database["public"]["Enums"]["crm_activity_type"]
          body: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          deal_id: string | null
          id: string
          occurred_at: string
          subject: string
        }
        Insert: {
          activity_type?: Database["public"]["Enums"]["crm_activity_type"]
          body?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          id?: string
          occurred_at?: string
          subject: string
        }
        Update: {
          activity_type?: Database["public"]["Enums"]["crm_activity_type"]
          body?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          id?: string
          occurred_at?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contacts: {
        Row: {
          contact_type: Database["public"]["Enums"]["crm_contact_type"]
          created_at: string
          email: string | null
          id: string
          lifecycle_stage: Database["public"]["Enums"]["crm_lifecycle_stage"]
          name: string
          notes: string | null
          organization_id: string | null
          organization_name: string | null
          phone: string | null
          source: string | null
          tags: string[]
          updated_at: string
        }
        Insert: {
          contact_type?: Database["public"]["Enums"]["crm_contact_type"]
          created_at?: string
          email?: string | null
          id?: string
          lifecycle_stage?: Database["public"]["Enums"]["crm_lifecycle_stage"]
          name: string
          notes?: string | null
          organization_id?: string | null
          organization_name?: string | null
          phone?: string | null
          source?: string | null
          tags?: string[]
          updated_at?: string
        }
        Update: {
          contact_type?: Database["public"]["Enums"]["crm_contact_type"]
          created_at?: string
          email?: string | null
          id?: string
          lifecycle_stage?: Database["public"]["Enums"]["crm_lifecycle_stage"]
          name?: string
          notes?: string | null
          organization_id?: string | null
          organization_name?: string | null
          phone?: string | null
          source?: string | null
          tags?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_deals: {
        Row: {
          contact_id: string | null
          created_at: string
          currency: string
          expected_close_date: string | null
          id: string
          notes: string | null
          organization_id: string | null
          owner_id: string | null
          stage: Database["public"]["Enums"]["crm_deal_stage"]
          title: string
          updated_at: string
          value: number | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          currency?: string
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          owner_id?: string | null
          stage?: Database["public"]["Enums"]["crm_deal_stage"]
          title: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          currency?: string
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          organization_id?: string | null
          owner_id?: string | null
          stage?: Database["public"]["Enums"]["crm_deal_stage"]
          title?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_deals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_donations: {
        Row: {
          amount: number
          campaign: string | null
          contact_id: string | null
          created_at: string
          currency: string
          donated_at: string
          id: string
          is_recurring: boolean
          method: string | null
          notes: string | null
          organization_id: string | null
          receipt_sent: boolean
          updated_at: string
        }
        Insert: {
          amount: number
          campaign?: string | null
          contact_id?: string | null
          created_at?: string
          currency?: string
          donated_at?: string
          id?: string
          is_recurring?: boolean
          method?: string | null
          notes?: string | null
          organization_id?: string | null
          receipt_sent?: boolean
          updated_at?: string
        }
        Update: {
          amount?: number
          campaign?: string | null
          contact_id?: string | null
          created_at?: string
          currency?: string
          donated_at?: string
          id?: string
          is_recurring?: boolean
          method?: string | null
          notes?: string | null
          organization_id?: string | null
          receipt_sent?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_donations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_donations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "crm_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_notification_settings: {
        Row: {
          created_at: string
          digest_frequency: string
          id: string
          notifications_enabled: boolean
          notify_on_donation: boolean
          notify_on_inquiry: boolean
          notify_on_newsletter: boolean
          notify_on_task: boolean
          recipients: string[]
          singleton: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          digest_frequency?: string
          id?: string
          notifications_enabled?: boolean
          notify_on_donation?: boolean
          notify_on_inquiry?: boolean
          notify_on_newsletter?: boolean
          notify_on_task?: boolean
          recipients?: string[]
          singleton?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          digest_frequency?: string
          id?: string
          notifications_enabled?: boolean
          notify_on_donation?: boolean
          notify_on_inquiry?: boolean
          notify_on_newsletter?: boolean
          notify_on_task?: boolean
          recipients?: string[]
          singleton?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      crm_organizations: {
        Row: {
          country: string | null
          created_at: string
          id: string
          name: string
          notes: string | null
          org_type: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          org_type?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          org_type?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      crm_tasks: {
        Row: {
          assigned_to: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          deal_id: string | null
          details: string | null
          due_date: string | null
          id: string
          priority: Database["public"]["Enums"]["crm_task_priority"]
          status: Database["public"]["Enums"]["crm_task_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          details?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["crm_task_priority"]
          status?: Database["public"]["Enums"]["crm_task_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deal_id?: string | null
          details?: string | null
          due_date?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["crm_task_priority"]
          status?: Database["public"]["Enums"]["crm_task_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "crm_deals"
            referencedColumns: ["id"]
          },
        ]
      }
      foundation_inquiries: {
        Row: {
          admin_notes: string | null
          contact_id: string | null
          created_at: string
          email: string
          id: string
          inquiry_type: Database["public"]["Enums"]["inquiry_type"]
          message: string
          name: string
          organization: string | null
          source_page: string | null
          status: Database["public"]["Enums"]["inquiry_status"]
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          contact_id?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_type?: Database["public"]["Enums"]["inquiry_type"]
          message: string
          name: string
          organization?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          contact_id?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: Database["public"]["Enums"]["inquiry_type"]
          message?: string
          name?: string
          organization?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "foundation_inquiries_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_content: {
        Row: {
          background_image_url: string | null
          created_at: string | null
          cta_primary_link: string | null
          cta_primary_text: string | null
          cta_secondary_link: string | null
          cta_secondary_text: string | null
          id: string
          is_active: boolean | null
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string | null
          cta_primary_link?: string | null
          cta_primary_text?: string | null
          cta_secondary_link?: string | null
          cta_secondary_text?: string | null
          id?: string
          is_active?: boolean | null
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          background_image_url?: string | null
          created_at?: string | null
          cta_primary_link?: string | null
          cta_primary_text?: string | null
          cta_secondary_link?: string | null
          cta_secondary_text?: string | null
          id?: string
          is_active?: boolean | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string | null
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          uploaded_by: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          uploaded_by?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source_page: string | null
          status: Database["public"]["Enums"]["newsletter_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["newsletter_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["newsletter_status"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          features: Json | null
          id: string
          image_url: string | null
          is_active: boolean | null
          link: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          features?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          features?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          link: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          linkedin_url: string | null
          name: string
          role: string | null
          twitter_url: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name: string
          role?: string | null
          twitter_url?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string
          role?: string | null
          twitter_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_first_admin: { Args: never; Returns: boolean }
      ensure_profile: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      crm_activity_type:
        | "note"
        | "call"
        | "email"
        | "meeting"
        | "event"
        | "form_submission"
      crm_contact_type:
        | "donor"
        | "partner"
        | "volunteer"
        | "media"
        | "beneficiary"
        | "staff"
        | "other"
      crm_deal_stage:
        | "prospect"
        | "engaged"
        | "proposal"
        | "agreement"
        | "active"
        | "declined"
      crm_lifecycle_stage: "lead" | "engaged" | "active" | "lapsed" | "archived"
      crm_task_priority: "low" | "medium" | "high"
      crm_task_status: "open" | "in_progress" | "done" | "cancelled"
      inquiry_status: "new" | "in_review" | "responded" | "archived"
      inquiry_type: "partnership" | "volunteer" | "media" | "general"
      newsletter_status: "subscribed" | "unsubscribed" | "bounced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      crm_activity_type: [
        "note",
        "call",
        "email",
        "meeting",
        "event",
        "form_submission",
      ],
      crm_contact_type: [
        "donor",
        "partner",
        "volunteer",
        "media",
        "beneficiary",
        "staff",
        "other",
      ],
      crm_deal_stage: [
        "prospect",
        "engaged",
        "proposal",
        "agreement",
        "active",
        "declined",
      ],
      crm_lifecycle_stage: ["lead", "engaged", "active", "lapsed", "archived"],
      crm_task_priority: ["low", "medium", "high"],
      crm_task_status: ["open", "in_progress", "done", "cancelled"],
      inquiry_status: ["new", "in_review", "responded", "archived"],
      inquiry_type: ["partnership", "volunteer", "media", "general"],
      newsletter_status: ["subscribed", "unsubscribed", "bounced"],
    },
  },
} as const
