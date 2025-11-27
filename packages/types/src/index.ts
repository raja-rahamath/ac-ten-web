// User & Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role?: string;
  isActive: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Service Request Types
export type RequestType = 'ON_CALL' | 'EMERGENCY' | 'AMC' | 'WARRANTY';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
export type RequestStatus =
  | 'NEW'
  | 'ASSIGNED'
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'ON_HOLD'
  | 'COMPLETED'
  | 'INVOICED'
  | 'CLOSED'
  | 'CANCELLED';

export interface ServiceRequest {
  id: string;
  requestNo: string;
  customerId: string;
  propertyId: string;
  assetId?: string;
  zoneId: string;
  complaintTypeId: string;
  requestType: RequestType;
  priority: Priority;
  status: RequestStatus;
  title: string;
  description?: string;
  customerNotes?: string;
  assignedToId?: string;
  slaDueAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Customer Types
export type CustomerType = 'INDIVIDUAL' | 'ORGANIZATION';

export interface Customer {
  id: string;
  customerNo: string;
  customerType: CustomerType;
  firstName?: string;
  lastName?: string;
  orgName?: string;
  email: string;
  phone?: string;
  isActive: boolean;
}

// Property Types
export interface Property {
  id: string;
  propertyNo: string;
  name: string;
  typeId: string;
  zoneId?: string;
  address?: string;
  building?: string;
  floor?: string;
  unit?: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
}

// Employee Types
export interface Employee {
  id: string;
  employeeNo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  isActive: boolean;
}

// Zone Types
export interface Zone {
  id: string;
  name: string;
  nameAr?: string;
  code?: string;
  headId?: string;
  isActive: boolean;
}

// Invoice Types
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED';

export interface Invoice {
  id: string;
  invoiceNo: string;
  serviceRequestId: string;
  customerId: string;
  status: InvoiceStatus;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  paidAmount: number;
  dueDate?: string;
  createdAt: string;
}

// i18n Types
export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';
