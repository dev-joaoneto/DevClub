import { Link } from 'react-router-dom'
import AngledButton from '../components/AngledButton'

export default function Login() {
  return (
    // 1. Removi o "bg-black" daqui para não esconder o fundo!
    <div className="relative min-h-screen text-white flex items-center justify-center px-6 py-16 overflow-hidden">
      
      {/* 2. O BACKGROUND DA LOGO: 
          Tirei o -z-10 e usei apenas absolute. Ele fica no fundo naturalmente. */}
      <div className="absolute inset-0 w-full h-full pointer-events-none [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#22c55e_100%)]"></div>

      {/* 3. O FORMULÁRIO: 
          Colocamos "relative z-10" para garantir que ele fique NA FRENTE da luz verde */}
      <div className="w-full max-w-sm relative z-10">
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <img src="/devclub-logo.png" alt="Dev Club" className="h-7 w-auto" />
          <span className="text-[15px] font-medium text-white/80 tracking-tight">Dev Club</span>
        </Link>

        {/* Adicionei 'backdrop-blur-md' e 'bg-black/40' para o form ficar legível em cima da luz */}
        <div className="border border-white/10 bg-black/40 rounded-2xl p-8 backdrop-blur-md">
          <h1 className="text-white text-[22px] font-medium tracking-[-0.02em]">Área do aluno</h1>
          <p className="mt-2 text-white/40 text-[13px]">Entre com seus dados para acessar a plataforma.</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="text-white/60 text-[12.5px]">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                className="mt-1.5 w-full h-11 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#22c55e]/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white/60 text-[12.5px]">
                Senha
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-1.5 w-full h-11 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#22c55e]/50 transition-colors"
              />
            </div>
            <AngledButton type="submit" className="mt-2 w-full justify-center">
              Entrar
            </AngledButton>
          </form>
        </div>

        <p className="mt-6 text-center text-white/30 text-[12.5px]">
          <Link to="/" className="hover:text-white/60 transition-colors">
            ← Voltar para o site
          </Link>
        </p>
      </div>
    </div>
  )
}