import { ProvedorEstadoGlobal } from './contexts/EstadoGlobal'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProvedorEstadoGlobal>{children}</ProvedorEstadoGlobal>
  )
}
