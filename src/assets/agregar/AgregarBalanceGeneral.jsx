import React, { useState } from "react";
import '../css/Agregar.css'; // Asegúrate de importar el CSS

function AgregarBalanceGeneral({ onSave }) {
  const [formData, setFormData] = useState({
    año: '',
    efectivo: 0,
    inversionesCortoPlazo: 0,
    deudoresComerciales: 0,
    inventarios: 0,
    pagosAnticipados: 0,
    propiedadPlantaEquipo: 0,
    activoBiologico: 0,
    intangibles: 0,
    inversionesLargoPlazo: 0,
    proyectosProceso: 0,
    deudasCortoPlazo: 0,
    deudasComerciales: 0,
    beneficiosEmpleados: 0,
    impuestosPorPagar: 0,
    dividendosPorPagar: 0,
    deudasLargoPlazo: 0,
    provisiones: 0,
    capitalSocial: 0,
    reservas: 0,
    resultadosAcumulados: 0,
    resultadosEjercicio: 0,
    ajustesEfectosValuacion: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si se selecciona el año, verificamos si hay datos en localStorage para ese año
    if (name === 'año') {
      const balances = JSON.parse(localStorage.getItem('balances')) || {};
      
      // Si hay un balance guardado para el año seleccionado, lo cargamos
      const dataForYear = balances[value];
      if (dataForYear) {
        setFormData(dataForYear);
      } else {
        // Si no hay datos para ese año, restablecemos el formulario con el año seleccionado
        setFormData((prev) => ({
          ...prev,
          año: value, // Solo actualiza el año
        }));
      }
    } else {
      // Para cualquier otro campo, actualizamos el valor
      setFormData({
        ...formData,
        [name]: value === "" || isNaN(value) ? 0 : parseFloat(value), // Si el valor está vacío o no es un número, establece 0
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Guardar en localStorage
    const balances = JSON.parse(localStorage.getItem('balances')) || {};
    balances[formData.año] = formData;
    localStorage.setItem('balances', JSON.stringify(balances));
    alert('Balance guardado exitosamente');
    // Llamar la función onSave para actualizar el balance en el componente padre
    onSave(formData.año);
  };

  const handleClear = () => {
    setFormData((prev) => ({
      ...prev,
      efectivo: 0,
      inversionesCortoPlazo: 0,
      deudoresComerciales: 0,
      inventarios: 0,
      pagosAnticipados: 0,
      propiedadPlantaEquipo: 0,
      activoBiologico: 0,
      intangibles: 0,
      inversionesLargoPlazo: 0,
      proyectosProceso: 0,
      deudasCortoPlazo: 0,
      deudasComerciales: 0,
      beneficiosEmpleados: 0,
      impuestosPorPagar: 0,
      dividendosPorPagar: 0,
      deudasLargoPlazo: 0,
      provisiones: 0,
      capitalSocial: 0,
      reservas: 0,
      resultadosAcumulados: 0,
      resultadosEjercicio: 0,
      ajustesEfectosValuacion: 0,
    }));
  };

  // Cálculo de totales
  const totalActivoCorriente =
    formData.efectivo +
    formData.inversionesCortoPlazo +
    formData.deudoresComerciales +
    formData.inventarios +
    formData.pagosAnticipados;

  const totalActivoNoCorriente =
    formData.propiedadPlantaEquipo +
    formData.activoBiologico +
    formData.intangibles +
    formData.inversionesLargoPlazo +
    formData.proyectosProceso;

  const totalActivos = totalActivoCorriente + totalActivoNoCorriente;

  const totalPasivoCorriente =
    formData.deudasCortoPlazo +
    formData.deudasComerciales +
    formData.beneficiosEmpleados +
    formData.impuestosPorPagar +
    formData.dividendosPorPagar;

  const totalPasivoNoCorriente =
    formData.deudasLargoPlazo +
    formData.provisiones;

  const totalPasivos = totalPasivoCorriente + totalPasivoNoCorriente;

  const totalPatrimonio =
    formData.capitalSocial +
    formData.reservas +
    formData.resultadosAcumulados +
    formData.resultadosEjercicio +
    formData.ajustesEfectosValuacion;

  // Total Pasivos + Patrimonio
  const totalPasivosPatrimonio = totalPasivos + totalPatrimonio;

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
          <h5>TOTAL ACTIVO CORRIENTE: {totalActivoCorriente}</h5>
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
          <h5>TOTAL ACTIVO NO CORRIENTE: {totalActivoNoCorriente}</h5>
        </div>

        {/* Total Activo */}
        <div className="totales">
          <h5>TOTAL ACTIVO: {totalActivos}</h5>
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
          <h5>TOTAL PASIVO CORRIENTE: {totalPasivoCorriente}</h5>
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
          <h5>TOTAL PASIVO NO CORRIENTE: {totalPasivoNoCorriente}</h5>
        </div>

        {/* Total Pasivos */}
        <div className="totales">
          <h5>TOTAL PASIVOS: {totalPasivos}</h5>
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
          <h5>TOTAL PATRIMONIO: {totalPatrimonio}</h5>
        </div>

        {/* Total Pasivos + Patrimonio */}
        <div className="totales">
          <h5>TOTAL PASIVOS + PATRIMONIO: {totalPasivosPatrimonio}</h5>
        </div>

        <button type="submit">Guardar Balance</button>
        <button type="button" onClick={handleClear}>Limpiar</button> {/* Botón de limpieza */}
      </form>
    </div>
  );
}

export default AgregarBalanceGeneral;
