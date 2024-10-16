import React, { useState } from "react";
import '../css/Estado.css'; // Asegúrate de importar el CSS

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

  // Función para formatear los números
  const formatearNumero = (numero) => {
    return parseFloat(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    <div className="estado-container">
      <h3>Balance General</h3>

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
      </div>

      {balanceData ? (
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
          <h5>TOTAL ACTIVO CORRIENTE: {formatearNumero(calcularTotalActivoCorriente())}</h5>

          <h5>ACTIVO NO CORRIENTE</h5>
          <ul>
            <li>Propiedad, Planta y Equipo (neto): {formatearNumero(balanceData.propiedadPlantaEquipo)}</li>
            <li>Activo Biológico: {formatearNumero(balanceData.activoBiologico)}</li>
            <li>Intangibles: {formatearNumero(balanceData.intangibles)}</li>
            <li>Inversiones Financieras a Largo Plazo: {formatearNumero(balanceData.inversionesLargoPlazo)}</li>
            <li>Proyectos en Proceso: {formatearNumero(balanceData.proyectosProceso)}</li>
          </ul>
          <h5>TOTAL ACTIVO NO CORRIENTE: {formatearNumero(calcularTotalActivoNoCorriente())}</h5>

          <h5>TOTAL ACTIVO: {formatearNumero(calcularTotalActivos())}</h5>

          <h4>PASIVOS</h4>
          <h5>PASIVO CORRIENTE</h5>
          <ul>
            <li>Deudas Financieras a Corto Plazo: {formatearNumero(balanceData.deudasCortoPlazo)}</li>
            <li>Deudas Comerciales y Otras Cuentas por Pagar a Corto Plazo: {formatearNumero(balanceData.deudasComerciales)}</li>
            <li>Beneficios a Empleados a Corto Plazo: {formatearNumero(balanceData.beneficiosEmpleados)}</li>
            <li>Impuestos por Pagar: {formatearNumero(balanceData.impuestosPorPagar)}</li>
            <li>Dividendos por Pagar: {formatearNumero(balanceData.dividendosPorPagar)}</li>
          </ul>
          <h5>TOTAL PASIVO CORRIENTE: {formatearNumero(calcularTotalPasivoCorriente())}</h5>

          <h5>PASIVO NO CORRIENTE</h5>
          <ul>
            <li>Deudas Financieras a Largo Plazo: {formatearNumero(balanceData.deudasLargoPlazo)}</li>
            <li>Provisiones y Otros Pasivos a Largo Plazo: {formatearNumero(balanceData.provisiones)}</li>
          </ul>
          <h5>TOTAL PASIVO NO CORRIENTE: {formatearNumero(calcularTotalPasivoNoCorriente())}</h5>

          <h5>TOTAL PASIVO: {formatearNumero(calcularTotalPasivos())}</h5>

          <h4>PATRIMONIO</h4>
          <ul>
            <li>Capital Social: {formatearNumero(balanceData.capitalSocial)}</li>
            <li>Reservas: {formatearNumero(balanceData.reservas)}</li>
            <li>Resultados Acumulados: {formatearNumero(balanceData.resultadosAcumulados)}</li>
            <li>Resultados del Ejercicio: {formatearNumero(balanceData.resultadosEjercicio)}</li>
            <li>Ajustes y Efectos por Valuación y Cambio de Valor: {formatearNumero(balanceData.ajustesEfectosValuacion)}</li>
          </ul>
          <h5>TOTAL PATRIMONIO: {formatearNumero(calcularTotalPatrimonio())}</h5>

          <h5>TOTAL PASIVO Y PATRIMONIO: {formatearNumero(calcularTotalPasivos() + calcularTotalPatrimonio())}</h5>
        </div>
      ) : (
        <p>Por favor, selecciona un año para ver el balance general.</p>
      )}
    </div>
  );
}

export default BalanceGeneral;
