import { notFound } from 'next/navigation'

export default function OldPagesRoute() {
  // This will show a 404 error for old /pages/ URLs
  notFound()
}
