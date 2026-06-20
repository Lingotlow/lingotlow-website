export interface User {
  email: string;
  role: string;
}

export interface Tenant {
  id: string;
  tenantKey: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Endpoint {
  id: string;
  name: string;
  url: string;
  retryCount: number;
  timeoutMs: number;
  active: boolean;
  status: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  requestId: string;
  documentId: string;
  type: string;
  status: string;
  retryCount: number;
  createdAt: string;
  receivedAt?: string;
  deliveredAt?: string;
}

export interface ApiKey {
  id: string;
  prefix: string;
  createdAt: string;
  lastUsedAt?: string;
}
