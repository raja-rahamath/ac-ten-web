import { redirect } from 'next/navigation';

export default function PortalRegisterRedirect() {
  redirect(process.env.NEXT_PUBLIC_PORTAL_URL ? `${process.env.NEXT_PUBLIC_PORTAL_URL}/register` : 'http://localhost:3001/register');
}
