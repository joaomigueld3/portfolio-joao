"use client";
import React, { useState } from 'react';
import { 
  Github, Linkedin, Mail, Server, Database, Cloud, Code, 
  ExternalLink, Layers, Users, BookOpen, Globe, MapPin, Download
} from 'lucide-react';

export default function Portfolio() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  // --- DADOS (Baseados nos Currículos em Anexo) ---
  const data = {
    pt: {
      role: "Engenheiro de Software",
      summary: "Engenheiro de software com experiência no desenvolvimento de soluções escaláveis e eficientes. Especializado em tecnologias como NodeJS (Javascript), AWS, MongoDB e MySQL. Experiência em Arquitetura de Sistemas, Código Limpo e resolução de problemas complexos.",
      location: "Brasil",
      downloadCv: "Baixar Currículo",
      nav: { about: "Sobre", exp: "Experiência", projects: "Projetos", contact: "Contato" },
      titles: { 
        about: "Sobre Mim", 
        exp: "Histórico Profissional", 
        edu: "Formação Acadêmica",
        projects: "Projetos & Autônomo",
        contact: "Vamos Conversar?" 
      },
      experience: [
        {
          company: "Revelatio Studio",
          role: "Engenheiro de Software",
          period: "08/2024 - 12/2024",
          description: "Desenvolvi soluções para o Serur Advogados. Construí do zero uma aplicação WEB com OCR para consulta de OABs, assim como ferramentas de gestão financeira integrada ao Omie (ERP).",
          tech: ["NodeJS", "Typescript", "Jest", "Docker", "MongoDB", "AWS"]
        },
        {
          company: "Profissional Autônomo",
          role: "Engenheiro de Software",
          period: "05/2024 - Atual",
          description: "Desenvolvedor independente full stack criando soluções diversas com foco em entrega de valor e agilidade.",
          tech: ["NestJS", "React", "Flutter", "SQL", "Docker", "AWS"]
        },
        {
          company: "Mobiis",
          role: "Engenheiro de Software",
          period: "07/2023 - 01/2024",
          description: "Líder do backend no desenvolvimento de sistemas WEB B2B para comparação de preços no varejo. Trabalho direto com Product Owner.",
          tech: ["NodeJS", "Typescript", "Docker", "SQL", "API REST"]
        },
        {
          company: "Pitang Agile IT",
          role: "Engenheiro de Software Trainee-Júnior",
          period: "05/2022 - 04/2023",
          description: "Membro do squad da DirecTV GO (streaming). Implementação de microsserviços de dados e aplicações para a Copa do Mundo do Qatar.",
          tech: ["NodeJS", "Microservices", "AWS MSK/Lambda", "MongoDB"]
        }
      ],
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
      nav: { about: "About", exp: "Experience", projects: "Projects", contact: "Contact" },
      titles: { 
        about: "About Me", 
        exp: "Work Experience", 
        edu: "Education",
        projects: "Projects & Freelance",
        contact: "Let's Talk?" 
      },
      experience: [
        {
          company: "Revelatio Studio",
          role: "Software Engineer",
          period: "08/2024 - 12/2024",
          description: "Developed solutions for Serur Advogados. Built a WEB application from scratch with OCR for OAB consultation and financial tools integrated with Omie (ERP).",
          tech: ["NodeJS", "Typescript", "Jest", "Docker", "MongoDB", "AWS"]
        },
        {
          company: "Freelance / Autonomous",
          role: "Software Engineer",
          period: "05/2024 - Current",
          description: "Full stack independent developer building diverse solutions with a focus on value delivery and agility.",
          tech: ["NestJS", "React", "Flutter", "SQL", "Docker", "AWS"]
        },
        {
          company: "Mobiis",
          role: "Software Engineer",
          period: "07/2023 - 01/2024",
          description: "Backend leader in B2B web systems development for retail price comparison. Worked directly with the Product Owner.",
          tech: ["NodeJS", "Typescript", "Docker", "SQL", "REST API"]
        },
        {
          company: "Pitang Agile IT",
          role: "Software Engineer Trainee-Junior",
          period: "05/2022 - 04/2023",
          description: "Member of the DirecTV GO streaming squad. Implemented data microservices and applications for the Qatar World Cup.",
          tech: ["NodeJS", "Microservices", "AWS MSK/Lambda", "MongoDB"]
        }
      ],
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

  // Projetos manuais (mantidos para portfólio visual)
  const projects = [
    {
      title: "ErgonBacklog",
      desc_pt: "Ferramenta inteligente para criação automatizada de backlogs via prompts.",
      desc_en: "Intelligent tool for automated backlog creation via user prompts.",
      tech: ["AI Integration", "Web App"],
      status: "Dev",
      icon: <Layers className="text-indigo-600" size={24} />
    },
    {
      title: "Team Sorter App",
      desc_pt: "Aplicação web para sorteio e organização de times de futebol.",
      desc_en: "Web application for sorting and organizing soccer teams.",
      tech: ["React", "Logic"],
      status: "Done",
      icon: <Users className="text-emerald-600" size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Header Fixo */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <Code className="text-indigo-600" />
             <span className="font-bold text-lg tracking-tight">João Descendente<span className="text-indigo-600">.dev</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
              <a href="#about" className="hover:text-indigo-600 transition">{t.nav.about}</a>
              <a href="#experience" className="hover:text-indigo-600 transition">{t.nav.exp}</a>
              <a href="#projects" className="hover:text-indigo-600 transition">{t.nav.projects}</a>
            </nav>

            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
            >
              <Globe size={14} />
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 space-y-24">
        
        {/* Hero / About Section */}
        <section id="about" className="flex flex-col md:flex-row items-center gap-12">
          {/* Foto Area */}
          <div className="relative group shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
              {/* Usando GitHub Avatar como fallback inteligente */}
              <img 
                src="https://github.com/joaomigueld3.png" 
                alt="João Miguel Descendente" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-indigo-600 blur-2xl opacity-20 group-hover:opacity-30 transition -z-10 translate-y-4"></div>
          </div>

          <div className="text-center md:text-left space-y-6 flex-1">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
                <MapPin size={12} /> {t.location}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                João Miguel Descendente
              </h1>
              <h2 className="text-xl md:text-2xl text-indigo-600 font-medium">
                {t.role}
              </h2>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.summary}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <SocialBtn href="https://github.com/joaomigueld3" icon={<Github size={18} />} label="GitHub" />
              <SocialBtn href="https://linkedin.com/in/joaomigueld3" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialBtn href="mailto:joaomigueld3@gmail.com" icon={<Mail size={18} />} label="Email" />
              <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                <Download size={18} /> {t.downloadCv}
              </a>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="grid md:grid-cols-[1fr_2fr] gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
              {t.titles.exp}
            </h3>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="text-indigo-600" size={20} />
                {t.titles.edu}
              </h4>
              <div className="space-y-6">
                {t.education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-slate-200 pl-4">
                    <div className="text-sm font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-xs font-medium text-indigo-600 mb-1">{edu.institution}</div>
                    <div className="text-xs text-slate-400">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {t.experience.map((exp, idx) => (
              <div key={idx} className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{exp.company}</h4>
                    <p className="text-indigo-600 font-medium text-sm">{exp.role}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h3 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3">
             <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
             {t.titles.projects}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {proj.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    {proj.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{proj.title}</h4>
                <p className="text-slate-600 text-sm mb-6 min-h-[40px]">
                  {lang === 'pt' ? proj.desc_pt : proj.desc_en}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1">
                    <Github size={16} /> Code
                  </a>
                  <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-bold">{t.titles.contact}</h3>
            <p className="text-slate-300 max-w-lg mx-auto">
              {lang === 'pt' 
                ? "Estou disponível para novas oportunidades. Vamos construir algo incrível juntos." 
                : "I am available for new opportunities. Let's build something amazing together."}
            </p>
            <a href="mailto:joaomigueld3@gmail.com" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-indigo-50 transition">
              <Mail size={18} /> joaomigueld3@gmail.com
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        </section>

      </main>

      <footer className="text-center py-8 text-slate-400 text-sm border-t border-slate-200">
        <p>© {new Date().getFullYear()} João Miguel Descendente. Built with Next.js & Tailwind.</p>
      </footer>
    </div>
  );
}

function SocialBtn({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 bg-white border border-slate-200 text-slate-600 rounded-full hover:border-indigo-600 hover:text-indigo-600 hover:scale-110 transition-all shadow-sm"
      aria-label={label}
    >
      {icon}
    </a>
  );
}