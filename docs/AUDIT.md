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

# Redesenho — rodada 3 (ajuste fino do carrossel + navbar vazia)

## Navbar

Removidos os dois elementos que sobravam: a pill "Dev Club" e o botão "Download" (Apple). `Navbar.tsx` agora renderiza um `<nav>` fixo vazio (mantém o slot pra quando definirem o que entra ali). `AppleLogo.tsx` foi deletado por ficar sem nenhum uso (só existia pro ícone do botão Download).

## Carrossel do Hero (`HeroSponsors`)

- **Pausa no hover removida**: antes o `group-hover:[animation-play-state:paused]` parava a marquee ao passar o mouse — tirado. Agora ela roda infinito, sem nenhuma interrupção por pointer. Testado via `getComputedStyle().animationPlayState` com cursor em cima: fica `running`.
- **Aspecto "rústico envelhecido"**: minha leitura do print de referência foi que não é logo craquelada/distressed, é textura de grão (grain) + o logo se misturando com o fundo escuro (baixo contraste), não um vetor flat e limpo. Implementei uma camada de ruído (`feTurbulence` via SVG data-URI, `mix-blend-mode: overlay`, opacidade 0.07) por cima da faixa inteira do carrossel — textura sutil, não destrutiva, não compromete legibilidade. Mantive os ícones/texto como já estavam (branco a 40% de opacidade, sobe pra verde no hover). Se a ideia era algo mais literal (bordas gastas, rachaduras no próprio logo), é um trabalho bem mais pesado por ícone — avisa que eu ajusto a intensidade ou troco de abordagem.

# Redesenho — rodada 4 (ajuste fino de ícones + transição Hero→SocialProof)

## Ícones do carrossel

- **Uber minúsculo**: medi o bounding box real do path via `getBBox()` no browser — o glifo do wordmark "Uber" só ocupa 8 de 24 unidades de altura do viewBox (33%), o resto é espaço vazio. Por isso, mesmo com a caixa do SVG no tamanho certo, o texto renderizava bem menor que os vizinhos. Corrigido recortando o `viewBox` pro bounding box real (`0 7.9 24 8.2`) e igualando a altura à dos textos ao lado (26/34/40px) — agora "Uber" tem o mesmo peso visual que "iFood", "WhatsApp" etc.
- **Kimi desalinhado**: mesmo método (`getBBox()`) — o ícone tem um pontinho pequeno no canto superior direito e o corpo principal (a seta) concentrado na metade inferior da caixa. Centralização geométrica (a que o flexbox faz por padrão) não bate com o centro visual/óptico do desenho, então o ícone "flutuava" acima da linha do texto. Apliquei um nudge de `translate-y-[3px] sm:translate-y-[4px]` só nesse ícone pra compensar.
- **Ícone genérico do Grok removido**: não tínhamos mark oficial (documentado na rodada 2), o fallback `Sparkle` do lucide ficava lá só pra preencher espaço e parecia um ícone de IA genérico sem sentido. Tirado — Grok agora é só o texto, igual seria se nenhum ícone fosse encontrado (comportamento generalizado: sem ícone confiável = sem ícone, não mais fallback).

## Transição Hero → SocialProof

Duas causas reais do "corte" percebido, corrigidas sem recorrer a blur:

1. **Descontinuidade de brilho na costura**: o scrim do Hero parava em 85% de opacidade preta no rodapé (`rgba(0,0,0,0.85)` no gradiente `0deg`), não 100% — sobrava uma fatia de vídeo/glow visível bem na linha onde a seção seguinte (preto sólido `#000`) começa. Subi pra `rgba(0,0,0,1)` logo nos primeiros 10% do gradiente, eliminando o salto de brilho no pixel exato da costura.
2. **Falta de continuidade atmosférica**: as duas seções eram tratadas como blocos isolados (Hero com vídeo+glow, SocialProof preto chapado). Adicionei um glow verde radial, bem sutil (opacity 0.2, blur 100px), posicionado dentro da `SocialProof` com `top` negativo — ele vaza visualmente por cima do fim do Hero (por isso removi o `overflow-hidden` da `section` da SocialProof, que era redundante já que a marquee interna tem o seu próprio). Isso cria uma "ponte" de luz ambiente entre as duas seções em vez de um corte seco, e ecoa o verde de destaque que já aparece em outras seções (Benefits, AISection, Certifications) — reforça que é uma linguagem visual do site, não um efeito isolado.

Testado desktop e mobile: sem linha visível na costura, glow sutil (não chamativo), build/typecheck limpos.

# Redesenho — rodada 5 (recomposição do Hero: altura, escala, blur nas pernas)

## Bloco de headline sobe pra altura do queixo

Antes o H1/subtexto/CTA e o carrossel viviam no mesmo fluxo flex (um `flex-1` empurrava tudo pro rodapé). Agora são dois blocos posicionados de forma independente, ambos `absolute` dentro da `section` do Hero:

- Headline (H1 + parágrafo + botões): `top-[26%]` no mobile, `top-[20%]` no desktop — foi calibrado visualmente contra o vídeo do robô, não é uma métrica exata do frame (não temos as coordenadas do queixo como temos do watermark), então pode precisar de ajuste fino se o enquadramento do vídeo mudar.
- Carrossel: `absolute inset-x-0 bottom-0`, colado na borda inferior da section — é literalmente a dobra com a `SocialProof`, sem padding residual entre os dois.

## Carrossel +25%

Ícones (24/32px → 30/40px), texto (26/34/40px → 33/43/50px), gaps entre ícone+texto e entre itens — tudo escalado em 25%. A duração da animação da marquee subiu de 38s pra 46s pra manter a velocidade percebida parecida (conteúdo ~25% mais largo, senão ela pareceria acelerar).

## "Container claro" — era o grain, virou blur

O `mix-blend-mode: overlay` do grain (rodada 3) criava um retângulo com luminância levemente diferente do resto do Hero — exatamente o "container claro" que você viu. Removido. No lugar entrou um `backdrop-blur-2xl` com fade vertical suave (`mask-image` topo/base), que borra o vídeo (e a perna do robô) atrás da faixa inteira do carrossel sem introduzir nenhuma borda visível — a diferença é que ele borra o que já está lá, não sobrepõe uma textura nova com brilho próprio.

Testado desktop e mobile: sem retângulo visível, pernas do robô borradas atrás do texto, textos legíveis, build/typecheck limpos.

# Redesenho — rodada 6 (Reader Soberano → Navbar)

Porte completo do header flutuante do DGX Visual Foundry (specimen `dgx-sovereign-armor--v1`) pro `Navbar.tsx`, a partir do handoff em [HEADER-HANDOFF.md](HEADER-HANDOFF.md) e leitura direta do código-fonte (`reader.css`/`reader.js`) em `~/Workspace/DGX-LABS/dgx-visual-foundry/specimens/dgx-sovereign-armor--v1/`.

## Decisões de adaptação (não é cópia 1:1)

- **Mega-menu de ecossistema removido.** O lab tinha dois painéis: nav-da-página e um grid 2×2 de "outras páginas do ecossistema" (Marketplace, CoreBR, Digytron OS, Digytron Account). O DevClub é uma landing single-page sem ecossistema de produtos — portar esse grid significaria inventar cards falsos linkando pra produtos de outra empresa dentro do site de um cliente. Consolidei pra **um único dropdown** (nav de seções desta página), usado tanto pela setinha ▾ (sempre visível) quanto — antes de eu perceber a duplicação — por um segundo botão que existia só pra mobile. Removi esse segundo botão: como os dois abriam o mesmo painel agora, ficavam duas setinhas idênticas lado a lado no mobile expandido. A setinha ▾ sozinha já cobre mobile e desktop, compacto e expandido.
- **Achado lendo o JS bruto, não só o handoff**: `openPeek()` existe no `reader.js` original mas **nunca é chamado** em lugar nenhum — o "peek por clique na pílula compacta" que o handoff descreve como comportamento ativo está morto no código-fonte atual (resíduo de quando existia hover-peek, removido numa versão anterior). Implementei o gatilho de verdade (clique no fundo vazio da pílula, fora dos botões/links) já que é claramente a intenção documentada tanto no handoff quanto nos comentários do próprio `reader.js`.
- **Cores**: troquei o azul metálico (`#16235c→#2a46c4`) pelo verde já usado no resto do DevClub (`#1f4736→#6ee7a0`, mesmo tom dos avatares do Hero) em vez do verde genérico que o handoff sugeriu (`#16a34a`) — mantém o CTA do header na mesma linguagem visual do resto da página. Texto do CTA foi pra preto (`#06170e`) em vez de branco, porque o meio do gradiente é um verde claro (`#6ee7a0`) e branco-sobre-claro teria contraste ruim — segue o mesmo padrão que o `AngledButton` (solid) já usa no Hero.
- **Logo**: `Logo.tsx` (SVG `currentColor`) no lugar do `<img>` do lab — o tilt 3D funciona igual porque aplica no elemento wrapper, não no SVG.
- **Links de seção**: reaproveitei só os `id`s que já existiam (`about`, `platform`, `metrics`, `certifications`, `guarantee` — 5 seções), com rótulos batendo com o conteúdo real (Comunidade, Plataforma, Mercado, Certificados, Garantia). Não criei `id` novo em nenhuma seção pra não expandir escopo sem necessidade.
- **CTA**: "Quero Fazer Parte ↗" apontando pra `#guarantee`, mesmo destino do CTA principal do Hero — consistência de funil.
- Adicionei `id="hero"` na section do Hero (não existia) pra o logo poder linkar de volta pro topo, igual ao lab.

## Arquitetura do porte

- `src/components/reader.css` — CSS praticamente 1:1 do original (mesmas transitions/timing functions/curvas), só cores trocadas e o mega-menu de ecossistema cortado. Comentário no topo aponta de volta pro handoff.
- `src/components/Navbar.tsx` — reimplementação em React/hooks de toda a lógica do `reader.js`: scroll listener (progresso + wake), `IntersectionObserver` pra seção ativa, dropdown com hover-intent (450ms grace) + click-to-pin + mensagem de trava/destrava, peek, fechar por clique-fora/Escape, tilt 3D + glint via manipulação direta de `style.setProperty` no `pointermove` (fora do ciclo de render do React, por performance — igual ao original).

## Bug pego durante o teste (não é do componente, é do dev server)

Cliques por coordenada de pixel erravam o alvo logo após o clique no ▾ — a pílula tem `transition: padding/gap .4s`, e medir a posição do botão e clicar são dois momentos diferentes; no meio do caminho o layout ainda está animando. Não é bug do componente, é uma pegadinha de teste (mudei pra clicar via `elemento.click()` direto, que não depende de coordenada). Separadamente, o servidor de dev desta sessão tem HMR historicamente instável (já visto em rodadas anteriores) — um hard reload resolveu um falso-negativo onde o clique no botão não abria o painel.

Testado desktop e mobile: estado compacto/expandido, seção ativa acendendo no scroll, dropdown abrindo/travando/destravando com mensagem, peek, fechar por clique-fora, tilt 3D, scroll suave até cada seção, build/typecheck limpos.

# Redesenho — rodada 7 (logo oficial, badge no header, limpeza da SocialProof)

## Logo oficial no header

Trocado o `Logo.tsx` (SVG geométrico genérico) pela logo real da Dev Club (`public/devclub-logo.png`, copiada de `~/Workspace/MARKETING/DevClub.png` — PNG 62×62 com alpha, o ícone verde pixelado que já tinha visto na loja oficial). Só o header mudou — `Logo.tsx` continua em uso no Footer e nos cards de certificado, não foi tocado. O tilt 3D da pílula funciona igual com `<img>` no lugar do `<svg>` (a transform aplica no wrapper `<a>`, não no conteúdo).

## Badge de confiança migrou pro header

"+30 mil alunos já passaram por aqui" (avatares + `CountUp`) saiu da `SocialProof` e virou um elemento próprio, fixo no canto superior direito, colado ("grudado") ao lado da pílula central — mesmo tratamento glass (`--reader-bg`, blur, stroke) pra ficar na família visual do Reader sem fazer parte da sua máquina de estado (não participa do dropdown/scroll/tilt). Escondido em mobile (`hidden sm:inline-flex`) — não cabia ao lado da pílula principal em telas pequenas sem colidir.

## SocialProof zerada

Removidos: H2 ("+25 mil alunos já passaram por aqui"), parágrafo ("Alunos nas maiores empresas..."), e a marquee de empresas (Facebook/Ambev/iFood/OAB/UFRJ/Brasil Paralelo/USP) — redundante agora que o carrossel de patrocinadores real vive no Hero. A seção `#about` fica só com o glow ambiente de transição (rodada 5), ~224px de vão vazio até a `AISection` começar. É um estado intermediário esperado — a seção ainda não tem o conteúdo novo definido.

CSS órfão limpo: `.marquee-track`/`@keyframes marquee` (30s) não tinha mais nenhum uso depois da marquee antiga sair — removido de `index.css` (ficou só `.hero-marquee-track`, que reaproveita o mesmo `@keyframes marquee`).

Testado desktop e mobile: logo nítida em 26-34px, badge só aparece ≥640px, tilt funcionando, build/typecheck limpos.

# Redesenho — rodada 8 (badge de confiança sai do header, vira estático no Hero)

O badge "+30 mil alunos já passaram por aqui" tinha ido pro header na rodada 7 como `position:fixed` — rolava junto com a página igual ao Reader. Não era essa a intenção: ele devia ficar preso ao Hero (bloco 1), estático no canto, saindo de cena ao rolar — só o Reader (nav central) é fixo de verdade.

Movido de `Navbar.tsx` pra dentro do `Hero.tsx`, como elemento `absolute` (não `fixed`) dentro da própria `<section id="hero">`. CSS `.reader-trust*` removido do `reader.css` — a implementação virou Tailwind direto no `Hero.tsx`, reaproveitando o `CountUp`.

Confirmado via `getComputedStyle`: o Reader continua `position:fixed` (`top:20` constante, não se move com o scroll); o badge é `position:absolute` (rolou pra `top:-826` depois de um scroll de ~800px — sai de cena junto com o resto do Hero, como pedido).

# Redesenho — rodada 9 (badge sai da linha do header, centraliza abaixo dos botões)

Ainda errado na rodada 8: mesmo já sendo `absolute` (não mais `fixed`), o badge continuava visualmente na mesma linha do header (`top-5`, canto direito) — o pedido real era centralizado no viewport, logo abaixo do bloco de CTAs.

Em vez de chutar um `top-[N%]` (frágil — a altura do H1+parágrafo+botões varia por breakpoint e quebra de linha), medi a posição real: `buttonsRef` no bloco de CTAs + `ResizeObserver` recalculando `buttons.getBoundingClientRect().bottom - section.getBoundingClientRect().top + 24px` a cada resize. O badge usa esse valor como `top` e `left-1/2 -translate-x-1/2` pra centralizar no viewport (mesmo eixo do Reader). Mesma técnica já usada no patch que esconde o watermark do vídeo — não inventei mecanismo novo.

Badge agora aparece em mobile e desktop (antes só ≥640px). Testado nos dois: aterrissa exatamente colado no botão "Soluções"/fileira de CTAs, centralizado, sem depender de porcentagem chutada. `position:absolute` confirmado (sai de cena com o Hero).

# Auditoria de continuidade — 2026-07-23

Sessão de retomada (não teve trabalho novo pedido além de auditar o estado atual). `git status` limpo, `main` sincronizada com `origin/main` no commit `0b16710`, nada pendente pra puxar (`git log HEAD..origin/main` vazio). `npm run build` fechou limpo (`tsc -b && vite build`, 0 erros, 1903 módulos). Console do browser sem erros em nenhuma rota.

Percorrida a página inteira (`/`) em desktop (800px) e mobile (375px, preset), mais a rota `/login` nos dois breakpoints. Nada quebrado encontrado — todo o estado descrito no handoff da sessão anterior bateu com o que está rodando:

- Navbar: nav completa (Formação/Plataforma/Certificados/Mercado/Garantia) com scroll-spy funcionando (o item da seção ativa acende), "Área do Aluno" com ícone linkando pra `/login`, CTA "Quero Ser Aluno ↗" real.
- Hero: text-scramble de entrada no H1 resolve corretamente pra "Tudo o que você precisa de IA, em um só lugar" (peguei um frame no meio do scramble no primeiro screenshot e achei que fosse bug — não é, é intencional, confirmado no frame seguinte). Botões pílula, carrossel de patrocinadores rodando (Claude/ChatGPT/Grok/Kimi/Facebook/Instagram...).
- AISection: carrossel de trilhas com autoplay, 8 slides (Front-End, Back-End, Full Stack, Mobile, Claude & Claude Code, N8N, Análise de Dados, Power BI) — confirmado nos dois breakpoints.
- BeyondCode/Instructors: carrossel de cards (07 slides) navegando via setas, fotos e copy carregando certo.
- Platform/Projects: mockups de tela e screenshots de sites reais rolando sem overflow.
- Market: cargos "Desenvolvedor Full Stack" (Júnior/Pleno/Sênior) com barras Brasil vs Internacional, nota de rodapé "pesquisas salariais 2026".
- Guarantee: card único, "E se eu não curtir?" sai no hover (desktop) e já vem expandido por padrão no mobile (sem hover) — comportamento responsivo correto.
- FAQ: botão "Falar com o suporte (WhatsApp)" com brilho, copy real.
- Footer: colunas de links reais, redes sociais, copyright "© 2026 Dev Club" centralizado, wordmark gigante com reveal sticky+absolute funcionando (travou no fim do documento, sem jitter).
- `/login`: card com glow radial verde, form e-mail/senha, botão "Entrar" pílula — igual nos dois breakpoints.

**Observação, não é bug**: a copy de dois blocos ainda usa a palavra "Comunidade" num sentido genérico ("A Maior e Melhor Comunidade de Profissionais de Tecnologia do Brasil" no card 06/07 do BeyondCode/Instructors, e "dentro da nossa Comunidade" no heading da seção de Testimonials) — diferente do rótulo de nav que já foi migrado pra "Formação". Não mexi porque pode ser intencional (a seção descreve a comunidade de alunos como conceito, não a antiga aba de navegação) — só sinalizando caso a migração de copy deva alcançar esses dois pontos também.

Nenhuma mudança de código feita nesta sessão — só build, exploração visual e este registro.

## Fix — robô do Hero sumindo no mobile (dispositivo real)

Reportado pelo usuário: o robô do vídeo de fundo do Hero não aparece no celular real dele. Não reproduziu no emulador de viewport mobile deste ambiente (Chromium sempre renderizou o frame certo, `readyState:4`, `currentTime:6.2`) — o que aponta pra uma diferença de engine, não de layout/CSS.

Causa provável: [Hero.tsx](../src/components/Hero.tsx) usa o vídeo **sempre pausado**, controlado só por `video.currentTime` (o cabeçalho do robô "segue" o mouse trocando o timestamp via seek, sem nunca dar `play()`). Safari mobile (e alguns WebViews Android) têm um comportamento conhecido: um `<video>` que carrega metadata e é só seekado, nunca de fato tocado, pode nunca disparar o primeiro paint do frame decodificado — o pipeline de decodificação só liga de verdade quando a reprodução começa. Resultado: `readyState`/`currentTime` reportam certo via JS, mas a tela fica preta/vazia.

**Correção**: `onLoadedMetadata` agora dá um `video.play()` de verdade (permitido porque já é `muted` + `playsInline`) e só then/catch pausa e aterrissa em `T_CENTER` — isso força o decodificador a pintar pelo menos um frame antes de travar no repouso. Adicionado também `autoPlay` declarativo no `<video>` como reforço (não muda o comportamento em desktop, ajuda engines que só relaxam a política de autoplay quando o atributo está presente desde o markup).

Testado neste ambiente (só reproduz em Chromium): build limpo, robô aparecendo igual em desktop e no emulador mobile antes e depois do fix, head-tracking do mouse continua funcionando, sem flash perceptível do play/pause instantâneo. **Não foi possível confirmar em Safari/Android real** — se o problema persistir no celular do usuário depois deste fix, o próximo suspeito é a política de dados móveis/economia de bateria do dispositivo bloqueando o `preload="auto"` (nesse caso o vídeo nunca carrega, não é só questão de não pintar o frame).
