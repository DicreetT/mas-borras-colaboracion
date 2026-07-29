export type Role = "participant" | "admin" | "owner";

export type ProgramType =
  | "community_legacy"
  | "specialized_maintenance";

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

export interface ModalityRoomOption {
  id: string;
  name: string;
  roomType: RoomType;
  description: string;
  pricePerNightCents: number;
  included: boolean;
}

export interface ModalityMealOption {
  id: string;
  name: string;
  planType: MealPlanType;
  description: string;
  includedMeals: string[];
  pricePerDayCents: number;
  included: boolean;
}

export interface WorkScheduleOption {
  id: string;
  label: string;
  hoursPerDay: number;
  description: string;
}

export interface Profile {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  locality?: string;
  country?: string;
  languages: string[];
  profession?: string;
  skills: string[];
  experience?: string;
  priorRelationship?: string;
  accessibilityNeeds?: string;
  dietaryPreferences?: string;
  emergencyContact?: string;
}

export interface ProjectDate {
  id: string;
  projectId: string;
  label: string;
  startDate?: string;
  endDate?: string;
  isFlexible: boolean;
}

export interface ProjectModality {
  id: string;
  projectId: string;
  name: string;
  description: string;
  pricePerNightCents: number | null;
  lodgingIncluded: boolean;
  mealsIncluded: boolean;
  optionalMenu: boolean;
  menuPricePerDayCents: number | null;
  collaborationHoursPerDay: number | null;
  roomType: RoomType;
  depositRequired: boolean;
  depositAmountCents: number | null;
  conditions: string;
  isCustomAgreement?: boolean;
  isFlexibleBuilder?: boolean;
  roomOptions: ModalityRoomOption[];
  defaultRoomOptionId?: string;
  mealOptions: ModalityMealOption[];
  defaultMealOptionId?: string;
  workOptions: WorkScheduleOption[];
  defaultWorkOptionId?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  type: ProgramType;
  status: ProjectStatus;
  summary: string;
  description: string;
  difficulty: Difficulty;
  capacity: number;
  occupiedPlaces: number;
  location: string;
  heroImage: string;
  imageAlt: string;
  requirements: string[];
  includes: string[];
  dates: ProjectDate[];
  modalities: ProjectModality[];
  publishedAt?: string;
}

export interface Application {
  id: string;
  projectId: string;
  modalityId: string;
  profileId: string;
  status: ApplicationStatus;
  submittedAt?: string;
  estimatedAmountCents: number | null;
  nights: number;
  menuDays: number;
  notes?: string;
}

export interface Stay {
  id: string;
  projectId: string;
  profileId: string;
  applicationId: string;
  status: "upcoming" | "active" | "completed" | "cancelled";
  arrivalDate: string;
  departureDate: string;
}

export interface Message {
  id: string;
  profileId: string;
  projectId?: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface Resource {
  id: string;
  projectId?: string;
  title: string;
  description: string;
  type: "guide" | "document" | "link" | "instruction";
  url?: string;
}

export interface NotificationTemplate {
  id: string;
  event:
    | "application_submitted"
    | "application_status_changed"
    | "information_requested";
  channel: "email" | "in_app";
  subject: string;
  body: string;
  editable: boolean;
}

export interface AdminSummary {
  publishedProjects: number;
  upcomingProjects: number;
  pendingApplications: number;
  occupiedPlaces: number;
  waitlistedApplications: number;
  recentAlerts: string[];
}
