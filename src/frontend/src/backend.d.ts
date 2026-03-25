import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CommissionLog {
    id: bigint;
    source: string;
    date: bigint;
    description: string;
    amount: bigint;
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
export interface Wallet {
    balance: bigint;
    totalEarned: bigint;
    referralCount: bigint;
    totalWithdrawn: bigint;
}
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
export interface WithdrawalRequest {
    id: bigint;
    bankAccountNumber: string;
    status: WithdrawalStatus;
    ifscCode: string;
    createdAt: bigint;
    user: Principal;
    accountHolderName: string;
    processedAt?: bigint;
    amount: bigint;
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
export enum WithdrawalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addNews(newsItem: News): Promise<bigint>;
    addScheme(scheme: Scheme): Promise<bigint>;
    addService(service: Service): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(appointment: Appointment): Promise<bigint>;
    creditWallet(user: Principal, amount: bigint): Promise<void>;
    deleteNews(id: bigint): Promise<void>;
    deleteScheme(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllCommissionLogs(): Promise<Array<CommissionLog>>;
    getAllNews(): Promise<Array<News>>;
    getAllSchemes(): Promise<Array<Scheme>>;
    getAllServices(): Promise<Array<Service>>;
    getAllWallets(): Promise<Array<Wallet>>;
    getAllWithdrawalRequests(): Promise<Array<WithdrawalRequest>>;
    getAppointment(id: bigint): Promise<Appointment>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyWithdrawalRequests(): Promise<Array<WithdrawalRequest>>;
    getTotalCommission(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWallet(): Promise<Wallet>;
    getWithdrawalRequest(id: bigint): Promise<WithdrawalRequest>;
    isCallerAdmin(): Promise<boolean>;
    logCommission(amount: bigint, source: string, description: string): Promise<bigint>;
    registerReferral(code: string): Promise<void>;
    registerWithReferralCode(referralCode: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialData(): Promise<void>;
    submitWithdrawalRequest(amount: bigint, bankAccountNumber: string, ifscCode: string, accountHolderName: string): Promise<bigint>;
    updateAppointmentStatus(id: bigint, status: AppointmentStatus): Promise<void>;
    updateNews(id: bigint, newsItem: News): Promise<void>;
    updateScheme(id: bigint, scheme: Scheme): Promise<void>;
    updateService(id: bigint, service: Service): Promise<void>;
    updateWithdrawalRequest(id: bigint, status: WithdrawalStatus): Promise<void>;
}
