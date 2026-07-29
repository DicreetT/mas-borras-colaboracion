export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = "participant" | "admin" | "owner";
export type ProgramType = "community_legacy" | "specialized_maintenance";
export type Difficulty = "light" | "moderate" | "project_based";
export type ProjectStatus = "draft" | "published" | "closed" | "archived";
export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "information_requested"
  | "waitlisted"
  | "accepted"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";
export type RoomType = "private" | "shared" | "either" | "to_agree";
export type MealPlanType =
  | "none"
  | "breakfast"
  | "breakfast_dinner"
  | "full_board"
  | "self_catered"
  | "to_agree";
export type StayStatus = "upcoming" | "active" | "completed" | "cancelled";
export type ResourceType = "guide" | "document" | "link" | "instruction";
export type ResourceVisibility =
  | "public"
  | "authenticated"
  | "project_participants"
  | "admins";
export type NotificationChannel = "email" | "in_app";
export type NotificationEvent =
  | "application_submitted"
  | "application_status_changed"
  | "information_requested";

type Table<Row, Insert = Row, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: never[];
};

export interface Database {
  public: {
    Tables: {
      profiles: Table<
        {
          id: string;
          role: AppRole;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          locality: string | null;
          country: string | null;
          languages: string[];
          profession: string | null;
          experience: string | null;
          prior_relationship: string | null;
          accessibility_needs: string | null;
          dietary_preferences: string | null;
          emergency_contact: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id: string;
          role?: AppRole;
          first_name?: string;
          last_name?: string;
          email: string;
          phone?: string | null;
          locality?: string | null;
          country?: string | null;
          languages?: string[];
          profession?: string | null;
          experience?: string | null;
          prior_relationship?: string | null;
          accessibility_needs?: string | null;
          dietary_preferences?: string | null;
          emergency_contact?: string | null;
        }
      >;
      admin_roles: Table<{
        user_id: string;
        role: AppRole;
        granted_by: string | null;
        created_at: string;
        updated_at: string;
      }>;
      profile_skills: Table<{
        id: string;
        profile_id: string;
        skill: string;
        created_at: string;
      }, {
        id?: string;
        profile_id: string;
        skill: string;
        created_at?: string;
      }>;
      projects: Table<
        {
          id: string;
          slug: string;
          title: string;
          type: ProgramType;
          status: ProjectStatus;
          summary: string;
          description: string;
          purpose: string | null;
          coordinator_message: string | null;
          difficulty: Difficulty;
          capacity: number;
          occupied_places: number;
          location: string;
          hero_image: string | null;
          image_alt: string | null;
          gallery_images: Json | null;
          confirmed_participants: number | null;
          past_participants: number | null;
          last_edition_label: string | null;
          tasks: string[];
          requirements: string[];
          includes: string[];
          published_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          slug: string;
          title: string;
          type: ProgramType;
          status?: ProjectStatus;
          summary: string;
          description: string;
          purpose?: string | null;
          coordinator_message?: string | null;
          difficulty: Difficulty;
          capacity: number;
          occupied_places?: number;
          location?: string;
          hero_image?: string | null;
          image_alt?: string | null;
          gallery_images?: Json | null;
          confirmed_participants?: number | null;
          past_participants?: number | null;
          last_edition_label?: string | null;
          tasks?: string[];
          requirements?: string[];
          includes?: string[];
          published_at?: string | null;
          created_by?: string | null;
        }
      >;
      project_dates: Table<{
        id: string;
        project_id: string;
        label: string;
        start_date: string | null;
        end_date: string | null;
        is_flexible: boolean;
        sort_order: number;
        created_at: string;
        updated_at: string;
      }>;
      project_modalities: Table<{
        id: string;
        project_id: string;
        name: string;
        description: string;
        price_per_night_cents: number | null;
        lodging_included: boolean;
        meals_included: boolean;
        optional_menu: boolean;
        menu_price_per_day_cents: number | null;
        collaboration_hours_per_day: number | null;
        room_type: RoomType;
        deposit_required: boolean;
        deposit_amount_cents: number | null;
        conditions: string;
        is_custom_agreement: boolean;
        is_flexible_builder: boolean;
        sort_order: number;
        created_at: string;
        updated_at: string;
      }>;
      project_modality_room_options: Table<{
        id: string;
        modality_id: string;
        name: string;
        room_type: RoomType;
        description: string;
        price_per_night_cents: number;
        included: boolean;
        is_default: boolean;
        sort_order: number;
        created_at: string;
        updated_at: string;
      }>;
      project_modality_meal_options: Table<{
        id: string;
        modality_id: string;
        name: string;
        plan_type: MealPlanType;
        description: string;
        included_meals: string[];
        price_per_day_cents: number;
        included: boolean;
        is_default: boolean;
        sort_order: number;
        created_at: string;
        updated_at: string;
      }>;
      project_modality_work_options: Table<{
        id: string;
        modality_id: string;
        label: string;
        hours_per_day: number;
        description: string;
        is_default: boolean;
        sort_order: number;
        created_at: string;
        updated_at: string;
      }>;
      applications: Table<{
        id: string;
        profile_id: string;
        project_id: string;
        modality_id: string;
        selected_room_option_id: string | null;
        selected_meal_option_id: string | null;
        selected_work_option_id: string | null;
        status: ApplicationStatus;
        estimated_amount_cents: number | null;
        nights: number;
        meal_days: number;
        motivation: string | null;
        notes: string | null;
        internal_notes: string | null;
        submitted_at: string | null;
        reviewed_at: string | null;
        decided_at: string | null;
        created_at: string;
        updated_at: string;
      }>;
      application_answers: Table<{
        id: string;
        application_id: string;
        question_key: string;
        question_label: string;
        answer: string | null;
        answer_json: Json | null;
        created_at: string;
        updated_at: string;
      }>;
      stays: Table<{
        id: string;
        profile_id: string;
        project_id: string;
        application_id: string;
        status: StayStatus;
        arrival_date: string;
        departure_date: string;
        created_at: string;
        updated_at: string;
      }>;
      messages: Table<{
        id: string;
        sender_profile_id: string | null;
        recipient_profile_id: string;
        project_id: string | null;
        application_id: string | null;
        subject: string;
        body: string;
        read: boolean;
        created_at: string;
        updated_at: string;
      }>;
      resources: Table<{
        id: string;
        project_id: string | null;
        title: string;
        description: string;
        type: ResourceType;
        visibility: ResourceVisibility;
        url: string | null;
        created_by: string | null;
        created_at: string;
        updated_at: string;
      }>;
      notifications: Table<{
        id: string;
        recipient_profile_id: string;
        project_id: string | null;
        application_id: string | null;
        subject: string;
        body: string;
        channel: NotificationChannel;
        event: NotificationEvent | null;
        read_at: string | null;
        created_at: string;
      }>;
      notification_templates: Table<{
        id: string;
        event: NotificationEvent;
        channel: NotificationChannel;
        subject: string;
        body: string;
        editable: boolean;
        created_at: string;
        updated_at: string;
      }>;
    };
    Views: Record<string, never>;
    Functions: {
      current_user_role: {
        Args: Record<string, never>;
        Returns: AppRole;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      is_owner: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      app_role: AppRole;
      program_type: ProgramType;
      difficulty: Difficulty;
      project_status: ProjectStatus;
      application_status: ApplicationStatus;
      room_type: RoomType;
      meal_plan_type: MealPlanType;
      stay_status: StayStatus;
      resource_type: ResourceType;
      resource_visibility: ResourceVisibility;
      notification_channel: NotificationChannel;
      notification_event: NotificationEvent;
    };
    CompositeTypes: Record<string, never>;
  };
}
