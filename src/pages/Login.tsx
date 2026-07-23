import { Link } from 'react-router-dom'

// Placeholder screen for the "/login" route — the real auth flow gets wired
// up later. This is here so the header's login button has a real
// destination today instead of a dead link.
export default function Login() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <img src="/devclub-logo.png" alt="Dev Club" className="h-7 w-auto" />
          <span className="text-[15px] font-medium text-white/80 tracking-tight">Dev Club</span>
        </Link>

        <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-8">
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
                className="mt-1.5 w-full h-11 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#6ee7a0]/50 transition-colors"
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
                className="mt-1.5 w-full h-11 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#6ee7a0]/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full h-11 rounded-full bg-[#6ee7a0] text-black text-[14px] font-semibold hover:brightness-110 transition"
            >
              Entrar
            </button>
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
