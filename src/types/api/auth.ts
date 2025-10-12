/**
 * Authentication related type definitions
 */

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
  username: string;
  expiresAt: string; // ISO date string from DateTime
}

export interface LoginResponse {
  data: LoginData;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  expiresAt: string | null;
}

export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Employee = 'Employee'
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended'
}

export interface UserProfileResponse {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  teamId?: string;
  department: string;
  jobTitle: string;
  dateHired?: string; // ISO date string
  dateOfBirth?: string; // ISO date string
  totalPoints: number;
  availablePoints: number;
  companyName: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}