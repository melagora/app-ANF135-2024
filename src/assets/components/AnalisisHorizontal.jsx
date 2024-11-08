import { useState, useEffect } from "react";
import '../css/Estado.css';
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
    const storedBalanceData = JSON.parse(localStorage.getItem('balances'));
    const storedEstadoData = JSON.parse(localStorage.getItem('estados'));

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
    return parseFloat(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calcularVariacion = (valorActual, valorComparativo) => {
    const variacionAbsoluta = valorActual - valorComparativo;
    const variacionPorcentual = (variacionAbsoluta / valorComparativo) * 100;
    return {
      variacionAbsoluta: formatearNumero(variacionAbsoluta),
      variacionPorcentual: formatearNumero(variacionPorcentual) + '%',
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

      pdf.save(`AnalisisHorizontal_${tipoReporte}_${añoSeleccionado}_vs_${añoComparativo}.pdf`);
    });
  };

  return (
    <div className="estado-container">
      <div className="centrar">
        <h4>Saram S.A de C.V.</h4>
        <h4>Análisis Horizontal del {tipoReporte}</h4>
        <h5>Comparación de {añoSeleccionado} con {añoComparativo}</h5>
        <h5>Cifras expresadas en miles de dólares de los Estados Unidos de América</h5>
      </div>

      <div className="form-group">
        <label>Seleccionar Tipo de Reporte:</label>
        <select onChange={(e) => setTipoReporte(e.target.value)} value={tipoReporte}>
          <option value="Balance General">Balance General</option>
          <option value="Estado de Resultados">Estado de Resultados</option>
        </select>

        <label>Seleccionar Año Actual:</label>
        <select onChange={(e) => setAñoSeleccionado(e.target.value)} value={añoSeleccionado}>
          <option value="">-- Seleccionar Año --</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>

        <label>Seleccionar Año Comparativo:</label>
        <select onChange={(e) => setAñoComparativo(e.target.value)} value={añoComparativo}>
          <option value="">-- Seleccionar Año --</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>

        {añoSeleccionado && añoComparativo && (
          <button onClick={generarPDF}>Generar PDF</button>
        )}
      </div>

      {(balanceDataActual && balanceDataComparativo) || (estadoDataActual && estadoDataComparativo) ? (
        <div id="pdfContent">
          {tipoReporte === "Balance General" ? (
            <div>
              <h4>ACTIVOS</h4>
              <h5>ACTIVO CORRIENTE</h5>
              <ul>
                <li>Efectivo y Equivalentes al Efectivo: {formatearNumero(balanceDataActual.efectivo)} - {formatearNumero(balanceDataComparativo.efectivo)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.efectivo, balanceDataComparativo.efectivo).variacionAbsoluta} ({calcularVariacion(balanceDataActual.efectivo, balanceDataComparativo.efectivo).variacionPorcentual})</li>
                <li>Inversiones Financieras a Corto Plazo: {formatearNumero(balanceDataActual.inversionesCortoPlazo)} - {formatearNumero(balanceDataComparativo.inversionesCortoPlazo)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.inversionesCortoPlazo, balanceDataComparativo.inversionesCortoPlazo).variacionAbsoluta} ({calcularVariacion(balanceDataActual.inversionesCortoPlazo, balanceDataComparativo.inversionesCortoPlazo).variacionPorcentual})</li>
                <li>Deudores Comerciales y Otras Cuentas por Cobrar: {formatearNumero(balanceDataActual.deudoresComerciales)} - {formatearNumero(balanceDataComparativo.deudoresComerciales)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.deudoresComerciales, balanceDataComparativo.deudoresComerciales).variacionAbsoluta} ({calcularVariacion(balanceDataActual.deudoresComerciales, balanceDataComparativo.deudoresComerciales).variacionPorcentual})</li>
                <li>Inventarios: {formatearNumero(balanceDataActual.inventarios)} - {formatearNumero(balanceDataComparativo.inventarios)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.inventarios, balanceDataComparativo.inventarios).variacionAbsoluta} ({calcularVariacion(balanceDataActual.inventarios, balanceDataComparativo.inventarios).variacionPorcentual})</li>
                <li>Pagos Anticipados: {formatearNumero(balanceDataActual.pagosAnticipados)} - {formatearNumero(balanceDataComparativo.pagosAnticipados)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.pagosAnticipados, balanceDataComparativo.pagosAnticipados).variacionAbsoluta} ({calcularVariacion(balanceDataActual.pagosAnticipados, balanceDataComparativo.pagosAnticipados).variacionPorcentual})</li>
              </ul>
              <h5>ACTIVO NO CORRIENTE</h5>
              <ul>
                <li>Propiedad, Planta y Equipo (neto): {formatearNumero(balanceDataActual.propiedadPlantaEquipo)} - {formatearNumero(balanceDataComparativo.propiedadPlantaEquipo)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.propiedadPlantaEquipo, balanceDataComparativo.propiedadPlantaEquipo).variacionAbsoluta} ({calcularVariacion(balanceDataActual.propiedadPlantaEquipo, balanceDataComparativo.propiedadPlantaEquipo).variacionPorcentual})</li>
                <li>Activo Biológico: {formatearNumero(balanceDataActual.activoBiologico)} - {formatearNumero(balanceDataComparativo.activoBiologico)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.activoBiologico, balanceDataComparativo.activoBiologico).variacionAbsoluta} ({calcularVariacion(balanceDataActual.activoBiologico, balanceDataComparativo.activoBiologico).variacionPorcentual})</li>
                <li>Intangibles: {formatearNumero(balanceDataActual.intangibles)} - {formatearNumero(balanceDataComparativo.intangibles)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.intangibles, balanceDataComparativo.intangibles).variacionAbsoluta} ({calcularVariacion(balanceDataActual.intangibles, balanceDataComparativo.intangibles).variacionPorcentual})</li>
                <li>Inversiones Financieras a Largo Plazo: {formatearNumero(balanceDataActual.inversionesLargoPlazo)} - {formatearNumero(balanceDataComparativo.inversionesLargoPlazo)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.inversionesLargoPlazo, balanceDataComparativo.inversionesLargoPlazo).variacionAbsoluta} ({calcularVariacion(balanceDataActual.inversionesLargoPlazo, balanceDataComparativo.inversionesLargoPlazo).variacionPorcentual})</li>
                <li>Proyectos en Proceso: {formatearNumero(balanceDataActual.proyectosProceso)} - {formatearNumero(balanceDataComparativo.proyectosProceso)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.proyectosProceso, balanceDataComparativo.proyectosProceso).variacionAbsoluta} ({calcularVariacion(balanceDataActual.proyectosProceso, balanceDataComparativo.proyectosProceso).variacionPorcentual})</li>
              </ul>
              <h5>TOTAL ACTIVO: {formatearNumero(balanceDataActual.totalActivos)} - {formatearNumero(balanceDataComparativo.totalActivos)}
                <br />* Variación: {calcularVariacion(balanceDataActual.totalActivos, balanceDataComparativo.totalActivos).variacionAbsoluta} ({calcularVariacion(balanceDataActual.totalActivos, balanceDataComparativo.totalActivos).variacionPorcentual})</h5>

              <h4>PASIVOS</h4>
              <h5>PASIVO CORRIENTE</h5>
              <ul>
                <li>Deudas Financieras a Corto Plazo: {formatearNumero(balanceDataActual.deudasCortoPlazo)} - {formatearNumero(balanceDataComparativo.deudasCortoPlazo)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.deudasCortoPlazo, balanceDataComparativo.deudasCortoPlazo).variacionAbsoluta} ({calcularVariacion(balanceDataActual.deudasCortoPlazo, balanceDataComparativo.deudasCortoPlazo).variacionPorcentual})</li>
                <li>Deudas Comerciales y Otras Cuentas por Pagar a Corto Plazo: {formatearNumero(balanceDataActual.deudasComerciales)} - {formatearNumero(balanceDataComparativo.deudasComerciales)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.deudasComerciales, balanceDataComparativo.deudasComerciales).variacionAbsoluta} ({calcularVariacion(balanceDataActual.deudasComerciales, balanceDataComparativo.deudasComerciales).variacionPorcentual})</li>
                <li>Beneficios a Empleados a Corto Plazo: {formatearNumero(balanceDataActual.beneficiosEmpleados)} - {formatearNumero(balanceDataComparativo.beneficiosEmpleados)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.beneficiosEmpleados, balanceDataComparativo.beneficiosEmpleados).variacionAbsoluta} ({calcularVariacion(balanceDataActual.beneficiosEmpleados, balanceDataComparativo.beneficiosEmpleados).variacionPorcentual})</li>
                <li>Impuestos por Pagar: {formatearNumero(balanceDataActual.impuestosPorPagar)} - {formatearNumero(balanceDataComparativo.impuestosPorPagar)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.impuestosPorPagar, balanceDataComparativo.impuestosPorPagar).variacionAbsoluta} ({calcularVariacion(balanceDataActual.impuestosPorPagar, balanceDataComparativo.impuestosPorPagar).variacionPorcentual})</li>
                <li>Dividendos por Pagar: {formatearNumero(balanceDataActual.dividendosPorPagar)} - {formatearNumero(balanceDataComparativo.dividendosPorPagar)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.dividendosPorPagar, balanceDataComparativo.dividendosPorPagar).variacionAbsoluta} ({calcularVariacion(balanceDataActual.dividendosPorPagar, balanceDataComparativo.dividendosPorPagar).variacionPorcentual})</li>
              </ul>
              <h5>PASIVO NO CORRIENTE </h5>
              <ul>
                <li>Deudas Financieras a Largo Plazo: {formatearNumero(balanceDataActual.deudasLargoPlazo)} - {formatearNumero(balanceDataComparativo.deudasLargoPlazo)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.deudasLargoPlazo, balanceDataComparativo.deudasLargoPlazo).variacionAbsoluta} ({calcularVariacion(balanceDataActual.deudasLargoPlazo, balanceDataComparativo.deudasLargoPlazo).variacionPorcentual})</li>
                <li>Provisiones y Otros Pasivos a Largo Plazo: {formatearNumero(balanceDataActual.provisiones)} - {formatearNumero(balanceDataComparativo.provisiones)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.provisiones, balanceDataComparativo.provisiones).variacionAbsoluta} ({calcularVariacion(balanceDataActual.provisiones, balanceDataComparativo.provisiones).variacionPorcentual})</li>
              </ul>
              <h5>TOTAL PASIVO: {formatearNumero(balanceDataActual.totalPasivos)} - {formatearNumero(balanceDataComparativo.totalPasivos)}
                <br />* Variación: {calcularVariacion(balanceDataActual.totalPasivos, balanceDataComparativo.totalPasivos).variacionAbsoluta} ({calcularVariacion(balanceDataActual.totalPasivos, balanceDataComparativo.totalPasivos).variacionPorcentual})</h5>

              <h4>PATRIMONIO</h4>
              <ul>
                <li>Capital Social: {formatearNumero(balanceDataActual.capitalSocial)} - {formatearNumero(balanceDataComparativo.capitalSocial)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.capitalSocial, balanceDataComparativo.capitalSocial).variacionAbsoluta} ({calcularVariacion(balanceDataActual.capitalSocial, balanceDataComparativo.capitalSocial).variacionPorcentual})</li>
                <li>Reservas: {formatearNumero(balanceDataActual.reservas)} - {formatearNumero(balanceDataComparativo.reservas)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.reservas, balanceDataComparativo.reservas).variacionAbsoluta} ({calcularVariacion(balanceDataActual.reservas, balanceDataComparativo.reservas).variacionPorcentual})</li>
                <li>Resultados Acumulados: {formatearNumero(balanceDataActual.resultadosAcumulados)} - {formatearNumero(balanceDataComparativo.resultadosAcumulados)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.resultadosAcumulados, balanceDataComparativo.resultadosAcumulados).variacionAbsoluta} ({calcularVariacion(balanceDataActual.resultadosAcumulados, balanceDataComparativo.resultadosAcumulados).variacionPorcentual})</li>
                <li>Resultados del Ejercicio: {formatearNumero(balanceDataActual.resultadosEjercicio)} - {formatearNumero(balanceDataComparativo.resultadosEjercicio)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.resultadosEjercicio, balanceDataComparativo.resultadosEjercicio).variacionAbsoluta} ({calcularVariacion(balanceDataActual.resultadosEjercicio, balanceDataComparativo.resultadosEjercicio).variacionPorcentual})</li>
                <li>Ajustes y Efectos por Valuación y Cambio de Valor: {formatearNumero(balanceDataActual.ajustesEfectosValuacion)} - {formatearNumero(balanceDataComparativo.ajustesEfectosValuacion)}
                  <br />* Variación: {calcularVariacion(balanceDataActual.ajustesEfectosValuacion, balanceDataComparativo.ajustesEfectosValuacion).variacionAbsoluta} ({calcularVariacion(balanceDataActual.ajustesEfectosValuacion, balanceDataComparativo.ajustesEfectosValuacion).variacionPorcentual})</li>
              </ul>
              <h5>TOTAL PATRIMONIO: {formatearNumero(balanceDataActual.totalPatrimonio)} - {formatearNumero(balanceDataComparativo.totalPatrimonio)}
                <br />* Variación: {calcularVariacion(balanceDataActual.totalPatrimonio, balanceDataComparativo.totalPatrimonio).variacionAbsoluta} ({calcularVariacion(balanceDataActual.totalPatrimonio, balanceDataComparativo.totalPatrimonio).variacionPorcentual})</h5>
              <h5>TOTAL PASIVO + PATRIMONIO: {formatearNumero(balanceDataActual.totalPasivosPatrimonio)} - {formatearNumero(balanceDataComparativo.totalPasivosPatrimonio)}
                <br />* Variación: {calcularVariacion(balanceDataActual.totalPasivosPatrimonio, balanceDataComparativo.totalPasivosPatrimonio).variacionAbsoluta} ({calcularVariacion(balanceDataActual.totalPasivosPatrimonio, balanceDataComparativo.totalPasivosPatrimonio).variacionPorcentual})</h5>

            </div>
          ) : (
            <div>
              <h4>ESTADO DE RESULTADOS</h4>
              <ul>
                <li>Ingresos por Ventas: {formatearNumero(estadoDataActual.ventas)} - {formatearNumero(estadoDataComparativo.ventas)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.ventas, estadoDataComparativo.ventas).variacionAbsoluta} ({calcularVariacion(estadoDataActual.ventas, estadoDataComparativo.ingresosVentas).variacionPorcentual})</li>
                {/* Agrega los demás rubros de Estado de Resultados aquí */}
                <li>Costo de Ventas: {formatearNumero(estadoDataActual.costoVentas)} - {formatearNumero(estadoDataComparativo.costoVentas)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.costoVentas, estadoDataComparativo.costoVentas).variacionAbsoluta} ({calcularVariacion(estadoDataActual.costoVentas, estadoDataComparativo.costoVentas).variacionPorcentual})</li>

                <li>Gastos de Operación: {formatearNumero(estadoDataActual.gastosOperacion)} - {formatearNumero(estadoDataComparativo.gastosOperacion)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.gastosOperacion, estadoDataComparativo.gastosOperacion).variacionAbsoluta} ({calcularVariacion(estadoDataActual.gastosOperacion, estadoDataComparativo.gastosOperacion).variacionPorcentual})</li>

                <li>Gastos Financieros: {formatearNumero(estadoDataActual.gastosFinancieros)} - {formatearNumero(estadoDataComparativo.gastosFinancieros)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.gastosFinancieros, estadoDataComparativo.gastosFinancieros).variacionAbsoluta} ({calcularVariacion(estadoDataActual.gastosFinancieros, estadoDataComparativo.gastosFinancieros).variacionPorcentual})</li>

                <li>Ingresos Financieros: {formatearNumero(estadoDataActual.ingresosFinancieros)} - {formatearNumero(estadoDataComparativo.ingresosFinancieros)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.ingresosFinancieros, estadoDataComparativo.ingresosFinancieros).variacionAbsoluta} ({calcularVariacion(estadoDataActual.ingresosFinancieros, estadoDataComparativo.ingresosFinancieros).variacionPorcentual})</li>

                <li>Otros Ingresos: {formatearNumero(estadoDataActual.otrosIngresos)} - {formatearNumero(estadoDataComparativo.otrosIngresos)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.otrosIngresos, estadoDataComparativo.otrosIngresos).variacionAbsoluta} ({calcularVariacion(estadoDataActual.otrosIngresos, estadoDataComparativo.otrosIngresos).variacionPorcentual})</li>

                <li>Utilidad Antes de Impuestos: {formatearNumero(estadoDataActual.utilidadAntesImpuestos)} - {formatearNumero(estadoDataComparativo.utilidadAntesImpuestos)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.utilidadAntesImpuestos, estadoDataComparativo.utilidadAntesImpuestos).variacionAbsoluta} ({calcularVariacion(estadoDataActual.utilidadAntesImpuestos, estadoDataComparativo.utilidadAntesImpuestos).variacionPorcentual})</li>

                <li>Impuestos sobre la Renta: {formatearNumero(estadoDataActual.impuestosRenta)} - {formatearNumero(estadoDataComparativo.impuestosRenta)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.impuestosRenta, estadoDataComparativo.impuestosRenta).variacionAbsoluta} ({calcularVariacion(estadoDataActual.impuestosRenta, estadoDataComparativo.impuestosRenta).variacionPorcentual})</li>

                <li>Utilidad Neta: {formatearNumero(estadoDataActual.utilidadNeta)} - {formatearNumero(estadoDataComparativo.utilidadNeta)}
                  <br />* Variación: {calcularVariacion(estadoDataActual.utilidadNeta, estadoDataComparativo.utilidadNeta).variacionAbsoluta} ({calcularVariacion(estadoDataActual.utilidadNeta, estadoDataComparativo.utilidadNeta).variacionPorcentual})</li>
              </ul>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default AnalisisHorizontal;

