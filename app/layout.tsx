import { FC, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { RootBody } from '@/packages/provider/root-body'
import { RootHtml } from '@/packages/provider/root-html'
import { RootTheme } from '@/packages/provider/root-theme'
import { QueryProvider } from '@/packages/provider/query-provider'
import './globals.css'

type LayoutProps = PropsWithChildren

const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <RootHtml>
      <RootBody>
        <RootTheme>
          <QueryProvider>
            {children}
            <Toaster position="top-right" richColors />
          </QueryProvider>
        </RootTheme>
      </RootBody>
    </RootHtml>
  )
}

export const metadata: Metadata = {
  title: 'Maglo - Financial Tracking Platform',
  description: 'Track your finances, manage your budget, and achieve your financial goals.',
}

export default RootLayout
