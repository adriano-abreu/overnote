'use client'

import { Dialog } from '@/components/ui/dialog'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Dialog>{children}</Dialog>
    </QueryClientProvider>
  )
}
