import { redirect } from 'next/navigation';

export default function PortalRedirect() {
  // In production, this would redirect to the customer portal subdomain
  // For development, redirect to localhost:3001
  redirect(process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3001');
}
