import { useState } from "react";
import '../css/Estado.css'; // Asegúrate de importar el mismo CSS
import { balances, estados } from './Datos';// Importa los datos

function AnalisisVertical() {
  const [añoSeleccionado, setAñoSeleccionado] = useState('');
  const [balanceData, setBalanceData] = useState(null);
  const [estadoData, setEstadoData] = useState(null);
  const [vista, setVista] = useState('balance'); // Por defecto, muestra el balance

  const handleAñoChange = (e) => {
    const año = e.target.value;
    setAñoSeleccionado(año);

    // Cargar datos del balance general
    if (balances[año]) {
      setBalanceData(balances[año]);
    } else {
      setBalanceData(null);
    }

    // Cargar datos del estado de resultados
    if (estados[año]) {
      setEstadoData(estados[año]);
    } else {
      setEstadoData(null);
    }
  };

  // Función para formatear los números
  const formatearNumero = (numero) => {
    return parseFloat(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calcularPorcentaje = (parte, total) => {
    return total ? ((parte / total) * 100).toFixed(2) + '%' : '0.00%';
  };

  return (
    <div className="estado-container">
      <div className="centrar">
        <h4>Saram S.A de C.V.</h4>
        <h4>{vista === 'balance' ? "Análisis Vertical del Balance General" : "Estado de Resultado"}</h4>
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

        <label>Seleccionar Vista:</label>
        <select onChange={(e) => setVista(e.target.value)} value={vista}>
          <option value="">-- Seleccionar Opcion --</option>
          <option value="balance">Balance General</option>
          <option value="estado">Estado de Resultado</option>
        </select>
      </div>

      {vista === 'balance' && balanceData ? (
        <div>
          {/* Aquí va el contenido del balance general */}
          <h4>ACTIVOS</h4>
          <h5>ACTIVO CORRIENTE</h5>
          <ul>
            <li>Efectivo y Equivalentes al Efectivo: {formatearNumero(balanceData.efectivo)} ({calcularPorcentaje(balanceData.efectivo, balanceData.totalActivos)})</li>
            <li>Inversiones Financieras a Corto Plazo: {formatearNumero(balanceData.inversionesCortoPlazo)} ({calcularPorcentaje(balanceData.inversionesCortoPlazo, balanceData.totalActivos)})</li>
            <li>Deudores Comerciales y Otras Cuentas por Cobrar: {formatearNumero(balanceData.deudoresComerciales)} ({calcularPorcentaje(balanceData.deudoresComerciales, balanceData.totalActivos)})</li>
            <li>Inventarios: {formatearNumero(balanceData.inventarios)} ({calcularPorcentaje(balanceData.inventarios, balanceData.totalActivos)})</li>
            <li>Pagos Anticipados: {formatearNumero(balanceData.pagosAnticipados)} ({calcularPorcentaje(balanceData.pagosAnticipados, balanceData.totalActivos)})</li>
          </ul>
          <h5>TOTAL ACTIVO CORRIENTE: {formatearNumero(balanceData.totalActivoCorriente)} ({calcularPorcentaje(balanceData.totalActivoCorriente, balanceData.totalActivos)})</h5>

          <h5>ACTIVO NO CORRIENTE</h5>
          <ul>
            <li>Propiedad, Planta y Equipo (neto): {formatearNumero(balanceData.propiedadPlantaEquipo)} ({calcularPorcentaje(balanceData.propiedadPlantaEquipo, balanceData.totalActivos)})</li>
            <li>Activo Biológico: {formatearNumero(balanceData.activoBiologico)} ({calcularPorcentaje(balanceData.activoBiologico, balanceData.totalActivos)})</li>
            <li>Intangibles: {formatearNumero(balanceData.intangibles)} ({calcularPorcentaje(balanceData.intangibles, balanceData.totalActivos)})</li>
            <li>Inversiones Financieras a Largo Plazo: {formatearNumero(balanceData.inversionesLargoPlazo)} ({calcularPorcentaje(balanceData.inversionesLargoPlazo, balanceData.totalActivos)})</li>
            <li>Proyectos en Proceso: {formatearNumero(balanceData.proyectosProceso)} ({calcularPorcentaje(balanceData.proyectosProceso, balanceData.totalActivos)})</li>
          </ul>
          <h5>TOTAL ACTIVO NO CORRIENTE: {formatearNumero(balanceData.totalActivoNoCorriente)} ({calcularPorcentaje(balanceData.totalActivoNoCorriente, balanceData.totalActivos)})</h5>

          <h5>TOTAL ACTIVO: {formatearNumero(balanceData.totalActivos)}</h5>

          <h4>PASIVOS</h4>
          <h5>PASIVO CORRIENTE</h5>
          <ul>
            <li>Deudas Financieras a Corto Plazo: {formatearNumero(balanceData.deudasCortoPlazo)} ({calcularPorcentaje(balanceData.deudasCortoPlazo, balanceData.totalPasivos)})</li>
            <li>Deudas Comerciales y Otras Cuentas por Pagar a Corto Plazo: {formatearNumero(balanceData.deudasComerciales)} ({calcularPorcentaje(balanceData.deudasComerciales, balanceData.totalPasivos)})</li>
            <li>Beneficios a Empleados a Corto Plazo: {formatearNumero(balanceData.beneficiosEmpleados)} ({calcularPorcentaje(balanceData.beneficiosEmpleados, balanceData.totalPasivos)})</li>
            <li>Impuestos por Pagar: {formatearNumero(balanceData.impuestosPorPagar)} ({calcularPorcentaje(balanceData.impuestosPorPagar, balanceData.totalPasivos)})</li>
            <li>Dividendos por Pagar: {formatearNumero(balanceData.dividendosPorPagar)} ({calcularPorcentaje(balanceData.dividendosPorPagar, balanceData.totalPasivos)})</li>
          </ul>
          <h5>TOTAL PASIVO CORRIENTE: {formatearNumero(balanceData.totalPasivoCorriente)} ({calcularPorcentaje(balanceData.totalPasivoCorriente, balanceData.totalPasivos)})</h5>

          <h5>PASIVO NO CORRIENTE</h5>
          <ul>
            <li>Deudas Financieras a Largo Plazo: {formatearNumero(balanceData.deudasLargoPlazo)} ({calcularPorcentaje(balanceData.deudasLargoPlazo, balanceData.totalPasivos)})</li>
            <li>Provisiones y Otros Pasivos a Largo Plazo: {formatearNumero(balanceData.provisiones)} ({calcularPorcentaje(balanceData.provisiones, balanceData.totalPasivos)})</li>
          </ul>
          <h5>TOTAL PASIVO NO CORRIENTE: {formatearNumero(balanceData.totalPasivoNoCorriente)} ({calcularPorcentaje(balanceData.totalPasivoNoCorriente, balanceData.totalPasivos)})</h5>

          <h5>TOTAL PASIVO: {formatearNumero(balanceData.totalPasivos)}</h5>

          <h4>PATRIMONIO</h4>
          <ul>
            <li>Capital Social: {formatearNumero(balanceData.capitalSocial)} ({calcularPorcentaje(balanceData.capitalSocial, balanceData.totalPatrimonio)})</li>
            <li>Reservas: {formatearNumero(balanceData.reservas)} ({calcularPorcentaje(balanceData.reservas, balanceData.totalPatrimonio)})</li>
            <li>Resultados Acumulados: {formatearNumero(balanceData.resultadosAcumulados)} ({calcularPorcentaje(balanceData.resultadosAcumulados, balanceData.totalPatrimonio)})</li>
            <li>Resultados del Ejercicio: {formatearNumero(balanceData.resultadosEjercicio)} ({calcularPorcentaje(balanceData.resultadosEjercicio, balanceData.totalPatrimonio)})</li>
            <li>Ajustes y Efectos por Valuación y Cambio de Valor: {formatearNumero(balanceData.ajustesEfectosValuacion)} ({calcularPorcentaje(balanceData.ajustesEfectosValuacion, balanceData.totalPatrimonio)})</li>          </ul>
          <h5>TOTAL PATRIMONIO: {formatearNumero(balanceData.totalPatrimonio)}</h5>

          <h4>TOTAL PASIVO + PATRIMONIO: {formatearNumero(balanceData.totalPasivos + balanceData.totalPatrimonio)}</h4>
        </div>
      ) : vista === 'estado' && estadoData ? (
        <div>
          {/* Aquí va el contenido del estado de resultados */}
          <h4>INGRESOS</h4>
          <ul>
            <li>Ventas: {formatearNumero(estadoData.ventas)} ({calcularPorcentaje(estadoData.ventas, estadoData.ventas)})</li>
            <li>Costo de Venta: {formatearNumero(estadoData.costoVenta)} ({calcularPorcentaje(estadoData.costoVenta, estadoData.ventas)})</li>
            <li>Utilidad Bruta: {formatearNumero(estadoData.utilidadBruta)} ({calcularPorcentaje(estadoData.utilidadBruta, estadoData.ventas)})</li>
          </ul>
          <h4>GASTOS DE OPERACIÓN</h4>
          <ul>
            <li>Administración: {formatearNumero(estadoData.administracion)} ({calcularPorcentaje(estadoData.administracion, estadoData.ventas)})</li>
            <li>Gerencia Financiera: {formatearNumero(estadoData.gerenciaFinanciera)} ({calcularPorcentaje(estadoData.gerenciaFinanciera, estadoData.ventas)})</li>
            <li>Auditoría Interna: {formatearNumero(estadoData.auditoriaInterna)} ({calcularPorcentaje(estadoData.auditoriaInterna, estadoData.ventas)})</li>
            <li>Gerencia Ventas y Mercadeo: {formatearNumero(estadoData.gerenciaVentasMercadeo)} ({calcularPorcentaje(estadoData.gerenciaVentasMercadeo, estadoData.ventas)})</li>
            <li>División Avícola: {formatearNumero(estadoData.divisionAvicola)} ({calcularPorcentaje(estadoData.divisionAvicola, estadoData.ventas)})</li>
            <li>Dirección: {formatearNumero(estadoData.direccion)} ({calcularPorcentaje(estadoData.direccion, estadoData.ventas)})</li>
            <li>Cadena de Suministros: {formatearNumero(estadoData.cadenaSuministros)} ({calcularPorcentaje(estadoData.cadenaSuministros, estadoData.ventas)})</li>
          </ul>
          <h4>UTILIDAD DE OPERACIÓN: {formatearNumero(estadoData.utilidadOperacion)} ({calcularPorcentaje(estadoData.utilidadOperacion, estadoData.ventas)})</h4>
          <h4>GASTOS NO OPERACIONALES</h4>
          <ul>
            <li>Gastos Financieros: {formatearNumero(estadoData.gastosFinancieros)} ({calcularPorcentaje(estadoData.gastosFinancieros, estadoData.ventas)})</li>
            <li>Otros Gastos: {formatearNumero(estadoData.otrosGastosNoOperacionales)} ({calcularPorcentaje(estadoData.otrosGastosNoOperacionales, estadoData.ventas)})</li>
          </ul>
          <h5>Utilidad Antes de Impuestos y Reserva: {formatearNumero(estadoData.utilidadAntesImpuestosReserva)} ({calcularPorcentaje(estadoData.utilidadAntesImpuestosReserva, estadoData.ventas)})</h5>
          <h5>Reserva Legal: {formatearNumero(estadoData.reservaLegal)} ({calcularPorcentaje(estadoData.reservaLegal, estadoData.ventas)})</h5>
          <h4>UTILIDAD ANTES DE IMPUESTO: {formatearNumero(estadoData.utilidadAntesImpuesto)} ({calcularPorcentaje(estadoData.utilidadAntesImpuesto, estadoData.ventas)})</h4>
          <h4>IMPUESTO SOBRE LA RENTA: {formatearNumero(estadoData.impuestoRenta)} ({calcularPorcentaje(estadoData.impuestoRenta, estadoData.ventas)})</h4>
          <h4>CESC grandes contribuyentes: {formatearNumero(estadoData.cescGrandesContribuyentes)} ({calcularPorcentaje(estadoData.cescGrandesContribuyentes, estadoData.ventas)})</h4>
          <h4>UTILIDAD DISTRIBUIBLE: {formatearNumero(estadoData.utilidadDistribuible)} ({calcularPorcentaje(estadoData.utilidadDistribuible, estadoData.ventas)})</h4>
        </div>
      ) : (
        <p>Por favor selecciona un año y vista.</p>
      )}
    </div>
  );
}

export default AnalisisVertical;
