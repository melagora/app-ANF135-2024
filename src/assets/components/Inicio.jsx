import "../css/Inicio.css"; // Importa el archivo CSS
import InformacionFinanciera from "./Widgets/InformacionFinanciera"; "./Widgets/InformacionFinanciera"
import Finanza from "../css/multimedia/finanza.png"

export default function Inicio() {
  return (
    <div className="info">
      <h1>Información Financiera</h1>
      <div className="container text-center">
        <div className="row">
          <div className="col-5">
          <img src={Finanza} alt="Logo" className="img-fluid my-3" />
          </div>
          <div className="col-7">
            <InformacionFinanciera />
          </div>
        </div>
      </div>
    </div>
  );
}

{
/*
  Balance General
  El balance general es un estado financiero que presenta la situación económica de una empresa en un momento específico. Se compone de tres elementos principales: activos, pasivos y patrimonio. La ecuación fundamental es:
 
  Estado de Resultados
  El estado de resultados muestra la rentabilidad de una empresa durante un periodo determinado. Incluye ingresos, costos y gastos, permitiendo calcular la utilidad neta. 

  Indicadores Financieros
  Los indicadores financieros son métricas utilizadas para evaluar la salud y el rendimiento financiero de una empresa. Algunos ejemplos son el índice de liquidez y el margen de utilidad.

  Análisis DuPont
  El análisis DuPont es una técnica que descompone el rendimiento sobre el patrimonio (ROE) en tres componentes: margen de utilidad, rotación de activos y apalancamiento financiero. Esta técnica ayuda a identificar las áreas que afectan la rentabilidad de una empresa.

  Análisis Vertical y Horizontal
  El análisis vertical consiste en evaluar cada partida en un estado financiero como un porcentaje del total, mientras que el análisis horizontal examina la evolución de las partidas a lo largo del tiempo. Ambos análisis son fundamentales para entender mejor la situación financiera de una empresa.
*/

  /* <section>
<h2>Balance General</h2>
<p>
  El balance general es un estado financiero que presenta la situación económica de una empresa en un momento específico. Se compone de tres elementos principales: activos, pasivos y patrimonio. La ecuación fundamental es:
</p>
<p><strong>Activos = Pasivos + Patrimonio</strong></p>
</section>

<section>
<h2>Estado de Resultados</h2>
<p>
  El estado de resultados muestra la rentabilidad de una empresa durante un periodo determinado. Incluye ingresos, costos y gastos, permitiendo calcular la utilidad neta. 
</p>
</section>

<section>
<h2>Indicadores Financieros</h2>
<p>
  Los indicadores financieros son métricas utilizadas para evaluar la salud y el rendimiento financiero de una empresa. Algunos ejemplos son el índice de liquidez y el margen de utilidad.
</p>
</section>

<section>
<h2>Análisis DuPont</h2>
<p>
  El análisis DuPont es una técnica que descompone el rendimiento sobre el patrimonio (ROE) en tres componentes: margen de utilidad, rotación de activos y apalancamiento financiero. Esta técnica ayuda a identificar las áreas que afectan la rentabilidad de una empresa.
</p>
</section>

<section>
<h2>Análisis Vertical y Horizontal</h2>
<p>
  El análisis vertical consiste en evaluar cada partida en un estado financiero como un porcentaje del total, mientras que el análisis horizontal examina la evolución de las partidas a lo largo del tiempo. Ambos análisis son fundamentales para entender mejor la situación financiera de una empresa.
</p>
</section> */
}
