import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Inicio from "../components/inicio";
import BalanceGeneral from "../components/BalanceGeneral";
import EstadoDeResultado from "../components/EstadoDeResultado";
import AnalisisDupont from "../components/AnalisisDupont";
import AnalisisVertical from "../components/AnalisisVertical";
import AnalisisHorizontal from "../components/AnalisisHorizontal";
import IndicadoresFinancieros from "../components/IndicadoresFinancieros";

export default function Menu() {
  return (
    <BrowserRouter>
      <nav>
        <div className="titulo">
          <p>App Análisis financiero - G9</p>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li class="dropdown">
              <li>
                <Link>Estado Financiero</Link>
              </li>
              <div class="dropdown-content">
                <li>
                  <Link to="/balance-general">Balance General</Link>
                </li>
                <li>
                  <Link to="/estado-de-resultado">Estado de Resultado</Link>
                </li>
              </div>
            </li>
            <li class="dropdown">
              <li>
                <Link>Análisis Financiero</Link>
              </li>
              <div class="dropdown-content">
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
        <Route path="/balance-general" element={<BalanceGeneral />} />
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
