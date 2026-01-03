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
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          ingredients: string
          instructions: string
          cooking_time: number | null
          difficulty: string | null
          category: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          ingredients: string
          instructions: string
          cooking_time?: number | null
          difficulty?: string | null
          category?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          ingredients?: string
          instructions?: string
          cooking_time?: number | null
          difficulty?: string | null
          category?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_user_id_fkey"
            columns: ["user_id"]
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

