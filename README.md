# Dev Club — Landing Page

Landing page da Dev Club (escola de tecnologia que une trilhas práticas de programação, comunidade e as principais IAs do mercado em uma única assinatura). Nome interno do pacote: `dev-club`.


## Stack

- **Vite 5** + **React 18** + **TypeScript** (strict, `noUnusedLocals`/`noUnusedParameters` ligados)
- **React Router 7** — duas rotas: `/` (landing) e `/login` (placeholder de área do aluno, sem backend)
- **TailwindCSS** (utility-first) + um CSS dedicado (`reader.css`) pro header, portado de fora do Tailwind por fidelidade às transições originais
- **Framer Motion** para animação de seções (entrance, hover, scroll-reveal, spring, count-up) — o header usa CSS puro + hooks React
- **Lucide React** para ícones de UI + SVGs de marca inline (paths copiados do `simple-icons`, não a dependência em si — zero pacote de ícone externo no bundle)
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
  App.tsx                # só monta <BrowserRouter><Routes> — "/" e "/login"
  main.tsx                # entrypoint React
  index.css               # font import, reset, scrollbar, keyframe do marquee, classes .btn-sheen/.cta-sheen
  pages/
    LandingPage.tsx          # composição da página inteira — empilha as seções, sem lógica própria
    Login.tsx                 # área do aluno (e-mail/senha, sem backend real ainda)
  lib/
    scrollTo.ts               # scrollToId — scroll suave para uma seção por id
    sponsorIcons.ts           # paths SVG das marcas do carrossel do Hero (Claude/ChatGPT/Kimi/Facebook/...)
  components/
    Navbar.tsx              # "Reader" — pílula flutuante fixa, compacto↔expandido no scroll,
                             #   dropdown de seções (hover-intent + click-to-pin), tilt 3D na logo.
                             #   Portado do DGX Visual Foundry — ver docs/AUDIT.md "rodada 6"
    reader.css                # CSS do Navbar/Reader (fora do Tailwind, transições/curvas do original)
    AngledButton.tsx           # botão pílula (variant solid/outline), usado como CTA em várias seções
    CountUp.tsx                 # contador animado (0 até N) disparado por scroll-into-view
    ScrambleIn.tsx               # efeito de scramble no load/entrance (usado no H1 do Hero)
    Hero.tsx                     # vídeo do robô com head-tracking pelo mouse (cache de frames em
                                  #   canvas, sem seek ao vivo — ver docs/AUDIT.md), scrim cinematográfico,
                                  #   logo + wordmark acima do H1, CTAs
    HeroSponsors.tsx              # carrossel de patrocinadores, flush no rodapé do Hero
    AISection.tsx                  # "Escolha sua trilha" — carrossel de tecnologias (id="about")
    Benefits.tsx                    # "Aprenda a dominar as PRINCIPAIS IAs" + card "Sem Enrolação"
    BeyondCode.tsx                    # "Além do Código" — scroll-driven slide deck de benefícios extras
    Platform.tsx                      # carrossel da plataforma de ensino (mockups reais) (id="platform")
    Projects.tsx                       # três colunas de projetos práticos com parallax leve
    Testimonials.tsx                    # carrossel de depoimentos de alunos (arrastável)
    Instructors.tsx                      # carrossel horizontal de instrutores
    Certifications.tsx                    # cards de certificado por trilha (id="certifications")
    Market.tsx                             # gráfico de barras de salário BR x internacional (id="metrics")
    Guarantee.tsx                           # garantia de 7 dias, card com reveal no hover (id="guarantee")
    FAQ.tsx                                  # accordion de perguntas frequentes (id="faq")
    Footer.tsx                                # rodapé com links reais, redes sociais, wordmark gigante
                                                #   com reveal sticky+absolute no scroll
```

Cada seção é uma `<section>` independente e sem estado compartilhado — `LandingPage.tsx` só empilha os componentes. Não há chamadas a API nem contexto global: é uma página estática de apresentação, mais a rota `/login` como placeholder de formulário.

## Histórico de decisões

Todo o histórico de auditorias, correções de bug e decisões de redesenho (rodada por rodada, incluindo o porte do header e o motivo de o head-tracking do Hero usar um cache de frames em canvas em vez de seek de vídeo ao vivo) está em [docs/AUDIT.md](docs/AUDIT.md) — é o changelog vivo do projeto, atualizado a cada sessão.

[docs/HEADER-HANDOFF.md](docs/HEADER-HANDOFF.md) é o relatório original de replicação do header (Navbar/"Reader"), mantido como referência histórica da rodada 6.

