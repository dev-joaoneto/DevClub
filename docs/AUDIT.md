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

# Redesenho — rodada 1 (Hero + SocialProof)

Não é auditoria de bug, é registro de decisão de design pra não perder o porquê depois.

## Pesquisa: cor de marca real da Dev Club

O verde usado no site inteiro (`#6ee7a0`, mint suave) veio de copiar a paleta da Asimov Academy (referência de estilo do briefing), não é a cor real da Dev Club. Confirmado visitando a loja oficial ([loja.devclub.com.br](https://loja.devclub.com.br)) e o merch ("DevClub New Green"): a marca usa um **verde-limão neon** (tipo chartreuse), bem mais vibrante, junto de preto/branco e tipografia condensada bold — estética mais "hype/gamer" que o mint premium/pastel que o site tem hoje. Não troquei a paleta ainda (aguardando decisão), só documentando o achado.

## Tipografia global

Trocado `Space Mono` (corpo) + `Anton SC` (watermark do Hero, removido) por **Bricolage Grotesque** (Google Fonts, eixo variável de peso 200-800 e optical size 12-96) como família única do site. Critério: nada de Inter, precisa ser "gestual" e ao mesmo tempo robusta/profissional — Bricolage foi desenhada pra ganhar curvas mais expressivas em tamanhos grandes (títulos) sem perder legibilidade no corpo, o que evita ter que gerenciar duas famílias. Aplicada via `index.css` (`--font-sans`) e `tailwind.config.js` (`fontFamily.sans`).

H2 de todas as 10 seções foi de `font-light` para `font-medium` (peso um degrau acima, mantendo a leveza geral do design). H3 não foi tocado.

## Hero

- Kicker "► Dev Club" acima do H1: removido.
- Watermark "Dev Club" atrás do robô (texto gigante em Anton SC): removido — o fundo agora é só o vídeo do robô.
- Adicionado um scrim (3 gradientes lineares sobrepostos: horizontal esquerda→direita, e vinhetas topo/base) pra garantir contraste do texto contra o vídeo sem esconder o robô — resolve o problema de legibilidade que a copy tinha antes.
- CTAs "Quero Fazer Parte" / "Soluções" viraram `AngledButton` (componente novo, canto cortado em diagonal via `clip-path`), como teste do estilo de botão que você mandou de referência (print verde de "Ver Rankings"/"Criar Conta Grátis"). Mantive as cores do design system atual (`#6ee7a0`), só testando a forma.

## SocialProof (2ª dobra)

Sem mexer em copy — só motion:
- Badge de avatares: stagger de entrada (spring, escalonado) em vez de aparecer tudo junto.
- Números "+30" e "+25" viraram `CountUp` (contagem de 0 até o valor, disparada quando entra na viewport).
- H2 ganhou entrada com blur→foco (`filter: blur()` animado), reforçando a leitura "cinematográfica" pedida pro Hero e estendida pra cá.
- Marquee de empresas: pausa no hover (`group-hover:[animation-play-state:paused]`) e cada nome de empresa ganhou hover individual (escala + cor verde), antes era 100% estático/decorativo.

## Nav

Removidos os links "About"/"Metrics" (ficavam presos atrás de interação extra sem necessidade). Nav ficou só Logo + Download, igual em desktop e mobile — o hambúrguer mobile também saiu junto (não sobrava nada pra ele revelar). `SquashHamburger.tsx` foi deletado por ficar sem uso.

# Redesenho — rodada 2 (trust badge do Hero → carrossel de patrocinadores)

Removido o bloco "Confiado por milhares de profissionais em 4.578 cargos diferentes" (avatares MR/AC/JS/LP + texto) do Hero. No lugar entrou `HeroSponsors.tsx`: um carrossel full-bleed, texto grande (26-40px), ícone de marca + nome, vivendo dentro do Hero (não mais na SocialProof).

**Os 9 patrocinadores finais** (lista fechada pelo Dyllan): Claude, ChatGPT, Grok, Kimi, Facebook, Instagram, WhatsApp, iFood, Uber.

## Ícones de marca

Instalado `simple-icons` (16.27.0) pra pegar os marks oficiais. Cobertura real:

| Marca | Fonte do ícone | Observação |
|---|---|---|
| Claude | `simple-icons` (siClaude) | mark oficial |
| Kimi | `simple-icons` (siKimi) | mark oficial |
| Facebook | `simple-icons` (siFacebook) | mark oficial |
| Instagram | `simple-icons` (siInstagram) | mark oficial |
| WhatsApp | `simple-icons` (siWhatsapp) | mark oficial |
| iFood | `simple-icons` (siIfood) | mark oficial |
| Uber | `simple-icons` (siUber) | é o wordmark "Uber" em si (a marca não tem símbolo isolado) — por isso não repito o nome do lado, só o SVG na altura do texto (ver bug abaixo) |
| ChatGPT | path do logomark clássico da OpenAI, de memória (não está mais no `simple-icons` — a OpenAI pediu remoção por política de marca) | **verificar contra o brand kit oficial antes de qualquer publicação real** |
| Grok | glifo genérico (`Sparkle` do lucide-react) | xAI/Grok não tem mark em nenhuma lib que eu confiasse; não fabriquei um logo falso |

## Bug pego e corrigido nessa rodada

`Uber` no `simple-icons` é o wordmark inteiro (as letras "Uber" já desenhadas como path), não um símbolo separado. Como o componente sempre pareava ícone + nome de texto, renderizou "Uber Uber" duplicado. Corrigido tratando Uber como caso especial: só o SVG (escalado pra altura do texto), sem o `<span>` de nome ao lado. Testado visualmente na marquee rodando — sem duplicação.

Testado: build limpo, typecheck limpo, sem overflow/corte no Hero em desktop nem mobile (812px de altura), hover pausa a marquee e troca pra verde (`#6ee7a0`), igual ao padrão já usado na marquee da SocialProof.
