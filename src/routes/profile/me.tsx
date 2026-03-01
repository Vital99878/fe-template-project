import { createFileRoute } from '@tanstack/react-router'

import { ProfileMePage } from '@/pages/profile-me'

export const Route = createFileRoute('/profile/me')({
  component: ProfileMePage,
})
