# Dev Club — Landing Page

Landing page da Dev Club (escola de tecnologia/design com IA ilimitada, cursos práticos e comunidade). Nome interno do pacote: `dev-club` (era `synapsex`, corrigido em auditoria — ver [docs/AUDIT.md](docs/AUDIT.md)).

Projeto isolado, não faz parte do ecossistema DGX/Digytron.

## Stack

- **Vite 5** + **React 18** + **TypeScript** (strict, `noUnusedLocals`/`noUnusedParameters` ligados)
- **TailwindCSS** (utility-first, sem design tokens customizados ainda — ver auditoria)
- **Framer Motion** para toda a animação (entrance, hover, scroll-reveal, spring)
- **Lucide React** para ícones (com uma exceção: ícone Apple via Bootstrap Icons CDN — ver auditoria)

## Rodando local

```bash
npm install
npm run dev      # http://localhost:5173 (ou porta configurada)
npm run build    # build de produção (tsc -b && vite build)
npm run preview  # preview do build
```

## Estrutura

```
src/
  App.tsx              # composição da página — só monta as seções, sem lógica
  main.tsx             # entrypoint React
  index.css            # fonts, reset, keyframe do marquee, classes .lenis (não usadas ainda)
  components/
    Navbar.tsx          # nav fixa — desktop com links diretos, mobile com hambúrguer colapsável
    SquashHamburger.tsx # ícone animado do hambúrguer (usado só no mobile)
    SynapseXLogo.tsx    # logo SVG (nome herdado do projeto anterior "SynapseX")
    ScrambleText.tsx    # efeito de scramble em hover (usado em nav links/botões)
    ScrambleIn.tsx       # efeito de scramble no load/entrance (usado no H1 do Hero)
    Hero.tsx             # seção hero — vídeo com head-tracking pelo mouse + watermark blur patch
    SocialProof.tsx      # badge de alunos + marquee de empresas
    AISection.tsx        # seção "IAs ilimitadas" + grid de tecnologias
    Benefits.tsx          # grid de benefícios + card "Framer Skills"
    Platform.tsx          # seção da plataforma de ensino (mockup estático)
    Projects.tsx           # grid de projetos práticos
    Testimonials.tsx       # depoimento + vídeo (mock, sem player real)
    Instructors.tsx        # carrossel horizontal de instrutores
    Certifications.tsx     # cards de certificado (MEC)
    Market.tsx              # gráfico de barras de salário BR x internacional
    Guarantee.tsx            # seção de garantia de 7 dias
    FAQ.tsx                  # accordion de perguntas frequentes
    Footer.tsx                # rodapé com links e selos
```

Cada seção é uma `<section>` independente e sem estado compartilhado — `App.tsx` só empilha os componentes. Não há roteamento, contexto global nem chamadas a API: é uma página estática de apresentação, ainda sem funcionalidade real nos CTAs (ver auditoria).

## Próximos passos

Redesenho de seções, animações e eventos — orientação detalhada a ser definida.
