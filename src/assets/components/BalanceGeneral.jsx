import { useState } from "react";
import '../css/Estado.css'; // Asegúrate de importar el CSS
import { balances } from './Datos';// Importa los datos
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BalanceGeneral() {
  const [añoSeleccionado, setAñoSeleccionado] = useState('');
  const [balanceData, setBalanceData] = useState(null);

  const handleAñoChange = (e) => {
    const año = e.target.value;
    setAñoSeleccionado(año);

    if (balances[año]) {
      setBalanceData(balances[año]);
    } else {
      setBalanceData(null);
    }
  };

  const descargarJson = () => {
    if (!balanceData) {
      alert('Selecciona un año para descargar el balance.');
      return;
    }

    const data = { balance: balanceData };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `balance_general_${añoSeleccionado}.json`;
    link.click();

    URL.revokeObjectURL(url); // Liberar la URL del blob
  };

  const formatearNumero = (numero) => {
    return parseFloat(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

      pdf.save(`BalanceGeneral_SARAM_${añoSeleccionado}.pdf`);
    });
  };

  return (
    <div className="estado-container">
      <div className="centrar">
        <h4>Saram S.A de C.V.</h4>
        <h4>Balance General</h4>
        <h5>Del 1 de enero hasta el 31 de diciembre del {añoSeleccionado}</h5>
        <h5>Cifras expresadas en miles de dólares de los Estados Unidos de América</h5>
      </div>

      <div className="form-group">
        <label>Seleccionar Año:</label>
        <select onChange={handleAñoChange} value={añoSeleccionado}>
          <option value="">-- Seleccionar Año --</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
        {/* Mostrar el botón solo si se ha seleccionado un año */}
        {añoSeleccionado && (
          <button onClick={generarPDF}>Generar PDF</button>
        )}
      </div>

      {añoSeleccionado && balanceData ? (
        <div id="pdfContent">
          <div>
            <h4>ACTIVOS</h4>
            <h5>ACTIVO CORRIENTE</h5>
            <ul>
              <li>Efectivo y Equivalentes al Efectivo: {formatearNumero(balanceData.efectivo)}</li>
              <li>Inversiones Financieras a Corto Plazo: {formatearNumero(balanceData.inversionesCortoPlazo)}</li>
              <li>Deudores Comerciales y Otras Cuentas por Cobrar: {formatearNumero(balanceData.deudoresComerciales)}</li>
              <li>Inventarios: {formatearNumero(balanceData.inventarios)}</li>
              <li>Pagos Anticipados: {formatearNumero(balanceData.pagosAnticipados)}</li>
            </ul>
            <h5>TOTAL ACTIVO CORRIENTE: {formatearNumero(balanceData.totalActivoCorriente)}</h5>

            <h5>ACTIVO NO CORRIENTE</h5>
            <ul>
              <li>Propiedad, Planta y Equipo (neto): {formatearNumero(balanceData.propiedadPlantaEquipo)}</li>
              <li>Activo Biológico: {formatearNumero(balanceData.activoBiologico)}</li>
              <li>Intangibles: {formatearNumero(balanceData.intangibles)}</li>
              <li>Inversiones Financieras a Largo Plazo: {formatearNumero(balanceData.inversionesLargoPlazo)}</li>
              <li>Proyectos en Proceso: {formatearNumero(balanceData.proyectosProceso)}</li>
            </ul>
            <h5>TOTAL ACTIVO NO CORRIENTE: {formatearNumero(balanceData.totalActivoNoCorriente)}</h5>

            <h5>TOTAL ACTIVO: {formatearNumero(balanceData.totalActivos)}</h5>

            <h4>PASIVOS</h4>
            <h5>PASIVO CORRIENTE</h5>
            <ul>
              <li>Deudas Financieras a Corto Plazo: {formatearNumero(balanceData.deudasCortoPlazo)}</li>
              <li>Deudas Comerciales y Otras Cuentas por Pagar a Corto Plazo: {formatearNumero(balanceData.deudasComerciales)}</li>
              <li>Beneficios a Empleados a Corto Plazo: {formatearNumero(balanceData.beneficiosEmpleados)}</li>
              <li>Impuestos por Pagar: {formatearNumero(balanceData.impuestosPorPagar)}</li>
              <li>Dividendos por Pagar: {formatearNumero(balanceData.dividendosPorPagar)}</li>
            </ul>
            <h5>TOTAL PASIVO CORRIENTE: {formatearNumero(balanceData.totalPasivoCorriente)}</h5>

            <h5>PASIVO NO CORRIENTE</h5>
            <ul>
              <li>Deudas Financieras a Largo Plazo: {formatearNumero(balanceData.deudasLargoPlazo)}</li>
              <li>Provisiones y Otros Pasivos a Largo Plazo: {formatearNumero(balanceData.provisiones)}</li>
            </ul>
            <h5>TOTAL PASIVO NO CORRIENTE: {formatearNumero(balanceData.totalPasivoNoCorriente)}</h5>

            <h5>TOTAL PASIVO: {formatearNumero(balanceData.totalPasivos)}</h5>

            <h4>PATRIMONIO</h4>
            <ul>
              <li>Capital Social: {formatearNumero(balanceData.capitalSocial)}</li>
              <li>Reservas: {formatearNumero(balanceData.reservas)}</li>
              <li>Resultados Acumulados: {formatearNumero(balanceData.resultadosAcumulados)}</li>
              <li>Resultados del Ejercicio: {formatearNumero(balanceData.resultadosEjercicio)}</li>
              <li>Ajustes y Efectos por Valuación y Cambio de Valor: {formatearNumero(balanceData.ajustesEfectosValuacion)}</li>
            </ul>
            <h5>TOTAL PATRIMONIO: {formatearNumero(balanceData.totalPatrimonio)}</h5>

            <h5>TOTAL PASIVO Y PATRIMONIO: {formatearNumero(balanceData.totalPasivosPatrimonio)}</h5>

            <button onClick={descargarJson}>Descargar JSON</button>
          </div>
        </div>

      ) : (
        <p>Por favor, selecciona un año para ver el balance general.</p>
      )}
    </div>
  );
}

export default BalanceGeneral;
