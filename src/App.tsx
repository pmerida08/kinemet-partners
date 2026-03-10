/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, CheckCircle2, Lightbulb, Users, ShieldCheck, Globe2 } from 'lucide-react';

export default function App() {
  return (
    <div className="font-sans bg-background-light text-slate-900 antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center font-black text-xl rounded-lg tracking-tighter">
              KP
            </div>
            <span className="font-bold text-xl tracking-tight text-primary hidden sm:block">Kinemet Partners</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-slate-600 hover:text-accent transition-colors" href="#what-we-do">Lo Que Hacemos</a>
            <a className="text-sm font-medium text-slate-600 hover:text-accent transition-colors" href="#who-we-are">Quiénes Somos</a>
            <a className="text-sm font-medium text-slate-600 hover:text-accent transition-colors" href="#where-we-are">Dónde Estamos</a>
            <a className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-accent/90 transition-all shadow-sm" href="#contact">Inicia la Conversación</a>
          </nav>
          <button className="md:hidden text-primary">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl md:text-7xl font-black text-primary leading-[1.1] tracking-tight">
              Impulsando el Movimiento. <br />
              <span className="text-accent">Creando Transformación.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-[540px]">
              Kinemet Partners une el mundo de la estrategia empresarial y el liderazgo humano para resolver desafíos organizacionales complejos.
            </p>
            <div>
              <a className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20" href="#contact">
                Inicia la Conversación
              </a>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative w-4/5 h-4/5 border border-white/10 rounded-full flex items-center justify-center p-8">
              <div className="absolute w-full h-full border border-white/20 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
              <img alt="Transformación" className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Lo Que Hacemos */}
      <section className="py-20 md:py-32 px-6 bg-background-light" id="what-we-do">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[800px] mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Lo Que Hacemos</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Inyectamos movimiento para generar transformación real en empresas y personas. Resolvemos problemas complejos de transformación de negocio uniendo el mundo de los <strong className="text-primary">Negocios</strong> y las <strong className="text-primary">Personas</strong>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-10 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                <span className="text-accent font-black">01</span> Kinesis
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Inyectamos el impulso necesario para activar el cambio. Nos centramos en la energía inicial para romper la inercia y establecer una dirección estratégica clara.
              </p>
            </div>
            <div className="p-10 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                <span className="text-accent font-black">02</span> Metamorphosis
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Aseguramos que la evolución sea profunda y permanente. Transformamos estructuras y mentalidades para que el crecimiento sea sostenible a largo plazo.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="p-10 rounded-2xl bg-primary text-white shadow-xl">
              <Lightbulb className="text-accent w-12 h-12 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Business</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Excelencia operativa y aceleración comercial a través de la optimización estratégica.
              </p>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-5 h-5" /> Estrategia de Negocio</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-5 h-5" /> Mejora de Procesos</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-5 h-5" /> Excelencia Operativa</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-accent w-5 h-5" /> Aceleración GTM (Go-To-Market)</li>
              </ul>
            </div>
            <div className="p-10 rounded-2xl bg-white border border-slate-200 shadow-xl">
              <Users className="text-primary w-12 h-12 mb-6" />
              <h3 className="text-3xl font-bold text-primary mb-4">People</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Desbloqueando el potencial humano mediante la psicología aplicada al entorno corporativo.
              </p>
              <ul className="space-y-4 text-slate-700 font-medium">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> Psicología del Comportamiento</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> Recursos Humanos y Talento</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> Liderazgo y Coaching</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5" /> Cultura Organizacional</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="border-t-2 border-accent pt-8">
              <h4 className="text-xl font-bold text-primary mb-4">Consultoría Tailor-made</h4>
              <p className="text-slate-600 leading-relaxed">
                Servicios de consultoría altamente personalizados para proyectos complejos que requieren un enfoque único y profundo a medida de sus necesidades.
              </p>
            </div>
            <div className="border-t-2 border-accent pt-8">
              <h4 className="text-xl font-bold text-primary mb-4">Productos y Contenidos Digitales</h4>
              <p className="text-slate-600 leading-relaxed">
                Soluciones digitales estandarizadas, repetibles y escalables que permiten democratizar la transformación y acelerar el aprendizaje.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section className="py-20 md:py-32 px-6 bg-white" id="who-we-are">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">Quiénes Somos</h2>
            <p className="text-xl text-slate-600 max-w-[800px] mx-auto mb-8 leading-relaxed">
              Somos un <strong className="text-primary">Colectivo de Consultoría</strong>: una red de profesionales independientes y multidisciplinares de alto nivel que ofrece impacto directo sin estructuras rígidas.
            </p>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider">
              <ShieldCheck size={20} />
              Seniority Garantizado: +20-25 años de experiencia corporativa real
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            {[
              { name: 'Ana', role: 'CEO', desc: 'Experta en Estrategia Corporativa y Ventas (ex-Cisco, AWS).', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop' },
              { name: 'Carla', role: 'Marketing & CSR', desc: 'Especialista en Marketing y Responsabilidad Social Corporativa.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop' },
              { name: 'Natalia', role: 'Psychology & Coaching', desc: 'Psicóloga clínica y coach ejecutiva (ex-Grupo Vips, Santander).', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop' },
              { name: 'Paula', role: 'Human Factors', desc: 'Psicóloga experta en resolución de conflictos y lado humano.', img: 'https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?q=80&w=800&auto=format&fit=crop' },
            ].map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-40 h-40 bg-slate-100 rounded-full mb-6 overflow-hidden border-4 border-transparent group-hover:border-accent transition-all duration-300 shadow-lg">
                  <img alt={member.name} className="w-full h-full object-cover" src={member.img} referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{member.name}</h3>
                <span className="text-accent text-sm font-bold mb-4 uppercase tracking-wide">{member.role}</span>
                <p className="text-sm text-slate-600 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-10 rounded-2xl bg-background-light border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Experiencia Senior</h3>
              <p className="text-slate-600 leading-relaxed">Acceso directo a consultores con décadas de experiencia real en el terreno corporativo.</p>
            </div>
            <div className="text-center p-10 rounded-2xl bg-background-light border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                <Globe2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Multidisciplinariedad</h3>
              <p className="text-slate-600 leading-relaxed">Combinamos negocios, tecnología y psicología clínica para una visión 360º de su empresa.</p>
            </div>
            <div className="text-center p-10 rounded-2xl bg-background-light border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Equipos Dinámicos</h3>
              <p className="text-slate-600 leading-relaxed">Configuramos el equipo exacto de expertos independientes para cada reto específico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dónde Estamos */}
      <section className="py-20 md:py-32 px-6 bg-primary text-white overflow-hidden relative" id="where-we-are">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/connected.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Dónde Estamos</h2>
              <p className="text-xl text-slate-300 mb-16 leading-relaxed">
                Operamos con una estructura ligera y flexible que prioriza los resultados sobre los bienes inmuebles. Nuestra red global nos permite escalar instantáneamente sin los costos fijos de una firma tradicional.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div className="flex flex-col gap-2">
                  <span className="text-accent text-5xl font-black">100%</span>
                  <span className="text-sm uppercase tracking-widest text-slate-400 font-bold mt-2">Remoto</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-accent text-5xl font-black">Global</span>
                  <span className="text-sm uppercase tracking-widest text-slate-400 font-bold mt-2">Red de Expertos</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-accent text-5xl font-black">Cero</span>
                  <span className="text-sm uppercase tracking-widest text-slate-400 font-bold mt-2">Costos Fijos</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-accent text-5xl font-black">Digital</span>
                  <span className="text-sm uppercase tracking-widest text-slate-400 font-bold mt-2">Modelo Operativo</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4">
              <img alt="Conectividad global" className="w-full rounded-xl opacity-90 mix-blend-luminosity" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-32 px-6 bg-background-light" id="contact">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Hablemos</h2>
            <p className="text-lg text-slate-600">¿Listo para impulsar el movimiento en su organización? Creemos la transformación juntos.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nombre</label>
                  <input className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="Juan Pérez" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Empresa</label>
                  <input className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="Acme Corp" type="text" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Correo Electrónico</label>
                  <input className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="juan@empresa.com" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Número de Teléfono</label>
                  <input className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="+34 000 000 000" type="tel" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">¿Cómo podemos ayudar?</label>
                <textarea className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none" placeholder="Describa brevemente su desafío organizacional..." rows={5}></textarea>
              </div>
              <button className="w-full bg-accent text-white py-5 rounded-xl font-bold text-lg hover:bg-accent/90 transition-all shadow-lg shadow-accent/20" type="submit">
                Enviar Solicitud
              </button>
              <p className="text-center text-sm text-slate-500 font-medium">
                Responderemos en un plazo de 24 horas.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-primary flex items-center justify-center font-black text-lg rounded-lg tracking-tighter">
                KP
              </div>
              <span className="font-bold text-xl tracking-tight">Kinemet Partners</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md text-center md:text-left">
              Impulsando el movimiento para permitir la transformación.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a className="hover:text-white transition-colors" href="#">Política de Privacidad</a>
            <a className="hover:text-white transition-colors" href="#">Términos de Servicio</a>
            <a className="hover:text-white transition-colors" href="#">LinkedIn</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
          © 2026 Kinemet Partners. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
