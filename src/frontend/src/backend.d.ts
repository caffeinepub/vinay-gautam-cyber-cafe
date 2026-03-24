import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    id: bigint;
    title: string;
    description: string;
    iconName: string;
    category: ServiceCategory;
}
export interface News {
    id: bigint;
    title: string;
    content: string;
    date: bigint;
    category: string;
}
export interface Appointment {
    id: bigint;
    status: AppointmentStatus;
    bookedBy: Principal;
    name: string;
    createdAt: bigint;
    email: string;
    preferredDate: bigint;
    serviceId: bigint;
    phone: string;
}
export interface Scheme {
    id: bigint;
    name: string;
    officialLink: string;
    description: string;
    eligibility: string;
    documentsRequired: Array<string>;
    category: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum ServiceCategory {
    pan = "pan",
    aadhaar = "aadhaar",
    government = "government",
    digital = "digital"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addNews(newsItem: News): Promise<bigint>;
    addScheme(scheme: Scheme): Promise<bigint>;
    addService(service: Service): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(appointment: Appointment): Promise<bigint>;
    deleteNews(id: bigint): Promise<void>;
    deleteScheme(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllNews(): Promise<Array<News>>;
    getAllSchemes(): Promise<Array<Scheme>>;
    getAllServices(): Promise<Array<Service>>;
    getAppointment(id: bigint): Promise<Appointment>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialData(): Promise<void>;
    updateAppointmentStatus(id: bigint, status: AppointmentStatus): Promise<void>;
    updateNews(id: bigint, newsItem: News): Promise<void>;
    updateScheme(id: bigint, scheme: Scheme): Promise<void>;
    updateService(id: bigint, service: Service): Promise<void>;
}
