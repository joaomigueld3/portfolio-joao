# João Miguel Descendente — Portfólio

Portfólio pessoal construído com [Next.js](https://nextjs.org) e [Tailwind CSS](https://tailwindcss.com), bilíngue (PT/EN) e com dados de projetos, stack e atividade puxados ao vivo da API do GitHub.

## Funcionalidades

- **Bilíngue**: toggle PT/EN em todo o conteúdo.
- **Projetos ao vivo**: lista de repositórios do GitHub (`joaomigueld3`) com estrelas, forks e linguagem, com opção de ordenar por mais estrelados ou mais recentes.
- **Estatísticas em tempo real**: repositórios, estrelas, seguidores e total de contribuições (via [github-contributions-api](https://github-contributions-api.jogruber.de)).
- **Stack**: distribuição de linguagens calculada a partir dos repositórios públicos.
- **Atividade recente**: últimos repositórios com push, atualizados automaticamente.
- **Animações de entrada**: seções aparecem com fade/slide suave ao rolar a página (via `IntersectionObserver`).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o resultado. A página principal fica em [app/page.tsx](app/page.tsx).

## Stack técnica

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) para ícones
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) com a fonte [Geist](https://vercel.com/font)

## Deploy

O jeito mais simples de publicar é usando a [Vercel](https://vercel.com/new). Veja a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
