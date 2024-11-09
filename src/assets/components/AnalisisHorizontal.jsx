import { useState, useEffect } from "react";
import "../css/Estado.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function AnalisisHorizontal() {
  const [añoSeleccionado, setAñoSeleccionado] = useState("");
  const [añoComparativo, setAñoComparativo] = useState("");
  const [tipoReporte, setTipoReporte] = useState("Balance General");

  const [balanceDataActual, setBalanceDataActual] = useState(null);
  const [balanceDataComparativo, setBalanceDataComparativo] = useState(null);
  const [estadoDataActual, setEstadoDataActual] = useState(null);
  const [estadoDataComparativo, setEstadoDataComparativo] = useState(null);

  useEffect(() => {
    const storedBalanceData = JSON.parse(localStorage.getItem("balances"));
    const storedEstadoData = JSON.parse(localStorage.getItem("estados"));

    if (storedBalanceData) {
      setBalanceDataActual(storedBalanceData[añoSeleccionado]);
      setBalanceDataComparativo(storedBalanceData[añoComparativo]);
    }

    if (storedEstadoData) {
      setEstadoDataActual(storedEstadoData[añoSeleccionado]);
      setEstadoDataComparativo(storedEstadoData[añoComparativo]);
    }
  }, [añoSeleccionado, añoComparativo]);

  const formatearNumero = (numero) => {
    return parseFloat(numero).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calcularVariacion = (valorActual, valorComparativo) => {
    const variacionAbsoluta = valorActual - valorComparativo;
    const variacionPorcentual = (variacionAbsoluta / valorComparativo) * 100;
    return {
      variacionAbsoluta: formatearNumero(variacionAbsoluta),
      variacionPorcentual: formatearNumero(variacionPorcentual) + "%",
    };
  };

  const generarPDF = () => {
    const input = document.getElementById("pdfContent");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        `AnalisisHorizontal_${tipoReporte}_${añoSeleccionado}_vs_${añoComparativo}.pdf`
      );
    });
  };

  return (
    <div className="estado-container">
      <div className="form-group">
        <div className="botonesOpciones">
          <div>
            <label>Seleccionar Tipo de Reporte:</label>
            <select
              onChange={(e) => setTipoReporte(e.target.value)}
              value={tipoReporte}
            >
              <option value="Balance General">Balance General</option>
              <option value="Estado de Resultados">Estado de Resultados</option>
            </select>
          </div>
          <div>
            <label>Seleccionar Año Actual:</label>
            <select
              onChange={(e) => setAñoSeleccionado(e.target.value)}
              value={añoSeleccionado}
            >
              <option value="">-- Seleccionar Año --</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>
          <div>
            <label>Seleccionar Año Comparativo:</label>
            <select
              onChange={(e) => setAñoComparativo(e.target.value)}
              value={añoComparativo}
            >
              <option value="">-- Seleccionar Año --</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>
        </div>

        {añoSeleccionado && añoComparativo && (
          <button onClick={generarPDF}>Generar PDF</button>
        )}
      </div>

      {(balanceDataActual && balanceDataComparativo) ||
        (estadoDataActual && estadoDataComparativo) ? (
        <div id="pdfContent">
          <div className="centrar">
            <h4>Saram S.A de C.V.</h4>
            <h4>Análisis Horizontal del {tipoReporte}</h4>
            <h5>
              Comparación de {añoSeleccionado} con {añoComparativo}
            </h5>
            <h5>
              Cifras expresadas en miles de dólares de los Estados Unidos de
              América
            </h5>
          </div>
          {tipoReporte === "Balance General" ? (
            <div className="json">
              <div>
                <h4 style={{ paddingTop: "20px", textDecoration: "underline" }}>ACTIVOS</h4>
                <h5>ACTIVO CORRIENTE</h5>
                <ul>
                  <li>
                    Efectivo y Equivalentes al Efectivo:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.efectivo)} - ${formatearNumero(balanceDataComparativo.efectivo)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.efectivo, balanceDataComparativo.efectivo).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.efectivo, balanceDataComparativo.efectivo).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Inversiones Financieras a Corto Plazo:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.inversionesCortoPlazo)} - ${formatearNumero(balanceDataComparativo.inversionesCortoPlazo)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.inversionesCortoPlazo, balanceDataComparativo.inversionesCortoPlazo).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.inversionesCortoPlazo, balanceDataComparativo.inversionesCortoPlazo).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Deudores Comerciales y Otras Cuentas por Cobrar:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.deudoresComerciales)} - ${formatearNumero(balanceDataComparativo.deudoresComerciales)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.deudoresComerciales, balanceDataComparativo.deudoresComerciales).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.deudoresComerciales, balanceDataComparativo.deudoresComerciales).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Inventarios:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.inventarios)} - ${formatearNumero(balanceDataComparativo.inventarios)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.inventarios, balanceDataComparativo.inventarios).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.inventarios, balanceDataComparativo.inventarios).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Pagos Anticipados:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.pagosAnticipados)} - ${formatearNumero(balanceDataComparativo.pagosAnticipados)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.pagosAnticipados, balanceDataComparativo.pagosAnticipados).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.pagosAnticipados, balanceDataComparativo.pagosAnticipados).variacionPorcentual})
                    </span>
                  </li>
                </ul>
                <h5>ACTIVO NO CORRIENTE</h5>
                <ul>
                  <li>
                    Propiedad, Planta y Equipo (neto):{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.propiedadPlantaEquipo)} - ${formatearNumero(balanceDataComparativo.propiedadPlantaEquipo)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.propiedadPlantaEquipo, balanceDataComparativo.propiedadPlantaEquipo).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.propiedadPlantaEquipo, balanceDataComparativo.propiedadPlantaEquipo).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Activo Biológico:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.activoBiologico)} - ${formatearNumero(balanceDataComparativo.activoBiologico)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.activoBiologico, balanceDataComparativo.activoBiologico).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.activoBiologico, balanceDataComparativo.activoBiologico).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Intangibles:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.intangibles)} - ${formatearNumero(balanceDataComparativo.intangibles)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.intangibles, balanceDataComparativo.intangibles).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.intangibles, balanceDataComparativo.intangibles).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Inversiones Financieras a Largo Plazo:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.inversionesLargoPlazo)} - ${formatearNumero(balanceDataComparativo.inversionesLargoPlazo)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.inversionesLargoPlazo, balanceDataComparativo.inversionesLargoPlazo).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.inversionesLargoPlazo, balanceDataComparativo.inversionesLargoPlazo).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Proyectos en Proceso:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.proyectosProceso)} - ${formatearNumero(balanceDataComparativo.proyectosProceso)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.proyectosProceso, balanceDataComparativo.proyectosProceso).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.proyectosProceso, balanceDataComparativo.proyectosProceso).variacionPorcentual})
                    </span>
                  </li>
                </ul>
                <h5 style={{ textDecoration: "underline", textAlign: "center" }}>
                  TOTAL ACTIVO: ${formatearNumero(balanceDataActual.totalActivos)}{" "}
                  - ${formatearNumero(balanceDataComparativo.totalActivos)}
                  <br />* Variación:{" "}
                  {
                    calcularVariacion(
                      balanceDataActual.totalActivos,
                      balanceDataComparativo.totalActivos
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      balanceDataActual.totalActivos,
                      balanceDataComparativo.totalActivos
                    ).variacionPorcentual
                  }
                  )
                </h5>
                <h4 style={{ textDecoration: "underline" }}>PASIVOS</h4>
                <h5>PASIVO CORRIENTE</h5>
                <ul>
                  <li>
                    Deudas Financieras a Corto Plazo:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.deudasCortoPlazo)} - ${formatearNumero(balanceDataComparativo.deudasCortoPlazo)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.deudasCortoPlazo, balanceDataComparativo.deudasCortoPlazo).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.deudasCortoPlazo, balanceDataComparativo.deudasCortoPlazo).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Deudas Comerciales y Otras Cuentas por Pagar a Corto Plazo:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.deudasComerciales)} - ${formatearNumero(balanceDataComparativo.deudasComerciales)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.deudasComerciales, balanceDataComparativo.deudasComerciales).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.deudasComerciales, balanceDataComparativo.deudasComerciales).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Beneficios a Empleados a Corto Plazo:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.beneficiosEmpleados)} - ${formatearNumero(balanceDataComparativo.beneficiosEmpleados)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.beneficiosEmpleados, balanceDataComparativo.beneficiosEmpleados).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.beneficiosEmpleados, balanceDataComparativo.beneficiosEmpleados).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Impuestos por Pagar:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.impuestosPorPagar)} - ${formatearNumero(balanceDataComparativo.impuestosPorPagar)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.impuestosPorPagar, balanceDataComparativo.impuestosPorPagar).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.impuestosPorPagar, balanceDataComparativo.impuestosPorPagar).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Dividendos por Pagar:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.dividendosPorPagar)} - ${formatearNumero(balanceDataComparativo.dividendosPorPagar)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.dividendosPorPagar, balanceDataComparativo.dividendosPorPagar).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.dividendosPorPagar, balanceDataComparativo.dividendosPorPagar).variacionPorcentual})
                    </span>
                  </li>
                </ul>
                <h5>PASIVO NO CORRIENTE </h5>
                <ul>
                  <li>
                    Deudas Financieras a Largo Plazo:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.deudasLargoPlazo)} - ${formatearNumero(balanceDataComparativo.deudasLargoPlazo)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.deudasLargoPlazo, balanceDataComparativo.deudasLargoPlazo).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.deudasLargoPlazo, balanceDataComparativo.deudasLargoPlazo).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Provisiones y Otros Pasivos a Largo Plazo:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.provisiones)} - ${formatearNumero(balanceDataComparativo.provisiones)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.provisiones, balanceDataComparativo.provisiones).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.provisiones, balanceDataComparativo.provisiones).variacionPorcentual})
                    </span>
                  </li>
                </ul>
                <h5 style={{ textAlign: "center", textDecoration: "underline" }}>
                  TOTAL PASIVO: ${formatearNumero(balanceDataActual.totalPasivos)}{" "}
                  - ${formatearNumero(balanceDataComparativo.totalPasivos)}
                  <br />* Variación:{" "}
                  {
                    calcularVariacion(
                      balanceDataActual.totalPasivos,
                      balanceDataComparativo.totalPasivos
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      balanceDataActual.totalPasivos,
                      balanceDataComparativo.totalPasivos
                    ).variacionPorcentual
                  }
                  )
                </h5>

                <h4>PATRIMONIO</h4>
                <ul>
                  <li>
                    Capital Social:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.capitalSocial)} - ${formatearNumero(balanceDataComparativo.capitalSocial)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.capitalSocial, balanceDataComparativo.capitalSocial).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.capitalSocial, balanceDataComparativo.capitalSocial).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Reservas:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.reservas)} - ${formatearNumero(balanceDataComparativo.reservas)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.reservas, balanceDataComparativo.reservas).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.reservas, balanceDataComparativo.reservas).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Resultados Acumulados:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.resultadosAcumulados)} - ${formatearNumero(balanceDataComparativo.resultadosAcumulados)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.resultadosAcumulados, balanceDataComparativo.resultadosAcumulados).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.resultadosAcumulados, balanceDataComparativo.resultadosAcumulados).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Resultados del Ejercicio:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.resultadosEjercicio)} - ${formatearNumero(balanceDataComparativo.resultadosEjercicio)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.resultadosEjercicio, balanceDataComparativo.resultadosEjercicio).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.resultadosEjercicio, balanceDataComparativo.resultadosEjercicio).variacionPorcentual})
                    </span>
                  </li>
                  <li>
                    Ajustes y Efectos por Valuación y Cambio de Valor:{" "}
                    <span style={{ float: "right" }}>
                      ${formatearNumero(balanceDataActual.ajustesEfectosValuacion)} - ${formatearNumero(balanceDataComparativo.ajustesEfectosValuacion)}
                    </span>
                    <br />
                    * Variación:{" "}
                    <span style={{ float: "right" }}>
                      {calcularVariacion(balanceDataActual.ajustesEfectosValuacion, balanceDataComparativo.ajustesEfectosValuacion).variacionAbsoluta} (
                      {calcularVariacion(balanceDataActual.ajustesEfectosValuacion, balanceDataComparativo.ajustesEfectosValuacion).variacionPorcentual})
                    </span>
                  </li>
                </ul>
                <h5 style={{ textAlign: "center", textDecoration: "underline" }}>
                  TOTAL PATRIMONIO:{" "}
                  ${formatearNumero(balanceDataActual.totalPatrimonio)} -{" "}
                  ${formatearNumero(balanceDataComparativo.totalPatrimonio)}
                  <br />* Variación:{" "}
                  {
                    calcularVariacion(
                      balanceDataActual.totalPatrimonio,
                      balanceDataComparativo.totalPatrimonio
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      balanceDataActual.totalPatrimonio,
                      balanceDataComparativo.totalPatrimonio
                    ).variacionPorcentual
                  }
                  )
                </h5>
                <h5 style={{ textAlign: "center", textDecoration: "underline" }}>
                  TOTAL PASIVO + PATRIMONIO:{" "}
                  ${formatearNumero(balanceDataActual.totalPasivosPatrimonio)} -{" "}
                  ${formatearNumero(balanceDataComparativo.totalPasivosPatrimonio)}
                  <br />* Variación:{" "}
                  {
                    calcularVariacion(
                      balanceDataActual.totalPasivosPatrimonio,
                      balanceDataComparativo.totalPasivosPatrimonio
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      balanceDataActual.totalPasivosPatrimonio,
                      balanceDataComparativo.totalPasivosPatrimonio
                    ).variacionPorcentual
                  }
                  )
                </h5>
              </div>
            </div>
          ) : (
            <div>
              <h4 style={{ paddingTop: "30px", textDecoration: "underline" }}>
                INGRESOS
              </h4>
              <li>
                Ingresos por Ventas:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.ventas)} -{" "}
                  ${formatearNumero(estadoDataComparativo.ventas)}
                </span>

                <br />* Variación:{" "}
                <span style={{ float: "right" }}>
                  {
                    calcularVariacion(
                      estadoDataActual.ventas,
                      estadoDataComparativo.ventas
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      estadoDataActual.ventas,
                      estadoDataComparativo.ventas
                    ).variacionPorcentual
                  }
                  )
                </span>
              </li>
              <li>
                Costo de Ventas:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.costoVenta)} -{" "}
                  ${formatearNumero(estadoDataComparativo.costoVenta)}
                </span>
                <br />* Variación:{" "}
                <span style={{ float: "right" }}>
                  {
                    calcularVariacion(
                      estadoDataActual.costoVenta,
                      estadoDataComparativo.costoVenta
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      estadoDataActual.costoVenta,
                      estadoDataComparativo.costoVenta
                    ).variacionPorcentual
                  }
                  )
                </span>
              </li>
              <h5 >
                Utilidad Bruta:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.utilidadBruta)} - ${formatearNumero(estadoDataComparativo.utilidadBruta)}
                </span>
                <br />
                * Variación:{" "}
                <span style={{ float: "right" }}>
                  {calcularVariacion(estadoDataActual.utilidadBruta, estadoDataComparativo.utilidadBruta).variacionAbsoluta} (
                  {calcularVariacion(estadoDataActual.utilidadBruta, estadoDataComparativo.utilidadBruta).variacionPorcentual})
                </span>
              </h5>
              <h4 style={{ paddingTop: "30px", textDecoration: "underline" }}>
                GASTOS DE OPERACIÓN
              </h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Administración:</span>
                  <span>${formatearNumero(estadoDataActual.administracion)} - ${formatearNumero(estadoDataComparativo.administracion)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Gerencia Financiera:</span>
                  <span>${formatearNumero(estadoDataActual.gerenciaFinanciera)} - ${formatearNumero(estadoDataComparativo.gerenciaFinanciera)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Auditoría Interna:</span>
                  <span>${formatearNumero(estadoDataActual.auditoriaInterna)} - ${formatearNumero(estadoDataComparativo.auditoriaInterna)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Gerencia Ventas y Mercadeo:</span>
                  <span>${formatearNumero(estadoDataActual.gerenciaVentasMercadeo)} - ${formatearNumero(estadoDataComparativo.gerenciaVentasMercadeo)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>División Avícola:</span>
                  <span>${formatearNumero(estadoDataActual.divisionAvicola)} - ${formatearNumero(estadoDataComparativo.divisionAvicola)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Dirección:</span>
                  <span>${formatearNumero(estadoDataActual.direccion)} - ${formatearNumero(estadoDataComparativo.direccion)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Cadena de Suministros:</span>
                  <span>${formatearNumero(estadoDataActual.cadenaSuministros)} - ${formatearNumero(estadoDataComparativo.cadenaSuministros)}</span>
                </li>
              </ul>
              <h5 >
                Utilidad de Operacion:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.utilidadOperacion)} - ${formatearNumero(estadoDataComparativo.utilidadOperacion)}
                </span>
                <br />
                * Variación:{" "}
                <span style={{ float: "right" }}>
                  {calcularVariacion(estadoDataActual.utilidadOperacion, estadoDataComparativo.utilidadOperacion).variacionAbsoluta} (
                  {calcularVariacion(estadoDataActual.utilidadOperacion, estadoDataComparativo.utilidadOperacion).variacionPorcentual})
                </span>
              </h5>
              <h4 style={{ paddingTop: "30px", textDecoration: "underline" }}>
                GASTOS NO OPERACIONALES
              </h4>
              <li>
                Gastos Financieros:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.gastosFinancieros)} -{" "}
                  ${formatearNumero(estadoDataComparativo.gastosFinancieros)}
                </span>
                <br />* Variación:{" "}
                <span style={{ float: "right" }}>
                  {
                    calcularVariacion(
                      estadoDataActual.gastosFinancieros,
                      estadoDataComparativo.gastosFinancieros
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      estadoDataActual.gastosFinancieros,
                      estadoDataComparativo.gastosFinancieros
                    ).variacionPorcentual
                  }
                  )
                </span>
              </li>
              <li>
                Otros Gastos No Operacionales:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.otrosGastosNoOperacionales)} -{" "}
                  ${formatearNumero(estadoDataComparativo.otrosGastosNoOperacionales)}
                </span>
                <br />* Variación:{" "}
                <span style={{ float: "right" }}>
                  {
                    calcularVariacion(
                      estadoDataActual.otrosGastosNoOperacionales,
                      estadoDataComparativo.otrosGastosNoOperacionales
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      estadoDataActual.otrosGastosNoOperacionales,
                      estadoDataComparativo.otrosGastosNoOperacionales
                    ).variacionPorcentual
                  }
                  )
                </span>
              </li>
              <h5 >
                Utilidad Antes de Impuestos y Reserva:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.utilidadAntesImpuestosReserva)} - ${formatearNumero(estadoDataComparativo.utilidadAntesImpuestosReserva)}
                </span>
                <br />
                * Variación:{" "}
                <span style={{ float: "right" }}>
                  {calcularVariacion(estadoDataActual.utilidadAntesImpuestosReserva, estadoDataComparativo.utilidadAntesImpuestosReserva).variacionAbsoluta} (
                  {calcularVariacion(estadoDataActual.utilidadAntesImpuestosReserva, estadoDataComparativo.utilidadAntesImpuestosReserva).variacionPorcentual})
                </span>
              </h5>
              <h4 style={{ paddingTop: "30px", textDecoration: "underline" }}>
                RESERVA LEGAL
              </h4>
              <li>
                Reserva Legal (7%):{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.reservaLegal)} -{" "}
                  ${formatearNumero(estadoDataComparativo.reservaLegal)}
                </span>
                <br />* Variación:{" "}
                <span style={{ float: "right" }}>
                  {
                    calcularVariacion(
                      estadoDataActual.reservaLegal,
                      estadoDataComparativo.reservaLegal
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      estadoDataActual.reservaLegal,
                      estadoDataComparativo.reservaLegal
                    ).variacionPorcentual
                  }
                  )
                </span>
              </li>
              <h4 style={{ paddingTop: "30px", textDecoration: "underline" }}>
                UTILIDAD ANTES DE IMPUESTO
              </h4>
              <li>
                Utilidad Antes de Impuesto:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.utilidadAntesImpuesto)} -{" "}
                  ${formatearNumero(estadoDataComparativo.utilidadAntesImpuesto)}
                </span>
                <br />* Variación:{" "}
                <span style={{ float: "right" }}>
                  {
                    calcularVariacion(
                      estadoDataActual.utilidadAntesImpuesto,
                      estadoDataComparativo.utilidadAntesImpuesto
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      estadoDataActual.utilidadAntesImpuesto,
                      estadoDataComparativo.utilidadAntesImpuesto
                    ).variacionPorcentual
                  }
                  )
                </span>
              </li>
              <h4 style={{ paddingTop: "30px", textDecoration: "underline" }}>
                IMPUESTO SOBRE LA RENTA
              </h4>
              <li>
                Impuesto sobre la Renta:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.impuestoRenta)} -{" "}
                  ${formatearNumero(estadoDataComparativo.impuestoRenta)}
                </span>
                <br />* Variación:{" "}
                <span style={{ float: "right" }}>
                  {
                    calcularVariacion(
                      estadoDataActual.impuestoRenta,
                      estadoDataComparativo.impuestoRenta
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      estadoDataActual.impuestoRenta,
                      estadoDataComparativo.impuestoRenta
                    ).variacionPorcentual
                  }
                  )
                </span>
              </li>
              <li>
                CESC grandes contribuyentes:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.cescGrandesContribuyentes)} -{" "}
                  ${formatearNumero(estadoDataComparativo.cescGrandesContribuyentes)}
                </span>
                <br />* Variación:{" "}
                <span style={{ float: "right" }}>
                  {
                    calcularVariacion(
                      estadoDataActual.cescGrandesContribuyentes,
                      estadoDataComparativo.cescGrandesContribuyentes
                    ).variacionAbsoluta
                  }{" "}
                  (
                  {
                    calcularVariacion(
                      estadoDataActual.cescGrandesContribuyentes,
                      estadoDataComparativo.cescGrandesContribuyentes
                    ).variacionPorcentual
                  }
                  )
                </span>
              </li>
              <h5 >
                Utilidad Distribuible:{" "}
                <span style={{ float: "right" }}>
                  ${formatearNumero(estadoDataActual.utilidadDistribuible)} - ${formatearNumero(estadoDataComparativo.utilidadDistribuible)}
                </span>
                <br />
                * Variación:{" "}
                <span style={{ float: "right" }}>
                  {calcularVariacion(estadoDataActual.utilidadDistribuible, estadoDataComparativo.utilidadDistribuible).variacionAbsoluta} (
                  {calcularVariacion(estadoDataActual.utilidadDistribuible, estadoDataComparativo.utilidadDistribuible).variacionPorcentual})
                </span>
              </h5>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default AnalisisHorizontal;
