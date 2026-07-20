# HANDOFF — Header flutuante (Reader Soberano) → DevClub Navbar

> Relatório de replicação. Escrito por uma sessão Claude que estava explorando o
> `dgx-visual-foundry` (laboratório visual DGX) a pedido do Dyllan. Objetivo: outra
> sessão Claude reconstrói **apenas o header** (pílula flutuante, modo compacto e
> expandido) dentro do `DevClub`, com cor do botão em **verde** e **logo diferente**
> (já existe: `src/components/Logo.tsx`).

## Fonte original (ler direto se precisar do código-fonte completo)

Specimen: `~/Workspace/DGX-LABS/dgx-visual-foundry/specimens/dgx-sovereign-armor--v1/`

- `index.html:53-100` — markup do header (`<header class="reader" data-reader>`)
- `reader.css` (311 linhas) — todo o CSS do componente
- `reader.js` (238 linhas) — todo o comportamento
- `NOTES.md` — histórico de decisões de design (útil pra entender o "porquê", não só o "o quê")

O componente se chama internamente **"Reader Soberano"** no lab (é o header/nav
sticky da página, não um leitor de conteúdo — nome interno, não usar no DevClub).

## Anatomia (DOM)

Uma única pílula `fixed` no topo, centralizada, contendo nesta ordem:

1. **Logo** — `<a href="#hero">` (link pro topo/hero) envolvendo um `<img>` (34px no boot, encolhe pra 26px quando expandido)
2. **Botão seta ▾ (mega-menu)** — sempre visível, abre um painel com grade 2×2 de "outras páginas/produtos"
3. **Nav inline** — links das seções da própria página; **escondido no modo compacto**, aparece no expandido; o link da seção atual acende (cor de destaque)
4. **CTA** (botão principal, pílula) — sempre visível, texto + `↗`, gradiente + glint animado
5. **Botão dropdown (só mobile)** — substitui a nav inline em telas ≤640px
6. Dois painéis popover (fora da pílula, não clipados): nav-da-página e mega-menu-de-páginas
7. Uma hairline de progresso de scroll, encostada embaixo da pílula (só aparece no modo expandido)

## Estados

| Estado | Classe | Quando | Aparência |
|---|---|---|---|
| **Compacto (boot)** | nenhuma (`.reader` sem modificador) | scroll no topo (y ≤ 60) | logo grande (34px) + seta ▾ + CTA. Nav e progress **escondidos** (`max-width:0; opacity:0`) |
| **Expandido (lendo)** | `.is-reading` | `window.scrollY > 60` | logo encolhe (26px), nav inline abre (`max-width:640px`), progress bar aparece e anima com `%` do scroll |
| **Peek** | `.is-peek` | click na pílula enquanto ainda compacto | abre a nav igual ao `.is-reading` só visualmente, mas **não fixa** — sai sozinho se o mouse/touch clicar fora (e o scroll sempre assume prioridade) |
| **Mobile (≤640px)** | media query | viewport ≤640px | nav inline vira `display:none`; nasce o botão de dropdown com o mesmo conteúdo em popover |

Regra importante do lab: **o header nunca se esconde** (não tem hide-on-scroll-down). Único estado é mínimo↔desperto.

## Comportamento (reader.js)

- **Scroll listener** (`passive:true`): calcula `%` de progresso (`scrollY / (scrollHeight - innerHeight)`), seta a largura da barra, e alterna `.is-reading` quando `scrollY > 60`. Ao entrar em `is-reading`, remove `.is-peek` (scroll sempre vence).
- **Seção atual**: `IntersectionObserver` com `rootMargin: '-30% 0px -55% 0px'` observando `section[id]`; quando uma entra na faixa, marca `.is-current` no link correspondente (nav inline e popover).
- **Dois dropdowns independentes** (nav-da-página e mega-menu), cada um com a mesma máquina de estado (`createDropdown` em `reader.js:67-134`):
  - **Hover-intent** (mouse fino): passar o pointer no botão abre sem fixar; sair agenda fechar em **450ms** (grace period, cancela se voltar o mouse antes disso).
  - **Click**: fixa (`pinned=true`) e mostra uma mensagem textual tipo "Navegação travada" (sem timer enquanto travado); clicar de novo destrava e mostra "destravada" por 1.4s.
  - **Mutuamente exclusivos**: abrir um fecha o outro automaticamente.
  - **Fecha com**: `Escape`, clique fora da pílula/painel, ou (se não travado) o mouse saindo.
  - Nunca deixa a mensagem de trava "órfã" — sempre limpa ao fechar por qualquer caminho.
- **Peek**: clique na pílula compacta abre a nav sem fixar (`.is-peek`); fecha ao clicar fora (se ainda não estiver em `.is-reading`).
- **Scroll suave confinado**: usa `window.scrollTo({top, behavior:'smooth'})` com offset de `-84px` (folga do header fixed) em vez de `el.scrollIntoView()` — isso evita que o scroll vaze pra ancestrais (relevante se o header algum dia rodar dentro de iframe; no DevClub puro isso não é problema, mas é uma boa prática manter).
- **Tilt 3D + glint na logo**: só ativa se `pointer:fine` e sem `prefers-reduced-motion`. `pointermove` na pílula calcula ângulo relativo do mouse e aplica `rotateX/rotateY` na logo (±18°) via CSS custom properties, mais um glint radial que segue o mouse (`--mx`/`--my`). Reseta ao sair.
- **Motion reduzido**: todo mundo respeita `data-motion="reduced"` (via `matchMedia('(prefers-reduced-motion: reduce)')` ou querystring `?motion=reduced`) — zera durações de transição/animação globalmente.

## Tokens visuais (reader.css) — o que trocar para o DevClub

```css
--reader-bg: rgba(13,15,20,.60);        /* fundo glass da pílula — manter (preto DevClub já combina) */
--reader-pop-bg: rgba(13,15,20,.90);    /* fundo dos popovers */
--reader-stroke: rgba(255,255,255,.18); /* borda glass */
--reader-highlight: rgba(255,255,255,.09);
--reader-fg: rgba(240,243,246,.92);     /* texto */
--reader-fg-dim: rgba(240,243,246,.72); /* texto secundário/links */
--reader-accent: #8ab4ff;               /* AZUL — cor de "link atual" e focus ring → TROCAR por verde */
--reader-pearl-a/b/c: metálico da barra de progresso — pode manter ou trocar por tom verde-metálico
```

**CTA (`.reader-cta`, `reader.css:133-152`)** é o botão que precisa virar verde:
```css
background: linear-gradient(135deg, #16235c 0%, #2a46c4 52%, #16235c 100%);
box-shadow: inset 0 1px 0 rgba(170,200,255,.38), inset 0 -1px 0 rgba(0,0,16,.42),
            0 8px 22px rgba(24,48,170,.45);
```
Sugestão de equivalente verde (mesma estrutura tonal: escuro→vibrante→escuro):
```css
background: linear-gradient(135deg, #0d3d24 0%, #16a34a 52%, #0d3d24 100%);
box-shadow: inset 0 1px 0 rgba(170,255,200,.38), inset 0 -1px 0 rgba(0,16,0,.42),
            0 8px 22px rgba(22,163,74,.45);
```
E o glint (`::after`) que varre no hover troca `rgba(205,224,255,.36)` (tom azulado) por algo tipo `rgba(200,255,220,.36)`.

`--reader-accent` (usado no link ativo da nav e nos `focus-visible` outlines) também deveria virar verde para consistência — ex. `#4ade80` ou o verde de marca que o Dyllan escolher.

**Timing functions** (usar como estão, são só curvas, não têm cor):
```css
--spring: cubic-bezier(.34,1.56,.64,1);   /* usada nos popovers (entrada com "boing") */
--ease: cubic-bezier(.2,.8,.2,1);
--ease-out: cubic-bezier(.16,1,.3,1);     /* usada no sheen do CTA */
```

## Responsivo

```css
@media (max-width:640px){
  .reader-pill{ gap:8px; padding:8px 10px; max-width:calc(100vw - 24px); }
  .reader-nav{ display:none; }         /* nav inline cede ao dropdown */
  .reader-drop{ display:grid; }        /* botão de capítulos aparece */
  .reader-cta{ padding:7px 12px; font-size:12px; }
}
```

## Acessibilidade já implementada (manter)

- `aria-expanded` nos botões de dropdown, sincronizado com o estado real
- `aria-controls` apontando pro painel
- `aria-live="polite"` na mensagem de trava/destrava
- `focus-visible` com outline de 2px na cor de destaque em todos os elementos interativos
- `Escape` fecha tudo; foco vai pro primeiro item do painel ao fixar (pin) via click

## Notas de adaptação pro DevClub (React + Tailwind + Framer Motion)

- **`src/components/Navbar.tsx` hoje é um shell vazio** (só o `<motion.nav>` com fade-in, sem conteúdo — `entranceComplete` já controla a entrada). É o lugar natural pra reconstruir este header.
- **Logo**: já existe `src/components/Logo.tsx` (SVG geométrico, `currentColor`, 4 quadrantes rotacionados) — usar no lugar do `<img>` webp do lab. Como é `currentColor`, o tilt 3D funciona igual (aplica no wrapper `<a>`/`<div>`, não no SVG em si).
- **Cor verde**: `tailwind.config.js` ainda não tem paleta de acento definida (só fontFamily customizada) — vale adicionar um `colors.brand` ou similar antes de portar o CTA, em vez de hardcodar hex nas classes.
- **Âncoras de seção**: hoje só *algumas* sections do DevClub têm `id` (`about`, `platform`, `metrics`, `certifications`, `guarantee` — conferir `src/components/*.tsx`). `Hero`, `AISection`, `Benefits`, `Projects`, `Testimonials`, `Instructors`, `FAQ`, `Footer` **não têm id ainda** — precisa adicionar antes do nav inline/IntersectionObserver funcionarem em todas as seções que forem incluídas no menu.
- **Stack**: framer-motion já está no projeto — dá pra portar as transições CSS (`transition`) para `motion.div`/`AnimatePresence` se a outra sessão preferir, mas **não é obrigatório**: CSS puro (como no lab) funciona dentro de um componente React sem problema, só migrar as classes para um arquivo `.css` importado ou para Tailwind arbitrary values/`@layer`.
- **Scroll-margin**: sections que já têm `id` usam `scroll-mt-20` (Tailwind) — manter esse padrão em vez do `jumpTo()` manual do lab **se** o DevClub não estiver rodando em iframe (não está) — `scrollIntoView` simples já resolve, o hack de `window.scrollTo` do lab existe só por causa do iframe da galeria do foundry.
- **CTA do header**: no lab aponta pro footer (`#footer-soberano`, "Ver o pouso"); no DevClub decidir destino real (matrícula? seção de preço/garantia?) e o texto do botão.

## Resumo executivo pra quem só quer o essencial

Pílula glass fixa, centralizada no topo. No topo da página: só logo + seta + CTA (compacto). Ao rolar >60px: nav central aparece, logo encolhe, barra de progresso de scroll surge embaixo da pílula. Seta ▾ sempre abre um mega-menu (grade 2×2) com hover-intent + click-to-pin + Escape/click-fora pra fechar. Mobile ≤640px: nav vira um botão de dropdown. CTA sempre visível, gradiente + glint no hover — essa é a peça que muda de azul pra verde.
