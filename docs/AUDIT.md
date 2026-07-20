# Auditoria de código — 2026-07-19

Primeira passada no repositório recém-clonado: leitura de todos os arquivos em `src/`, checagem de `tsc --noEmit` e `npm run build`, verificação visual em desktop e mobile.

Build e typecheck fecham limpos (0 erros) antes e depois das correções abaixo.

## Corrigido — rodada 1

| Onde | Problema | Correção |
|---|---|---|
| [src/components/Navbar.tsx](../src/components/Navbar.tsx) | No desktop, os links "About"/"Metrics" ficavam escondidos atrás de um botão hambúrguer colapsável — comportamento correto só faz sentido no mobile (viewport estreita). | Desktop agora mostra os links direto na pill ao lado do logo, sem hambúrguer nem estado de toggle (`menuOpen` removido). Mobile mantido intacto — verificado visualmente que o toggle mobile continua funcionando. |
| [index.html](../index.html) | `<html lang="en">` com todo o conteúdo da página em pt-BR — afeta leitores de tela e SEO. | Trocado para `lang="pt-BR"`. |
| [package.json](../package.json) | `"name": "synapsex"` — nome herdado de um projeto anterior, não bate com a identidade "Dev Club" em lugar nenhum do conteúdo visível. | Renomeado para `"dev-club"`. Não afeta build/runtime, só identidade do pacote. |

## Corrigido — rodada 2

| Onde | Problema | Correção |
|---|---|---|
| [src/components/Navbar.tsx](../src/components/Navbar.tsx), [SocialProof.tsx](../src/components/SocialProof.tsx), [Market.tsx](../src/components/Market.tsx) | "About"/"Metrics" rolavam para `1×`/`2×` a altura da janela (`scrollToSection`), não para uma seção real — só a Hero tem `h-screen` garantido, então o scroll não aterrissava no lugar certo. | Criado [src/lib/scrollTo.ts](../src/lib/scrollTo.ts) (`scrollToId`, via `scrollIntoView`). `id="about"` foi para `SocialProof` (primeiro bloco institucional/prova social pós-Hero) e `id="metrics"` para `Market` (única seção com dado numérico — gráfico de salário). Ambas as seções ganharam `scroll-mt-20` para compensar a navbar fixa (80px). Testado: os dois links aterrissam exatamente 80px abaixo do topo. |
| [Hero.tsx](../src/components/Hero.tsx), [AISection.tsx](../src/components/AISection.tsx), [Benefits.tsx](../src/components/Benefits.tsx) | CTAs "Quero Fazer Parte", "Soluções" e "Conhecer curso" não tinham `onClick` — botões inertes. | Conectados via `scrollToId`: "Quero Fazer Parte" (Hero + AISection) → `#guarantee`; "Soluções" (Hero) → `#platform`; "Conhecer curso" (Benefits) → `#certifications`. `id` + `scroll-mt-20` adicionados em [Platform.tsx](../src/components/Platform.tsx), [Guarantee.tsx](../src/components/Guarantee.tsx) e [Certifications.tsx](../src/components/Certifications.tsx). São âncoras internas (não existe checkout/página de curso real ainda) — só resolve o "botão morto", não substitui o funil real quando ele existir. |
| [src/index.css](../src/index.css), [Navbar.tsx](../src/components/Navbar.tsx) | CDN inteiro do Bootstrap Icons carregado só pelo ícone Apple do botão Download, com `lucide-react` já instalado. `lucide-react` só tem o ícone de fruta "Apple", não a marca — trocar por ele ficaria visualmente errado num botão de download. | Criado [src/components/AppleLogo.tsx](../src/components/AppleLogo.tsx) (SVG inline da marca). Import do Bootstrap Icons removido do `index.css`. Zero dependência externa nova. |
| [src/index.css](../src/index.css) | Classes `.lenis*` mortas — CSS para a lib de smooth-scroll Lenis, que não está instalada em nenhum lugar do `package.json`. | Removidas. Se entrar smooth-scroll de verdade no redesenho, o CSS volta junto com a lib. |
| `SynapseXLogo.tsx` | Nome do componente era resquício de um projeto anterior ("SynapseX"), sem relação com "Dev Club". | Renomeado para [Logo.tsx](../src/components/Logo.tsx) (`Logo`), com os 3 usos atualizados (`Navbar`, `Footer`, `Certifications`). O SVG em si (4 quadrantes) não mudou — é só identidade de nome, redesenho do ícone fica pro redesenho visual. |

## Ainda pendente — precisa de dado real, não é código

Não fabriquei essas informações porque errar aqui é pior do que deixar em aberto (link errado passa credibilidade pior que nenhum link):

- **"Falar com o suporte (WhatsApp)"** ([FAQ.tsx](../src/components/FAQ.tsx)): falta o número real de WhatsApp da DevClub pra virar um link `wa.me/...` de verdade.
- **Ícones sociais do Footer** (Instagram/YouTube/LinkedIn, [Footer.tsx](../src/components/Footer.tsx)): `href="#"` — falta confirmar os handles oficiais da marca (achei o Instagram pessoal do Rodolfo Mori na pesquisa, mas não é necessariamente a conta oficial da DevClub).

Me manda os dois quando tiver e eu conecto.

## Estrutura — decomposição

Nenhum arquivo está grande o suficiente hoje pra justificar quebrar (`Hero.tsx` é o maior, ~250 linhas, mas é coeso — video head-tracking, watermark patch e o JSX de conteúdo são as três responsabilidades e cada uma já está isolada em seu próprio `useEffect`). Se `Hero.tsx` crescer mais no redesenho, os dois `useEffect` de tracking/watermark são candidatos naturais a virar hooks próprios (`useHeadTrackingVideo`, `useWatermarkPatch`).

Resto dos componentes são seções isoladas, sem estado compartilhado, cada um com uma responsabilidade única — não há necessidade de decompor agora.
