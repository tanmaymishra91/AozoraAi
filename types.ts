
export enum Page {
  LANDING = 'Landing',
  MAIN = 'Main',
  ADMIN = 'Admin',
  CONTACT = 'Contact',
  CREDITS = 'Credits',
  LOGIN = 'Login',
  SIGNUP = 'SignUp',
}

export enum PaymentRequestStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export interface PaymentRequest {
  id: string;
  userId: string;
  userEmail: string;
  credits: number;
  amountPaid: number;
  utr: string;
  message?: string;
  status: PaymentRequestStatus;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
  currentCredits: number;
  dailyCreditLimit: number; // The number of credits the user gets each day.
  lastCreditReset: string; // ISO String
  isBanned: boolean;
  createdAt: string; // ISO String
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}