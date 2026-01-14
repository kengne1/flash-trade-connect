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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          created_at: string
          display_order: number
          id: string
          image_url: string | null
          is_active: boolean
          link: string
          link_text: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          link?: string
          link_text?: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          link?: string
          link_text?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      chatbot_settings: {
        Row: {
          entrepreneur_message: string | null
          groupage_explanation: string | null
          id: string
          is_enabled: boolean
          merchant_message: string | null
          motivation_message: string | null
          quote_template: string | null
          student_message: string | null
          updated_at: string
          welcome_message: string
        }
        Insert: {
          entrepreneur_message?: string | null
          groupage_explanation?: string | null
          id?: string
          is_enabled?: boolean
          merchant_message?: string | null
          motivation_message?: string | null
          quote_template?: string | null
          student_message?: string | null
          updated_at?: string
          welcome_message?: string
        }
        Update: {
          entrepreneur_message?: string | null
          groupage_explanation?: string | null
          id?: string
          is_enabled?: boolean
          merchant_message?: string | null
          motivation_message?: string | null
          quote_template?: string | null
          student_message?: string | null
          updated_at?: string
          welcome_message?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          auto_messages: Json | null
          email: string | null
          id: string
          location: string | null
          phone_numbers: string[] | null
          updated_at: string
          whatsapp_numbers: string[] | null
        }
        Insert: {
          auto_messages?: Json | null
          email?: string | null
          id?: string
          location?: string | null
          phone_numbers?: string[] | null
          updated_at?: string
          whatsapp_numbers?: string[] | null
        }
        Update: {
          auto_messages?: Json | null
          email?: string | null
          id?: string
          location?: string | null
          phone_numbers?: string[] | null
          updated_at?: string
          whatsapp_numbers?: string[] | null
        }
        Relationships: []
      }
      formations: {
        Row: {
          certificate_images: string[] | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean
          location: string | null
          price: string | null
          program: string[] | null
          start_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          certificate_images?: string[] | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          location?: string | null
          price?: string | null
          program?: string[] | null
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          certificate_images?: string[] | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          location?: string | null
          price?: string | null
          program?: string[] | null
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          file_path: string
          id: string
          media_type: string
          mime_type: string
          name: string
          size: number
          updated_at: string
          uploaded_by: string | null
          url: string
        }
        Insert: {
          created_at?: string
          file_path: string
          id?: string
          media_type: string
          mime_type: string
          name: string
          size: number
          updated_at?: string
          uploaded_by?: string | null
          url: string
        }
        Update: {
          created_at?: string
          file_path?: string
          id?: string
          media_type?: string
          mime_type?: string
          name?: string
          size?: number
          updated_at?: string
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          category: string
          created_at: string
          description: string | null
          groupage_estimate: string | null
          id: string
          image_url: string | null
          is_active: boolean
          moq: string
          name: string
          price_range: string
          transport_mode: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          groupage_estimate?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          moq?: string
          name: string
          price_range: string
          transport_mode?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          groupage_estimate?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          moq?: string
          name?: string
          price_range?: string
          transport_mode?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_contents: {
        Row: {
          content: Json
          id: string
          page_slug: string
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json
          id?: string
          page_slug: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          page_slug?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          created_at: string
          description: string | null
          display_in_banner: boolean
          display_in_page: boolean
          end_date: string | null
          features: string[] | null
          id: string
          image_url: string | null
          is_active: boolean
          original_price: string | null
          promo_price: string | null
          title: string
          updated_at: string
          whatsapp_message: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_in_banner?: boolean
          display_in_page?: boolean
          end_date?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          original_price?: string | null
          promo_price?: string | null
          title: string
          updated_at?: string
          whatsapp_message?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_in_banner?: boolean
          display_in_page?: boolean
          end_date?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          original_price?: string | null
          promo_price?: string | null
          title?: string
          updated_at?: string
          whatsapp_message?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "support"
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
      app_role: ["admin", "support"],
    },
  },
} as const
