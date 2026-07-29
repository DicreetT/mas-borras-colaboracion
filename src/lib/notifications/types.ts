import type { ApplicationStatus } from "@/domain/collaboration/types";

export interface NotificationPayload {
  recipientProfileId: string;
  subject: string;
  body: string;
  applicationId?: string;
  projectId?: string;
}

export interface ApplicationStatusNotification extends NotificationPayload {
  previousStatus: ApplicationStatus;
  nextStatus: ApplicationStatus;
}

export interface NotificationProvider {
  sendEmail(payload: NotificationPayload): Promise<void>;
  createInAppNotification(payload: NotificationPayload): Promise<void>;
}
