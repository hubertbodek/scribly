export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          id: number
          is_published: boolean | null
          main_image: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_published?: boolean | null
          main_image?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_published?: boolean | null
          main_image?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_main_image_fkey"
            columns: ["main_image"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          handle: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          handle?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          handle?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
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
