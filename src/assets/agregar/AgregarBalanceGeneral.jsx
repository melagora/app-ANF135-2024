import { useState } from "react";
import '../css/Agregar.css'; // Asegúrate de importar el CSS
import { balances } from "../components/Datos";

function AgregarBalanceGeneral({ onSave }) {
  
  const [formData, setFormData] = useState({
    año: "",
    efectivo: "",
    inversionesCortoPlazo: "",
    deudoresComerciales: "",
    inventarios: "",
    pagosAnticipados: "",
    propiedadPlantaEquipo: "",
    activoBiologico: "",
    intangibles: "",
    inversionesLargoPlazo: "",
    proyectosProceso: "",
    deudasCortoPlazo: "",
    deudasComerciales: "",
    beneficiosEmpleados: "",
    impuestosPorPagar: "",
    dividendosPorPagar: "",
    deudasLargoPlazo: "",
    provisiones: "",
    capitalSocial: "",
    reservas: "",
    resultadosAcumulados: "",
    resultadosEjercicio: "",
    ajustesEfectosValuacion: "",
    totalActivoCorriente: "",
    totalActivoNoCorriente: "",
    totalActivos: "",
    totalPasivoCorriente: "",
    totalPasivoNoCorriente: "",
    totalPasivos: "",
    totalPatrimonio: "",
    totalPasivosPatrimonio: "",
  });

  const handleLoadData = () => {
    const yearData = balances[formData.año];
    if (yearData) {
      setFormData(prevFormData => ({
        ...prevFormData,
        ...yearData
      }));
    } else {
      alert("No se encontraron datos para el año seleccionado en data.jsx.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const balances = JSON.parse(localStorage.getItem('balances')) || {};
    balances[formData.año] = formData;
    localStorage.setItem('balances', JSON.stringify(balances));
    alert('Balance guardado exitosamente');
    onSave(formData.año);
  };

  const handleClear = () => {
    setFormData({
      año: "",
      efectivo: "",
      inversionesCortoPlazo: "",
      deudoresComerciales: "",
      inventarios: "",
      pagosAnticipados: "",
      propiedadPlantaEquipo: "",
      activoBiologico: "",
      intangibles: "",
      inversionesLargoPlazo: "",
      proyectosProceso: "",
      deudasCortoPlazo: "",
      deudasComerciales: "",
      beneficiosEmpleados: "",
      impuestosPorPagar: "",
      dividendosPorPagar: "",
      deudasLargoPlazo: "",
      provisiones: "",
      capitalSocial: "",
      reservas: "",
      resultadosAcumulados: "",
      resultadosEjercicio: "",
      ajustesEfectosValuacion: "",
      totalActivoCorriente: "",
      totalActivoNoCorriente: "",
      totalActivos: "",
      totalPasivoCorriente: "",
      totalPasivoNoCorriente: "",
      totalPasivos: "",
      totalPatrimonio: "",
      totalPasivosPatrimonio: "",
    });
  };

  // Función para formatear los números
  const formatearNumero = (numero) => {
    return parseFloat(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="agregar-container">
      <h3>Agregar Balance General</h3>
      <form onSubmit={handleSubmit}>
        {/* Selector de Año */}
        <div className="form-group">
          <label>
            Seleccionar Año:
          </label>
          <select name="año" onChange={handleChange} value={formData.año}>
            <option value="">-- Seleccionar Año --</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <button type="button" onClick={handleLoadData}>Cargar datos</button>
        </div>

        <h4>ACTIVOS</h4>
        <h5>ACTIVO CORRIENTE</h5>
        <label>
          Efectivo y Equivalentes al Efectivo:
          <input type="number" name="efectivo" onChange={handleChange} value={formData.efectivo} />
        </label>
        <label>
          Inversiones Financieras a Corto Plazo:
          <input type="number" name="inversionesCortoPlazo" onChange={handleChange} value={formData.inversionesCortoPlazo} />
        </label>
        <label>
          Deudores Comerciales y Otras Cuentas por Cobrar:
          <input type="number" name="deudoresComerciales" onChange={handleChange} value={formData.deudoresComerciales} />
        </label>
        <label>
          Inventarios:
          <input type="number" name="inventarios" onChange={handleChange} value={formData.inventarios} />
        </label>
        <label>
          Pagos Anticipados:
          <input type="number" name="pagosAnticipados" onChange={handleChange} value={formData.pagosAnticipados} />
        </label>

        {/* Total Activo Corriente */}
        <div className="totales">
          <h5>TOTAL ACTIVO CORRIENTE: {formatearNumero(formData.totalActivoCorriente)}</h5>
        </div>

        <h5>ACTIVO NO CORRIENTE</h5>
        <label>
          Propiedad, Planta y Equipo (neto):
          <input type="number" name="propiedadPlantaEquipo" onChange={handleChange} value={formData.propiedadPlantaEquipo} />
        </label>
        <label>
          Activo Biológico:
          <input type="number" name="activoBiologico" onChange={handleChange} value={formData.activoBiologico} />
        </label>
        <label>
          Intangibles:
          <input type="number" name="intangibles" onChange={handleChange} value={formData.intangibles} />
        </label>
        <label>
          Inversiones Financieras a Largo Plazo:
          <input type="number" name="inversionesLargoPlazo" onChange={handleChange} value={formData.inversionesLargoPlazo} />
        </label>
        <label>
          Proyectos en Proceso:
          <input type="number" name="proyectosProceso" onChange={handleChange} value={formData.proyectosProceso} />
        </label>

        {/* Total Activo No Corriente */}
        <div className="totales">
          <h5>TOTAL ACTIVO NO CORRIENTE: {formatearNumero(formData.totalActivoNoCorriente)}</h5>
        </div>

        {/* Total Activo */}
        <div className="totales">
          <h5>TOTAL ACTIVO: {formatearNumero(formData.totalActivos)}</h5>
        </div>

        <h4>PASIVOS</h4>
        <h5>PASIVO CORRIENTE</h5>
        <label>
          Deudas Financieras a Corto Plazo:
          <input type="number" name="deudasCortoPlazo" onChange={handleChange} value={formData.deudasCortoPlazo} />
        </label>
        <label>
          Deudas Comerciales y Otras Cuentas por Pagar:
          <input type="number" name="deudasComerciales" onChange={handleChange} value={formData.deudasComerciales} />
        </label>
        <label>
          Beneficios a Empleados:
          <input type="number" name="beneficiosEmpleados" onChange={handleChange} value={formData.beneficiosEmpleados} />
        </label>
        <label>
          Impuestos por Pagar:
          <input type="number" name="impuestosPorPagar" onChange={handleChange} value={formData.impuestosPorPagar} />
        </label>
        <label>
          Dividendos por Pagar:
          <input type="number" name="dividendosPorPagar" onChange={handleChange} value={formData.dividendosPorPagar} />
        </label>

        {/* Total Pasivo Corriente */}
        <div className="totales">
          <h5>TOTAL PASIVO CORRIENTE: {formatearNumero(formData.totalPasivoCorriente)}</h5>
        </div>

        <h5>PASIVO NO CORRIENTE</h5>
        <label>
          Deudas Financieras a Largo Plazo:
          <input type="number" name="deudasLargoPlazo" onChange={handleChange} value={formData.deudasLargoPlazo} />
        </label>
        <label>
          Provisiones:
          <input type="number" name="provisiones" onChange={handleChange} value={formData.provisiones} />
        </label>

        {/* Total Pasivo No Corriente */}
        <div className="totales">
          <h5>TOTAL PASIVO NO CORRIENTE: {formatearNumero(formData.totalPasivoNoCorriente)}</h5>
        </div>

        {/* Total Pasivos */}
        <div className="totales">
          <h5>TOTAL PASIVOS: {formatearNumero(formData.totalPasivos)}</h5>
        </div>

        <h4>PATRIMONIO</h4>
        <label>
          Capital Social:
          <input type="number" name="capitalSocial" onChange={handleChange} value={formData.capitalSocial} />
        </label>
        <label>
          Reservas:
          <input type="number" name="reservas" onChange={handleChange} value={formData.reservas} />
        </label>
        <label>
          Resultados Acumulados:
          <input type="number" name="resultadosAcumulados" onChange={handleChange} value={formData.resultadosAcumulados} />
        </label>
        <label>
          Resultados del Ejercicio:
          <input type="number" name="resultadosEjercicio" onChange={handleChange} value={formData.resultadosEjercicio} />
        </label>
        <label>
          Ajustes por Efectos de Valuación:
          <input type="number" name="ajustesEfectosValuacion" onChange={handleChange} value={formData.ajustesEfectosValuacion} />
        </label>

        {/* Total Patrimonio */}
        <div className="totales">
          <h5>TOTAL PATRIMONIO: {formatearNumero(formData.totalPatrimonio)}</h5>
        </div>

        {/* Total Pasivos y Patrimonio */}
        <div className="totales">
          <h5>TOTAL PASIVOS Y PATRIMONIO: {formatearNumero(formData.totalPasivosPatrimonio)}</h5>
        </div>

        <div className="botones">
          <button type="submit">Guardar Balance</button>
          <button type="button" onClick={handleClear}>Limpiar Campos</button>
        </div>
      </form>
    </div>
  );
}

export default AgregarBalanceGeneral;
