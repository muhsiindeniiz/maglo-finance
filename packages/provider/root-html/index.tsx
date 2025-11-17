import { ReactNode } from 'react'

interface RootHtmlProps {
  children: ReactNode
  lang?: string
}

export const RootHtml = ({ children, lang = 'en' }: RootHtmlProps) => {
  return (
    <html lang={lang} suppressHydrationWarning>
      {children}
    </html>
  )
}
