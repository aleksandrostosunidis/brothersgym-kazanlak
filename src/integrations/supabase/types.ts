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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_name: string
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          ip_address: string
          rating_count: number | null
          rating_sum: number | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_name: string
          category: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          ip_address: string
          rating_count?: number | null
          rating_sum?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          ip_address?: string
          rating_count?: number | null
          rating_sum?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_ratings: {
        Row: {
          blog_post_id: string
          created_at: string
          id: string
          ip_address: string
          rating: number
        }
        Insert: {
          blog_post_id: string
          created_at?: string
          id?: string
          ip_address: string
          rating: number
        }
        Update: {
          blog_post_id?: string
          created_at?: string
          id?: string
          ip_address?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_ratings_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_ratings_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "public_blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_reports: {
        Row: {
          blog_post_id: string
          created_at: string
          details: string | null
          id: string
          reason: string
          reporter_ip: string
          resolved_at: string | null
          status: string
        }
        Insert: {
          blog_post_id: string
          created_at?: string
          details?: string | null
          id?: string
          reason: string
          reporter_ip: string
          resolved_at?: string | null
          status?: string
        }
        Update: {
          blog_post_id?: string
          created_at?: string
          details?: string | null
          id?: string
          reason?: string
          reporter_ip?: string
          resolved_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_reports_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_reports_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "public_blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          ip_address: string
          name: string
          rating: number
          tags: string[] | null
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          ip_address: string
          name: string
          rating: number
          tags?: string[] | null
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          ip_address?: string
          name?: string
          rating?: number
          tags?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      public_blog_posts: {
        Row: {
          author_name: string | null
          average_rating: number | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: string | null
          rating_count: number | null
          rating_sum: number | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          author_name?: string | null
          average_rating?: never
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string | null
          rating_count?: number | null
          rating_sum?: number | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          author_name?: string | null
          average_rating?: never
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string | null
          rating_count?: number | null
          rating_sum?: number | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      public_blog_reports: {
        Row: {
          blog_post_id: string | null
          created_at: string | null
          details: string | null
          id: string | null
          reason: string | null
          resolved_at: string | null
          status: string | null
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string | null
          details?: string | null
          id?: string | null
          reason?: string | null
          resolved_at?: string | null
          status?: string | null
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string | null
          details?: string | null
          id?: string | null
          reason?: string | null
          resolved_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_reports_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_reports_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "public_blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      public_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string | null
          name: string | null
          rating: number | null
          tags: string[] | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          rating?: number | null
          tags?: string[] | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          rating?: number | null
          tags?: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
