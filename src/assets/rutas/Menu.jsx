
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Inicio from "../components/Inicio";
import BalanceGeneral from "../components/BalanceGeneral";
import EstadoDeResultado from "../components/EstadoDeResultado";
import AnalisisDupont from "../components/AnalisisDupont";
import AnalisisVertical from "../components/AnalisisVertical";
import AnalisisHorizontal from "../components/AnalisisHorizontal";
import IndicadoresFinancieros from "../components/IndicadoresFinancieros";
import AgregarBalanceGeneral from "../agregar/AgregarBalanceGeneral";
import AgregarEstadoDeResultado from "../agregar/AgregarEstadoDeResultado";

export default function Menu() {
  return (
    <BrowserRouter>
      <nav>
        <div className="titulo">
          <p>Finanzas Facilita SV</p>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li className="dropdown">
              <li>
                <Link>Estado Financiero</Link>
              </li>
              <div className="dropdown-content">
                <li>
                  <Link to="/agregar-balance-general">Agregar Balance</Link>
                </li>
                <li>
                  <Link to="/balance-general">Balance General</Link>
                </li>
                <li>
                  <Link to="/agregar-estado-resultado">Agregar Estado</Link>
                </li>
                <li>
                  <Link to="/estado-de-resultado">Estado de Resultado</Link>
                </li>
              </div>
            </li>
            <li className="dropdown">
              <li>
                <Link>Análisis Financiero</Link>
              </li>
              <div className="dropdown-content">
                <li>
                  <Link to="/analisis-dupont">Análisis Dupont</Link>
                </li>
                <li>
                  <Link to="/analisis-vertical">Análisis Vertical</Link>
                </li>
                <li>
                  <Link to="/analisis-horizontal">Análisis Horizontal</Link>
                </li>
              </div>
            </li>
            <li>
              <Link to="/indicadores-financieros">Indicadores Financieros</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/agregar-balance-general" element={<AgregarBalanceGeneral />} />
        <Route path="/balance-general" element={<BalanceGeneral />} />
        <Route path="/agregar-estado-resultado" element={<AgregarEstadoDeResultado />} />
        <Route path="/estado-de-resultado" element={<EstadoDeResultado />} />
        <Route
          path="/indicadores-financieros"
          element={<IndicadoresFinancieros />}
        />
        <Route path="/analisis-dupont" element={<AnalisisDupont />} />
        <Route path="/analisis-vertical" element={<AnalisisVertical />} />
        <Route path="/analisis-horizontal" element={<AnalisisHorizontal />} />
      </Routes>
    </BrowserRouter>
  );
}
