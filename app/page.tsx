"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Github, Linkedin, Mail, Code, ExternalLink, BookOpen, Globe, MapPin, Download,
  Star, GitFork, Activity as ActivityIcon, Sun, Moon
} from 'lucide-react';

const GITHUB_USERNAME = "joaomigueld3";

type GithubUser = {
  public_repos: number;
  followers: number;
};

type ContributionsResponse = {
  total?: Record<string, number>;
};

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  pushed_at: string;
};

const STACK_CATEGORIES: { label: string; items: string[] }[] = [
  { label: "frontend", items: ["React", "TypeScript", "Tailwind"] },
  { label: "backend", items: ["NodeJS", "NestJS", "TypeScript"] },
  { label: "mobile", items: ["Flutter", "Dart"] },
  { label: "ops", items: ["Docker", "AWS", "Shell"] },
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Go: "#00ADD8",
};

function timeAgo(dateStr: string, lang: 'pt' | 'en') {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return lang === 'pt' ? "hoje" : "today";
  if (days < 30) return lang === 'pt' ? `há ${days} dia${days > 1 ? 's' : ''}` : `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return lang === 'pt' ? `há ${months} ${months > 1 ? 'meses' : 'mês'}` : `${months}mo ago`;
  const years = Math.floor(months / 12);
  return lang === 'pt' ? `há ${years} ano${years > 1 ? 's' : ''}` : `${years}y ago`;
}

export default function Portfolio() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [githubError, setGithubError] = useState(false);
  const [projectSort, setProjectSort] = useState<'stars' | 'recent'>('stars');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { signal: controller.signal }).then(r => r.ok ? r.json() : Promise.reject()),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { signal: controller.signal }).then(r => r.ok ? r.json() : Promise.reject()),
    ])
      .then(([userData, repoData]) => {
        setGithubUser(userData);
        setRepos(repoData);
      })
      .catch(() => setGithubError(true));

    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=all`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((contribData: ContributionsResponse) => {
        const total = Object.values(contribData.total ?? {}).reduce((sum, n) => sum + n, 0);
        setTotalContributions(total);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const ownRepos = useMemo(() => (repos ?? []).filter(r => !r.fork), [repos]);

  const sortedProjects = useMemo(() => {
    const list = [...ownRepos];
    if (projectSort === 'stars') {
      list.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else {
      list.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
    }
    return list.slice(0, 6);
  }, [ownRepos, projectSort]);

  const languageStats = useMemo(() => {
    const counts: Record<string, number> = {};
    ownRepos.forEach(r => {
      if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts)
      .map(([language, count]) => ({ language, count, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [ownRepos]);

  const recentActivity = useMemo(() => {
    return [...ownRepos]
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 6);
  }, [ownRepos]);

  // --- DADOS (Baseados nos Currículos em Anexo) ---
  const data = {
    pt: {
      role: "Engenheiro de Software",
      summary: "Engenheiro de software com experiência no desenvolvimento de soluções escaláveis e eficientes. Especializado em tecnologias como NodeJS (Javascript), AWS, MongoDB e MySQL. Experiência em Arquitetura de Sistemas, Código Limpo e resolução de problemas complexos.",
      location: "Brasil",
      downloadCv: "Baixar Currículo",
      cvPath: "/curriculo-pt.pdf",
      nav: { about: "Sobre", edu: "Formação", projects: "Projetos", contact: "Contato" },
      titles: {
        about: "Sobre Mim",
        edu: "Formação Acadêmica",
        projects: "Projetos & Autônomo",
        stack: "Stack",
        activity: "Atividade Recente",
        contact: "Vamos Conversar?"
      },
      eyebrow: "OLÁ, EU SOU",
      sectionNum: { about: "01 — SOBRE", edu: "02 — FORMAÇÃO", projects: "03 — PROJETOS", stack: "04 — STACK", activity: "05 — ATIVIDADE" },
      stats: { repos: "Repositórios", contributions: "Contribuições" },
      stackSubtitle: "Distribuição de linguagens direto da API do GitHub.",
      stackCommand: `$ ${GITHUB_USERNAME} --stack`,
      activitySubtitle: "Últimos repositórios atualizados.",
      sortLabels: { stars: "Mais Estrelados", recent: "Mais Recentes" },
      githubErrorMsg: "Não foi possível carregar os dados do GitHub agora.",
      education: [
        {
          institution: "Universidade de Pernambuco",
          degree: "Mestrado em Engenharia da Computação",
          period: "08/2024 - Presente"
        },
        {
          institution: "Universidade de Pernambuco",
          degree: "Bacharelado em Engenharia da Computação",
          period: "09/2017 - 05/2023"
        }
      ]
    },
    en: {
      role: "Software Engineer",
      summary: "Software engineer with experience in developing scalable and efficient solutions. Specialized in technologies such as NodeJS (Javascript), AWS, MongoDB and MySQL. Experienced in System Architecture, Clean Code and solving complex problems.",
      location: "Brazil",
      downloadCv: "Download Resume",
      cvPath: "/resume-en.pdf",
      nav: { about: "About", edu: "Education", projects: "Projects", contact: "Contact" },
      titles: {
        about: "About Me",
        edu: "Education",
        projects: "Projects & Freelance",
        stack: "Stack",
        activity: "Recent Activity",
        contact: "Let's Talk?"
      },
      eyebrow: "HELLO, I'M",
      sectionNum: { about: "01 — ABOUT", edu: "02 — EDUCATION", projects: "03 — PROJECTS", stack: "04 — STACK", activity: "05 — ACTIVITY" },
      stats: { repos: "Repos", contributions: "Contributions" },
      stackSubtitle: "Language distribution, straight from the GitHub API.",
      stackCommand: `$ ${GITHUB_USERNAME} --stack`,
      activitySubtitle: "Recently pushed repositories.",
      sortLabels: { stars: "Top Starred", recent: "Most Recent" },
      githubErrorMsg: "Couldn't load GitHub data right now.",
      education: [
        {
          institution: "University of Pernambuco",
          degree: "M.Sc in Computer Engineering",
          period: "08/2024 - Present"
        },
        {
          institution: "University of Pernambuco",
          degree: "B.Sc in Computer Engineering",
          period: "09/2017 - 05/2023"
        }
      ]
    }
  };

  const t = data[lang];
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-zinc-300 font-sans selection:bg-indigo-100 dark:selection:bg-lime-400/30 selection:text-indigo-900 dark:selection:text-lime-200 transition-colors duration-300">

      {/* Header Fixo */}
      <header className="bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-sm dark:shadow-none dark:border-b dark:border-zinc-800 sticky top-0 z-50 transition-all">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group">
             <Code className="text-indigo-600 dark:text-lime-400 transition-transform group-hover:rotate-12" />
             <span className="font-bold text-lg tracking-tight dark:text-zinc-100">João Descendente<span className="text-indigo-600 dark:text-lime-400">.dev</span></span>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600 dark:text-zinc-400">
              <a href="#about" className="relative hover:text-indigo-600 dark:hover:text-lime-400 transition-colors group">
                {t.nav.about}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-600 dark:bg-lime-400 transition-all group-hover:w-full" />
              </a>
              <a href="#education" className="relative hover:text-indigo-600 dark:hover:text-lime-400 transition-colors group">
                {t.nav.edu}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-600 dark:bg-lime-400 transition-all group-hover:w-full" />
              </a>
              <a href="#projects" className="relative hover:text-indigo-600 dark:hover:text-lime-400 transition-colors group">
                {t.nav.projects}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-600 dark:bg-lime-400 transition-all group-hover:w-full" />
              </a>
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-full bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-lime-400 transition hover:scale-110 active:scale-95"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-300 transition hover:scale-105 active:scale-95"
            >
              <Globe size={14} />
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 space-y-24">

        {/* Hero / About Section */}
        <section id="about">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Foto Area */}
            <div className="relative group shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                <img
                  src="https://github.com/joaomigueld3.png"
                  alt="João Miguel Descendente"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-indigo-600 dark:bg-lime-400 blur-2xl opacity-20 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-50 transition -z-10 translate-y-4"></div>
            </div>

            <div className="text-center md:text-left space-y-6 flex-1">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-lime-400">
                  <span className="w-6 h-px bg-indigo-600 dark:bg-lime-400" /> {t.eyebrow}
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-lime-400/10 text-indigo-700 dark:text-lime-400 rounded-full text-xs font-bold uppercase tracking-wide">
                  <MapPin size={12} /> {t.location}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  João Miguel Descendente
                </h1>
                <h2 className="text-xl md:text-2xl text-indigo-600 dark:text-lime-400 font-mono font-medium">
                  $ {t.role}
                </h2>
              </div>

              <p className="text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {t.summary}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                <SocialBtn href="https://github.com/joaomigueld3" icon={<Github size={18} />} label="GitHub" />
                <SocialBtn href="https://linkedin.com/in/joaomigueld3" icon={<Linkedin size={18} />} label="LinkedIn" />
                <SocialBtn href="mailto:joaomigueld3@gmail.com" icon={<Mail size={18} />} label="Email" />
                <a href={t.cvPath} download className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 dark:bg-lime-400 text-white dark:text-black rounded-full font-semibold hover:bg-indigo-700 dark:hover:bg-lime-300 transition-all shadow-lg shadow-indigo-200 dark:shadow-lime-500/20 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
                  <Download size={18} /> {t.downloadCv}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
        </section>

        {/* Education Section */}
        <section id="education">
        <Reveal>
          <SectionEyebrow text={t.sectionNum.edu} />
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{t.titles.edu}</h3>
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 max-w-2xl transition-all hover:shadow-md dark:hover:border-lime-400/20">
            <div className="space-y-6">
              {t.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-slate-200 dark:border-zinc-700 pl-4 flex items-start gap-3 transition-colors hover:border-indigo-400 dark:hover:border-lime-400">
                  <BookOpen className="text-indigo-600 dark:text-lime-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-zinc-100">{edu.degree}</div>
                    <div className="text-xs font-medium text-indigo-600 dark:text-lime-400 mb-1">{edu.institution}</div>
                    <div className="text-xs text-slate-400 dark:text-zinc-500">{edu.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live GitHub Stats */}
          <div className="grid grid-cols-2 gap-4 max-w-xs mt-8">
            <StatCard value={githubUser?.public_repos ?? ownRepos.length} label={t.stats.repos} loading={!githubUser && !githubError} />
            <StatCard value={totalContributions ?? undefined} label={t.stats.contributions} loading={totalContributions === null && !githubError} />
          </div>
        </Reveal>
        </section>

        {/* Projects Section (live from GitHub) */}
        <section id="projects">
        <Reveal>
          <SectionEyebrow text={t.sectionNum.projects} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{t.titles.projects}</h3>
            <div className="flex bg-slate-100 dark:bg-zinc-900 rounded-full p-1 text-xs font-bold self-start">
              <button
                onClick={() => setProjectSort('stars')}
                className={`px-4 py-1.5 rounded-full transition-all ${projectSort === 'stars' ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-lime-400 shadow-sm' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300'}`}
              >
                {t.sortLabels.stars}
              </button>
              <button
                onClick={() => setProjectSort('recent')}
                className={`px-4 py-1.5 rounded-full transition-all ${projectSort === 'recent' ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-lime-400 shadow-sm' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300'}`}
              >
                {t.sortLabels.recent}
              </button>
            </div>
          </div>

          {githubError && (
            <p className="text-sm text-slate-400 dark:text-zinc-500 mb-6">{t.githubErrorMsg}</p>
          )}

          {!repos && !githubError && (
            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1].map(i => <div key={i} className="h-40 rounded-2xl bg-slate-100 dark:bg-zinc-900 animate-pulse" />)}
            </div>
          )}

          {repos && (
            <div className="grid md:grid-cols-2 gap-6">
              {sortedProjects.map((repo) => (
                <div key={repo.id} className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 transition-all group hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-lime-500/5 dark:hover:border-lime-400/30">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-lime-400 transition-colors">{repo.name}</h4>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-zinc-500 shrink-0">
                      <span className="flex items-center gap-1"><Star size={13} /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork size={13} /> {repo.forks_count}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm mb-6 min-h-[40px]">
                    {repo.description || (lang === 'pt' ? "Sem descrição." : "No description.")}
                  </p>
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-lime-400 flex items-center gap-1 transition-all hover:gap-2"
                      >
                        <Github size={16} /> Code
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-lime-400 flex items-center gap-1 transition-all hover:gap-2"
                        >
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                    </div>
                    {repo.language && (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-500">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#94a3b8" }} />
                        {repo.language}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
        </section>

        {/* Stack Section (live from GitHub) */}
        {!githubError && (
          <section id="stack">
          <Reveal>
            <SectionEyebrow text={t.sectionNum.stack} />
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{t.titles.stack}</h3>

            <div className="bg-slate-900 dark:bg-zinc-950 dark:border dark:border-lime-500/20 text-slate-100 rounded-2xl p-6 font-mono text-sm mb-10 overflow-x-auto transition-shadow hover:shadow-lg dark:hover:shadow-lime-500/10">
              <p className="text-emerald-400 dark:text-lime-400 mb-3">{t.stackCommand}</p>
              {STACK_CATEGORIES.map((cat) => (
                <p key={cat.label} className="whitespace-pre text-slate-300 dark:text-zinc-400">
                  <span className="text-indigo-400 dark:text-lime-400">{cat.label.padEnd(9, ' ')}</span>
                  <span className="text-slate-500">{'→ '}</span>
                  {cat.items.join(' · ')}
                </p>
              ))}
            </div>

            <p className="text-slate-500 dark:text-zinc-500 text-sm mb-8">{t.stackSubtitle}</p>

            {!repos && (
              <div className="space-y-3">
                {[0, 1, 2].map(i => <div key={i} className="h-6 rounded-full bg-slate-100 dark:bg-zinc-900 animate-pulse" />)}
              </div>
            )}

            {repos && (
              <div className="space-y-2">
                {languageStats.map(({ language, count, pct }) => (
                  <div key={language} className="flex items-center gap-4 px-2 -mx-2 py-1.5 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-zinc-900">
                    <span className="w-28 shrink-0 text-sm font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[language] ?? "#94a3b8" }} />
                      {language}
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-600 dark:bg-lime-400 transition-all duration-1000"
                        style={{ width: `${pct}%`, backgroundColor: LANGUAGE_COLORS[language] ?? undefined }}
                      />
                    </div>
                    <span className="w-16 shrink-0 text-right text-xs font-bold text-slate-400 dark:text-zinc-500">{count} repo{count > 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
          </section>
        )}

        {/* Activity Section (live from GitHub) */}
        {!githubError && (
          <section id="activity">
          <Reveal>
            <SectionEyebrow text={t.sectionNum.activity} />
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t.titles.activity}</h3>
            <p className="text-slate-500 dark:text-zinc-500 text-sm mb-8">{t.activitySubtitle}</p>

            {!repos && (
              <div className="space-y-3">
                {[0, 1, 2].map(i => <div key={i} className="h-12 rounded-xl bg-slate-100 dark:bg-zinc-900 animate-pulse" />)}
              </div>
            )}

            {repos && (
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm divide-y divide-slate-100 dark:divide-zinc-800 overflow-hidden">
                {recentActivity.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:pl-8 transition-all"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold text-slate-800 dark:text-zinc-200">
                      <ActivityIcon size={15} className="text-indigo-600 dark:text-lime-400" />
                      {repo.name}
                    </span>
                    <span className="text-xs font-bold text-slate-400 dark:text-zinc-500">{timeAgo(repo.pushed_at, lang)}</span>
                  </a>
                ))}
              </div>
            )}
          </Reveal>
          </section>
        )}

        {/* Contact CTA */}
        <section id="contact">
        <Reveal className="bg-slate-900 dark:bg-zinc-950 dark:border dark:border-lime-500/20 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-bold">{t.titles.contact}</h3>
            <p className="text-slate-300 dark:text-zinc-400 max-w-lg mx-auto">
              {lang === 'pt'
                ? "Estou disponível para novas oportunidades."
                : "I am available for new opportunities."}
            </p>
            <a href="mailto:joaomigueld3@gmail.com" className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-lime-400 text-slate-900 dark:text-black rounded-full font-bold hover:bg-indigo-50 dark:hover:bg-lime-300 transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
              <Mail size={18} /> joaomigueld3@gmail.com
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 dark:bg-lime-400 rounded-full blur-3xl opacity-20 dark:opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 dark:bg-lime-500 rounded-full blur-3xl opacity-20 dark:opacity-10 translate-y-1/2 -translate-x-1/2"></div>
        </Reveal>
        </section>

      </main>

      <footer className="text-center py-8 text-slate-400 dark:text-zinc-600 text-sm border-t border-slate-200 dark:border-zinc-900">
        <p>© {new Date().getFullYear()} João Miguel Descendente. Built with Next.js & Tailwind.</p>
      </footer>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-lime-400 mb-3">
      <span className="w-6 h-px bg-indigo-600 dark:bg-lime-400" /> {text}
    </div>
  );
}

function StatCard({ value, label, loading }: { value?: number; label: string; loading: boolean }) {
  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-4 text-center transition-all hover:-translate-y-1 hover:shadow-md dark:hover:border-lime-400/30 cursor-default">
      {loading ? (
        <div className="h-8 mb-1 rounded bg-slate-100 dark:bg-zinc-800 animate-pulse mx-auto w-12" />
      ) : (
        <div className="text-2xl font-extrabold text-indigo-600 dark:text-lime-400">{value ?? 0}</div>
      )}
      <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-zinc-500">{label}</div>
    </div>
  );
}

function SocialBtn({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 rounded-full hover:border-indigo-600 dark:hover:border-lime-400 hover:text-indigo-600 dark:hover:text-lime-400 hover:scale-110 hover:-translate-y-0.5 transition-all shadow-sm"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
