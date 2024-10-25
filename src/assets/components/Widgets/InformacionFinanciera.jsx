import { useState } from 'react';

export default function InformacionFinanciera() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="container mt-5">
      
      <div className="d-flex flex-column gap-1">
        {/* Balance General */}
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={() => toggleSection('balanceGeneral')}
          aria-expanded={activeSection === 'balanceGeneral'}
        >
          Balance General
        </button>
        {activeSection === 'balanceGeneral' && (
          <div className="collapse show">
            <div className="card card-body">
              El balance general es un estado financiero que presenta la 
              situación económica de una empresa en un momento específico. 
              Se compone de tres elementos principales: activos, pasivos y
               patrimonio. La ecuación fundamental es:

               <p><strong>Activos = Pasivos + Patrimonio</strong></p>
            </div>
            
          </div>
        )}

        {/* Estado de Resultados */}
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={() => toggleSection('estadoResultados')}
          aria-expanded={activeSection === 'estadoResultados'}
        >
          Estado de Resultados
        </button>
        {activeSection === 'estadoResultados' && (
          <div className="collapse show">
            <div className="card card-body">
              El estado de resultados muestra la rentabilidad de una empresa durante un periodo determinado. Incluye ingresos, costos y gastos, permitiendo calcular la utilidad neta.
            </div>
          </div>
        )}

        {/* Indicadores Financieros */}
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={() => toggleSection('indicadoresFinancieros')}
          aria-expanded={activeSection === 'indicadoresFinancieros'}
        >
          Indicadores Financieros
        </button>
        {activeSection === 'indicadoresFinancieros' && (
          <div className="collapse show">
            <div className="card card-body">
              Los indicadores financieros son métricas utilizadas para evaluar la salud y el rendimiento financiero de una empresa. Algunos ejemplos son el índice de liquidez y el margen de utilidad.
            </div>
          </div>
        )}

        {/* Análisis DuPont */}
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={() => toggleSection('analisisDuPont')}
          aria-expanded={activeSection === 'analisisDuPont'}
        >
          Análisis DuPont
        </button>
        {activeSection === 'analisisDuPont' && (
          <div className="collapse show">
            <div className="card card-body">
              El análisis DuPont es una técnica que descompone el rendimiento sobre el patrimonio (ROE) en tres componentes: margen de utilidad, rotación de activos y apalancamiento financiero. Esta técnica ayuda a identificar las áreas que afectan la rentabilidad de una empresa.
            </div>
          </div>
        )}

        {/* Análisis Vertical y Horizontal */}
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={() => toggleSection('analisisVerticalHorizontal')}
          aria-expanded={activeSection === 'analisisVerticalHorizontal'}
        >
          Análisis Vertical y Horizontal
        </button>
        {activeSection === 'analisisVerticalHorizontal' && (
          <div className="collapse show">
            <div className="card card-body">
              El análisis vertical consiste en evaluar cada partida en un estado financiero como un porcentaje del total, mientras que el análisis horizontal examina la evolución de las partidas a lo largo del tiempo. Ambos análisis son fundamentales para entender mejor la situación financiera de una empresa.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
