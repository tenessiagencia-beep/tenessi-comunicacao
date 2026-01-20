
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import SideDrawer from './components/SideDrawer';

const SECTOR_DETAILS = {
  construction: {
    title: "CONSTRUÇÃO CIVIL & INDÚSTRIA",
    description: "Transformamos o marketing de incorporadoras e indústrias de base com foco em performance e escala. Nossa abordagem une inteligência de dados com criatividade de alto nível para garantir resultados mensuráveis no VGV.",
    stats: [
      { label: "VGV Digital Gerido", value: "+R$ 500M" },
      { label: "Crescimento em ROAS", value: "150%" },
      { label: "Qualificação de Leads", value: "85%" }
    ],
    caseStudy: "Redução de 40% no CPL para uma das maiores incorporadoras do Sul do país através de segmentação preditiva via CRM."
  },
  maritime: {
    title: "DIVISÃO NÁUTICA DE ALTA PERFORMANCE",
    description: "Atendimento exclusivo para estaleiros e brokers de embarcações de alto padrão. Entendemos a jornada complexa do comprador de altíssimo poder aquisitivo e criamos experiências de marca que transcendem o digital.",
    stats: [
      { label: "Alcance Global", value: "Premium Audience" },
      { label: "Tempo de Jornada", value: "Lead-to-Sale optimized" },
      { label: "Posicionamento", value: "High-End" }
    ],
    caseStudy: "Campanha global de lançamento para Yacht de 80 pés resultando em 12 negociações qualificadas em menos de 45 dias."
  }
};

interface FormErrors {
  nome?: string;
  email?: string;
  cargo?: string;
  empresa?: string;
  segmento?: string;
}

const TenessiLandingPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    empresa: '',
    segmento: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [selectedSector, setSelectedSector] = useState<null | keyof typeof SECTOR_DETAILS>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (!value || value.trim() === '') {
      error = 'Este campo é obrigatório';
    } else if (name === 'email' && !validateEmail(value)) {
      error = 'E-mail inválido';
    } else if (name === 'nome' && value.trim().length < 3) {
      error = 'Nome deve ter pelo menos 3 caracteres';
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation check
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof typeof formData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) newErrors[fieldName] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        nome: true,
        email: true,
        cargo: true,
        empresa: true,
        segmento: true
      });
      return;
    }

    alert('Diagnóstico solicitado com sucesso! Nossa equipe entrará em contato.');
  };

  const openSectorDetails = (sector: keyof typeof SECTOR_DETAILS) => {
    setSelectedSector(sector);
    setIsDrawerOpen(true);
  };

  return (
    <div className="tenessi-page">
      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="logo-main">TENESSI</span>
            <span className="logo-sub">CONSULTORIA ESTRATÉGICA</span>
          </div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#setores">Setores</a>
            <a href="#private">Exclusivo</a>
            <button className="search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-text-box">
            <span className="hero-tag">ESTRATÉGIA & PERFORMANCE</span>
            <h1>ESTRATÉGIA DIGITAL PARA LIDERANÇA DE MERCADO.</h1>
            <p className="hero-subtitle">Transformamos dados em resultados previsíveis para empresas que buscam autoridade e expansão de mercado com excelência.</p>
            <div className="hero-actions">
               <button className="gold-button" onClick={() => document.getElementById('diagnostic')?.scrollIntoView({behavior: 'smooth'})}>SOLICITAR DIAGNÓSTICO ESTRATÉGICO</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="setores" className="sectors">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">MARKET SEGMENTS</span>
            <h2 className="section-title">QUEM ATENDEMOS</h2>
          </div>
          <div className="sectors-grid">
            <div className="sector-card construction" onClick={() => openSectorDetails('construction')}>
              <div className="sector-overlay"></div>
              <div className="sector-info">
                <div className="sector-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                </div>
                <h3>CONSTRUÇÃO CIVIL & INDÚSTRIA</h3>
                <span className="sector-link">Ver detalhes</span>
              </div>
            </div>
            <div className="sector-card maritime" onClick={() => openSectorDetails('maritime')}>
              <div className="sector-overlay"></div>
              <div className="sector-info">
                <div className="sector-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h3>DIVISÃO NÁUTICA (YACHTS)</h3>
                <span className="sector-link">Ver detalhes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="data-creativity">
        <div className="container relative-content">
          <div className="data-inner">
            <div className="data-icon">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
            <div className="data-content">
              <h3>CRIATIVIDADE IMPULSIONADA POR DADOS.</h3>
              <p>Nossa inteligência comercial integrada garante que cada ponto de contato seja otimizado para conversão de alto valor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Form Section */}
      <section id="diagnostic" className="diagnostic">
        <div className="container diagnostic-container relative-content">
          <div className="form-header">
            <h2 className="diagnostic-title">AGENDE UM DIAGNÓSTICO ESTRATÉGICO</h2>
            <p>Um consultor sênior entrará em contato para entender seus desafios de escala.</p>
          </div>
          <form className="diagnostic-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="input-group">
                <input 
                  type="text" 
                  name="nome" 
                  placeholder="NOME COMPLETO" 
                  aria-label="Nome completo"
                  required 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.nome && touched.nome ? 'input-error' : ''}
                  value={formData.nome}
                />
                {errors.nome && touched.nome && <span className="error-message">{errors.nome}</span>}
              </div>
              <div className="input-group">
                <input 
                  type="text" 
                  name="cargo" 
                  placeholder="CARGO / POSIÇÃO" 
                  aria-label="Cargo ou posição na empresa"
                  required 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.cargo && touched.cargo ? 'input-error' : ''}
                  value={formData.cargo}
                />
                {errors.cargo && touched.cargo && <span className="error-message">{errors.cargo}</span>}
              </div>
              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="E-MAIL CORPORATIVO" 
                  aria-label="E-mail corporativo"
                  required 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? 'input-error' : ''}
                  value={formData.email}
                />
                {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="input-group">
                <input 
                  type="text" 
                  name="empresa" 
                  placeholder="EMPRESA / GRUPO" 
                  aria-label="Nome da empresa ou grupo econômico"
                  required 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.empresa && touched.empresa ? 'input-error' : ''}
                  value={formData.empresa}
                />
                {errors.empresa && touched.empresa && <span className="error-message">{errors.empresa}</span>}
              </div>
              <div className="input-group full-width">
                <select 
                  name="segmento" 
                  aria-label="Segmento de atuação"
                  required 
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.segmento && touched.segmento ? 'input-error' : ''}
                  value={formData.segmento}
                >
                  <option value="" disabled>SELECIONE SEU SEGMENTO</option>
                  <option value="construcao">Construção Civil</option>
                  <option value="maritimo">Marítimo / Náutica</option>
                  <option value="industria">Indústria de Base</option>
                </select>
                {errors.segmento && touched.segmento && <span className="error-message">{errors.segmento}</span>}
              </div>
            </div>
            <button type="submit" className="gold-submit">SOLICITAR DIAGNÓSTICO AGORA</button>
          </form>
          <div className="footer-small">
            <div className="logo-small">
              <span>TENESSI</span>
            </div>
            <p className="copyright">© 2025 Tenessi Consultoria. Todos os direitos reservados.</p>
          </div>
        </div>
      </section>

      {/* Sector Details Drawer */}
      {selectedSector && (
        <SideDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          title={SECTOR_DETAILS[selectedSector].title}
        >
          <div className="drawer-inner-content">
            <p className="drawer-description">{SECTOR_DETAILS[selectedSector].description}</p>
            
            <div className="drawer-stats">
              {SECTOR_DETAILS[selectedSector].stats.map((stat, idx) => (
                <div key={idx} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="drawer-case">
              <div className="case-badge">CASE STUDY</div>
              <p>{SECTOR_DETAILS[selectedSector].caseStudy}</p>
            </div>

            <button className="gold-button drawer-cta" onClick={() => {
               setIsDrawerOpen(false);
               document.getElementById('setores')?.scrollIntoView({behavior: 'smooth'});
            }}>
              FALAR COM ESPECIALISTA DO SETOR
            </button>
          </div>
        </SideDrawer>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<React.StrictMode><TenessiLandingPage /></React.StrictMode>);
}
