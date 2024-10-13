export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          created_at: string
          decisions: Json[] | null
          description: string | null
          ended_at: string | null
          features: string[] | null
          github_link: string | null
          id: string
          images: string[] | null
          isView: boolean | null
          keywords: string[] | null
          link: string | null
          number: number | null
          stacks: Json[] | null
          started_at: string | null
          title: string | null
          troubles: Json[] | null
        }
        Insert: {
          created_at?: string
          decisions?: Json[] | null
          description?: string | null
          ended_at?: string | null
          features?: string[] | null
          github_link?: string | null
          id?: string
          images?: string[] | null
          isView?: boolean | null
          keywords?: string[] | null
          link?: string | null
          number?: number | null
          stacks?: Json[] | null
          started_at?: string | null
          title?: string | null
          troubles?: Json[] | null
        }
        Update: {
          created_at?: string
          decisions?: Json[] | null
          description?: string | null
          ended_at?: string | null
          features?: string[] | null
          github_link?: string | null
          id?: string
          images?: string[] | null
          isView?: boolean | null
          keywords?: string[] | null
          link?: string | null
          number?: number | null
          stacks?: Json[] | null
          started_at?: string | null
          title?: string | null
          troubles?: Json[] | null
        }
        Relationships: []
      }
      sonnygoals: {
        Row: {
          created_at: string
          goals: number | null
          id: number
        }
        Insert: {
          created_at?: string
          goals?: number | null
          id?: number
        }
        Update: {
          created_at?: string
          goals?: number | null
          id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          email: string | null
          id: string
          isAdmin: boolean
          nickname: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id?: string
          isAdmin?: boolean
          nickname?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id?: string
          isAdmin?: boolean
          nickname?: string | null
        }
        Relationships: []
      }
      viewer: {
        Row: {
          author: string
          created_at: string
          id: string
          img: string
          material: string
          nick: string
          number: number | null
          objurl: string
          size: string
          thumb: string
          title: string
          year: number
        }
        Insert: {
          author?: string
          created_at?: string
          id?: string
          img?: string
          material?: string
          nick?: string
          number?: number | null
          objurl?: string
          size?: string
          thumb?: string
          title?: string
          year?: number
        }
        Update: {
          author?: string
          created_at?: string
          id?: string
          img?: string
          material?: string
          nick?: string
          number?: number | null
          objurl?: string
          size?: string
          thumb?: string
          title?: string
          year?: number
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
