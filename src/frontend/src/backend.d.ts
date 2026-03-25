import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CustomerMessage {
    id: bigint;
    createdAt: bigint;
    email: string;
    repliedAt?: bigint;
    message: string;
    senderName: string;
    phone: string;
    reply?: string;
}
export interface LeadSubmission {
    id: bigint;
    name: string;
    createdAt: bigint;
    rewardCredited: boolean;
    email: string;
    serviceInterest: string;
    message: string;
    phone: string;
}
export interface CommissionLog {
    id: bigint;
    source: string;
    date: bigint;
    description: string;
    amount: bigint;
}
export interface Service {
    id: bigint;
    title: string;
    description: string;
    iconName: string;
    category: ServiceCategory;
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
export interface CustomerReview {
    id: bigint;
    createdAt: bigint;
    authorName: string;
    reviewText: string;
    approved: boolean;
    rating: bigint;
}
export interface Wallet {
    balance: bigint;
    totalEarned: bigint;
    referralCount: bigint;
    totalWithdrawn: bigint;
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
    approveReview(reviewId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(appointment: Appointment): Promise<bigint>;
    creditWallet(user: Principal, amount: bigint): Promise<void>;
    deleteNews(id: bigint): Promise<void>;
    deleteScheme(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllCommissionLogs(): Promise<Array<CommissionLog>>;
    getAllLeadSubmissions(): Promise<Array<LeadSubmission>>;
    getAllMessages(): Promise<Array<CustomerMessage>>;
    getAllNews(): Promise<Array<News>>;
    getAllReviews(): Promise<Array<CustomerReview>>;
    getAllSchemes(): Promise<Array<Scheme>>;
    getAllServices(): Promise<Array<Service>>;
    getAllWallets(): Promise<Array<Wallet>>;
    getAllWithdrawalRequests(): Promise<Array<WithdrawalRequest>>;
    getAppointment(id: bigint): Promise<Appointment>;
    getApprovedReviews(): Promise<Array<CustomerReview>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyWithdrawalRequests(): Promise<Array<WithdrawalRequest>>;
    getTotalCommission(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWallet(): Promise<Wallet>;
    getWithdrawalRequest(id: bigint): Promise<WithdrawalRequest>;
    isCallerAdmin(): Promise<boolean>;
    logCommission(amount: bigint, source: string, description: string): Promise<bigint>;
    markLeadRewarded(leadId: bigint): Promise<void>;
    recordServiceLinkClick(serviceKey: string): Promise<bigint>;
    registerReferral(code: string): Promise<void>;
    registerWithReferralCode(referralCode: string): Promise<void>;
    replyToMessage(messageId: bigint, replyText: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialData(): Promise<void>;
    submitLead(name: string, phone: string, email: string, serviceInterest: string, message: string): Promise<bigint>;
    submitMessage(senderName: string, phone: string, email: string, message: string): Promise<bigint>;
    submitReview(authorName: string, rating: bigint, reviewText: string): Promise<bigint>;
    submitWithdrawalRequest(amount: bigint, bankAccountNumber: string, ifscCode: string, accountHolderName: string): Promise<bigint>;
    updateAppointmentStatus(id: bigint, status: AppointmentStatus): Promise<void>;
    updateNews(id: bigint, newsItem: News): Promise<void>;
    updateScheme(id: bigint, scheme: Scheme): Promise<void>;
    updateService(id: bigint, service: Service): Promise<void>;
    updateWithdrawalRequest(id: bigint, status: WithdrawalStatus): Promise<void>;
}
