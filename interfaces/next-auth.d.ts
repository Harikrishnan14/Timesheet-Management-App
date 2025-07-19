import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user?: {
            name?: string | null;
            email?: string | null;
        };
    }

    interface User extends DefaultUser {
        token?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
export interface Task {
    title: string;
    hours: string;
    project: string;
}
export interface DayData {
    day: string; // e.g., "Jan 1"
    tasks: Task[];
}

export type TimesheetStatus = "COMPLETED" | "INCOMPLETE" | "MISSING";
export interface TimesheetWeek {
    week: number;
    date: string; // e.g., "1 – 5 January, 2024"
    status: TimesheetStatus;
    weeklyData: DayData[];
}