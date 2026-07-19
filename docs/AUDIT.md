# Auditoria de código — 2026-07-19

Primeira passada no repositório recém-clonado: leitura de todos os arquivos em `src/`, checagem de `tsc --noEmit` e `npm run build`, verificação visual em desktop e mobile.

Build e typecheck fecham limpos (0 erros) antes e depois das correções abaixo.

## Corrigido

| Onde | Problema | Correção |
|---|---|---|
| [src/components/Navbar.tsx](../src/components/Navbar.tsx) | No desktop, os links "About"/"Metrics" ficavam escondidos atrás de um botão hambúrguer colapsável — comportamento correto só faz sentido no mobile (viewport estreita). | Desktop agora mostra os links direto na pill ao lado do logo, sem hambúrguer nem estado de toggle (`menuOpen` removido). Mobile mantido intacto — verificado visualmente que o toggle mobile continua funcionando. |
| [index.html](../index.html) | `<html lang="en">` com todo o conteúdo da página em pt-BR — afeta leitores de tela e SEO. | Trocado para `lang="pt-BR"`. |
| [package.json](../package.json) | `"name": "synapsex"` — nome herdado de um projeto anterior, não bate com a identidade "Dev Club" em lugar nenhum do conteúdo visível. | Renomeado para `"dev-club"`. Não afeta build/runtime, só identidade do pacote. |

## Encontrado, não alterado (decisão sua / entra no redesenho)

Nada aqui quebra a build hoje — são pontos que vão ser tocados quando vocês definirem o redesenho das seções, então preferi não mexer sem orientação:

- **Links de navegação por altura de viewport** ([Navbar.tsx](../src/components/Navbar.tsx) `scrollToSection`): "About" e "Metrics" rolam para `1×` e `2×` a altura da janela, não para uma seção específica por `id`. Só a Hero tem `h-screen` garantido — as outras seções têm altura variável conforme conteúdo/viewport, então o scroll não aterrissa de forma confiável na seção certa. Fix correto é dar `id` às seções-alvo reais e usar `scrollIntoView`/anchor — mas isso depende de qual seção cada link deve apontar, o que ainda não está definido.
- **CTAs sem ação real**: "Quero Fazer Parte", "Soluções", "Conhecer curso", "Falar com o suporte (WhatsApp)", ícones sociais no Footer (`href="#"`) — todos inertes, sem destino. Esperado numa landing em construção, mas fica registrado.
- **Dependência externa via CDN só por um ícone**: `index.css` importa Bootstrap Icons inteiro (CDN) só para o ícone Apple no botão Download (`Navbar.tsx`), enquanto `lucide-react` já está instalado e cobre todo o resto dos ícones do projeto. Dá pra trocar por um ícone Lucide/SVG próprio e remover a dependência externa.
- **Classes `.lenis*` em `index.css`** (linhas 45-55): CSS pronto para a lib de smooth-scroll Lenis, que não está instalada (`package.json` não tem `lenis` nem `@studio-freight/lenis`). Hoje é código morto — nem ajuda nem atrapalha, mas ou entra a lib ou o CSS sai.
- **`SynapseXLogo.tsx`**: nome do componente é resquício de um projeto anterior ("SynapseX"); o logo em si (SVG de 4 quadrantes) é genérico e pode ser renomeado/refeito no redesenho.

## Estrutura — decomposição

Nenhum arquivo está grande o suficiente hoje pra justificar quebrar (`Hero.tsx` é o maior, ~250 linhas, mas é coeso — video head-tracking, watermark patch e o JSX de conteúdo são as três responsabilidades e cada uma já está isolada em seu próprio `useEffect`). Se `Hero.tsx` crescer mais no redesenho, os dois `useEffect` de tracking/watermark são candidatos naturais a virar hooks próprios (`useHeadTrackingVideo`, `useWatermarkPatch`).

Resto dos componentes são seções isoladas, sem estado compartilhado, cada um com uma responsabilidade única — não há necessidade de decompor agora.
