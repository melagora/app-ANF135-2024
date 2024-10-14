import React, { useState } from "react";
import '../css/BalanceGeneral.css'; // Asegúrate de importar el CSS


function BalanceGeneral() {
  const [añoSeleccionado, setAñoSeleccionado] = useState('');
  const [balanceData, setBalanceData] = useState(null);

  const handleAñoChange = (e) => {
    const año = e.target.value;
    setAñoSeleccionado(año);

    const balances = JSON.parse(localStorage.getItem('balances'));
    if (balances && balances[año]) {
      setBalanceData(balances[año]);
    } else {
      setBalanceData(null);
    }
  };

  const calcularTotalActivoCorriente = () => {
    return parseFloat(balanceData.efectivo || 0) +
           parseFloat(balanceData.inversionesCortoPlazo || 0) +
           parseFloat(balanceData.deudoresComerciales || 0) +
           parseFloat(balanceData.inventarios || 0) +
           parseFloat(balanceData.pagosAnticipados || 0);
  };

  const calcularTotalActivoNoCorriente = () => {
    return parseFloat(balanceData.propiedadPlantaEquipo || 0) +
           parseFloat(balanceData.activoBiologico || 0) +
           parseFloat(balanceData.intangibles || 0) +
           parseFloat(balanceData.inversionesLargoPlazo || 0) +
           parseFloat(balanceData.proyectosProceso || 0);
  };

  const calcularTotalPasivoCorriente = () => {
    return parseFloat(balanceData.deudasCortoPlazo || 0) +
           parseFloat(balanceData.deudasComerciales || 0) +
           parseFloat(balanceData.beneficiosEmpleados || 0) +
           parseFloat(balanceData.impuestosPorPagar || 0) +
           parseFloat(balanceData.dividendosPorPagar || 0);
  };

  const calcularTotalPasivoNoCorriente = () => {
    return parseFloat(balanceData.deudasLargoPlazo || 0) +
           parseFloat(balanceData.provisiones || 0);
  };

  const calcularTotalPatrimonio = () => {
    return parseFloat(balanceData.capitalSocial || 0) +
           parseFloat(balanceData.reservas || 0) +
           parseFloat(balanceData.resultadosAcumulados || 0) +
           parseFloat(balanceData.resultadosEjercicio || 0) +
           parseFloat(balanceData.ajustesEfectosValuacion || 0);
  };

  const calcularTotalActivos = () => {
    return calcularTotalActivoCorriente() + calcularTotalActivoNoCorriente();
  };

  const calcularTotalPasivos = () => {
    return calcularTotalPasivoCorriente() + calcularTotalPasivoNoCorriente();
  };

  return (
    <div className="balance-general-container">
      <h3>Balance General</h3>

      <div className="form-group">
        <label>
          Seleccionar Año:
        </label>
        <select onChange={handleAñoChange} value={añoSeleccionado}>
          <option value="">-- Seleccionar Año --</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>

      {balanceData ? (
        <div>
          <h4>ACTIVOS</h4>
          <h5>ACTIVO CORRIENTE</h5>
          <ul>
            <li>Efectivo y Equivalentes al Efectivo: {balanceData.efectivo}</li>
            <li>Inversiones Financieras a Corto Plazo: {balanceData.inversionesCortoPlazo}</li>
            <li>Deudores Comerciales y Otras Cuentas por Cobrar: {balanceData.deudoresComerciales}</li>
            <li>Inventarios: {balanceData.inventarios}</li>
            <li>Pagos Anticipados: {balanceData.pagosAnticipados}</li>
          </ul>
          <h5>TOTAL ACTIVO CORRIENTE: {calcularTotalActivoCorriente()}</h5>

          <h5>ACTIVO NO CORRIENTE</h5>
          <ul>
            <li>Propiedad, Planta y Equipo (neto): {balanceData.propiedadPlantaEquipo}</li>
            <li>Activo Biológico: {balanceData.activoBiologico}</li>
            <li>Intangibles: {balanceData.intangibles}</li>
            <li>Inversiones Financieras a Largo Plazo: {balanceData.inversionesLargoPlazo}</li>
            <li>Proyectos en Proceso: {balanceData.proyectosProceso}</li>
          </ul>
          <h5>TOTAL ACTIVO NO CORRIENTE: {calcularTotalActivoNoCorriente()}</h5>

          <h5>TOTAL ACTIVO: {calcularTotalActivos()}</h5>

          <h4>PASIVOS</h4>
          <h5>PASIVO CORRIENTE</h5>
          <ul>
            <li>Deudas Financieras a Corto Plazo: {balanceData.deudasCortoPlazo}</li>
            <li>Deudas Comerciales y Otras Cuentas por Pagar a Corto Plazo: {balanceData.deudasComerciales}</li>
            <li>Beneficios a Empleados a Corto Plazo: {balanceData.beneficiosEmpleados}</li>
            <li>Impuestos por Pagar: {balanceData.impuestosPorPagar}</li>
            <li>Dividendos por Pagar: {balanceData.dividendosPorPagar}</li>
          </ul>
          <h5>TOTAL PASIVO CORRIENTE: {calcularTotalPasivoCorriente()}</h5>

          <h5>PASIVO NO CORRIENTE</h5>
          <ul>
            <li>Deudas Financieras a Largo Plazo: {balanceData.deudasLargoPlazo}</li>
            <li>Provisiones y Otros Pasivos a Largo Plazo: {balanceData.provisiones}</li>
          </ul>
          <h5>TOTAL PASIVO NO CORRIENTE: {calcularTotalPasivoNoCorriente()}</h5>

          <h5>TOTAL PASIVO: {calcularTotalPasivos()}</h5>

          <h4>PATRIMONIO</h4>
          <ul>
            <li>Capital Social: {balanceData.capitalSocial}</li>
            <li>Reservas: {balanceData.reservas}</li>
            <li>Resultados Acumulados: {balanceData.resultadosAcumulados}</li>
            <li>Resultados del Ejercicio: {balanceData.resultadosEjercicio}</li>
            <li>Ajustes y Efectos por Valuación y Cambio de Valor: {balanceData.ajustesEfectosValuacion}</li>
          </ul>
          <h5>TOTAL PATRIMONIO: {calcularTotalPatrimonio()}</h5>

          <h5>TOTAL PASIVO Y PATRIMONIO: {calcularTotalPasivos() + calcularTotalPatrimonio()}</h5>
        </div>
      ) : (
        <p>Por favor, selecciona un año para ver el balance general.</p>
      )}
    </div>
  );
}

export default BalanceGeneral;
