# Dev Club — Landing Page

Landing page da Dev Club (escola de tecnologia/design com IA ilimitada, cursos práticos e comunidade). Nome interno do pacote: `dev-club`.

Projeto isolado, não faz parte do ecossistema DGX/Digytron.

## Stack

- **Vite 5** + **React 18** + **TypeScript** (strict, `noUnusedLocals`/`noUnusedParameters` ligados)
- **TailwindCSS** (utility-first) + um CSS dedicado (`reader.css`) pro header, portado de fora do Tailwind por fidelidade às transições originais
- **Framer Motion** para animação de seções (entrance, hover, scroll-reveal, spring, count-up) — o header usa CSS puro + hooks React, ver abaixo
- **Lucide React** para ícones + SVGs de marca inline (`Logo`, ícones do carrossel de patrocinadores via `simple-icons`) — zero dependência de CDN de ícone
- Tipografia global: **Bricolage Grotesque** (Google Fonts, variable weight 200-800)

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
  index.css            # font import, reset, keyframe do marquee
  lib/
    scrollTo.ts          # scrollToId — scroll suave para uma seção por id
    sponsorIcons.ts       # paths SVG dos ícones de marca do carrossel do Hero (simple-icons)
  components/
    Navbar.tsx          # "Reader" — pílula flutuante fixa, compacto↔expandido no scroll,
                         #   dropdown de seções (hover-intent + click-to-pin), tilt 3D na logo.
                         #   Portado do DGX Visual Foundry — ver docs/AUDIT.md "rodada 6"
    reader.css            # CSS do Navbar/Reader (fora do Tailwind, transições/curvas do original)
    Logo.tsx             # logo SVG da Dev Club (4 quadrantes)
    AngledButton.tsx       # botão com corte diagonal no canto (variant solid/outline)
    CountUp.tsx             # contador animado (0 até N) disparado por scroll-into-view
    ScrambleText.tsx    # efeito de scramble em hover
    ScrambleIn.tsx       # efeito de scramble no load/entrance (usado no H1 do Hero)
    Hero.tsx             # vídeo com head-tracking pelo mouse + scrim cinematográfico + CTAs
    HeroSponsors.tsx      # carrossel de patrocinadores (Claude/ChatGPT/Grok/Kimi/Facebook/
                           #   Instagram/WhatsApp/iFood/Uber), flush no rodapé do Hero, blur
                           #   atrás pra esconder a perna do robô
    SocialProof.tsx      # badge de alunos (stagger + count-up) + marquee de empresas
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

Cada seção é uma `<section>` independente e sem estado compartilhado — `App.tsx` só empilha os componentes. Não há roteamento, contexto global nem chamadas a API: é uma página estática de apresentação. CTAs de conversão real (WhatsApp, redes sociais) seguem pendentes de dado real — ver [docs/AUDIT.md](docs/AUDIT.md).

## Redesenho em andamento

Trabalho por seção, sem mexer em copy por enquanto — histórico completo por rodada em [docs/AUDIT.md](docs/AUDIT.md):

1. ✅ Hero — kicker/watermark removidos, scrim cinematográfico, tipografia nova, headline na altura do queixo, `AngledButton`
2. ✅ SocialProof (2ª dobra) — animação de badge/contador/marquee, transição suave com o Hero
3. ✅ Header — pílula flutuante "Reader" (portado do DGX Visual Foundry)
4. ⏳ AISection (3ª dobra) — próxima, por etapas

Cor de marca real da Dev Club pesquisada: verde-limão neon (loja oficial), diferente do mint suave (`#6ee7a0`) usado hoje — aguardando decisão sobre trocar a paleta.
