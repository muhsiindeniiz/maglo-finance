import { FC, PropsWithChildren } from 'react'

type AuthLayoutProps = PropsWithChildren

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className="min-h-screen">{children}</div>
}

export default AuthLayout
