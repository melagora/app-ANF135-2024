import React, { useState, useEffect } from "react";
import '../css/Agregar.css'; // Reutilizando los mismos estilos

function AgregarEstadoDeResultado({ onSave }) {
  const [formData, setFormData] = useState({
    año: '',
    ventas: 0,
    costoVenta: 0,
    utilidadBruta: 0,
    administracion: 0,
    gerenciaFinanciera: 0,
    auditoriaInterna: 0,
    gerenciaVentasMercadeo: 0,
    divisionAvicola: 0,
    direccion: 0,
    cadenaSuministros: 0,
    utilidadOperacion: 0,
    gastosFinancieros: 0,
    otrosGastosNoOperacionales: 0,
    utilidadAntesImpuestosReserva: 0,
    reservaLegal: 0,
    impuestoRenta: 0,
    utilidadAntesImpuesto: 0,
    utilidadDistribuible: 0,
  });

  // Efecto para calcular valores cuando los campos relevantes cambian
  useEffect(() => {
    const utilidadBruta = formData.ventas - formData.costoVenta;
    const gastosOperacion =
      formData.administracion +
      formData.gerenciaFinanciera +
      formData.auditoriaInterna +
      formData.gerenciaVentasMercadeo +
      formData.divisionAvicola +
      formData.direccion +
      formData.cadenaSuministros;
    const utilidadOperacion = utilidadBruta - gastosOperacion;
    const gastosNoOperacionales =
      formData.gastosFinancieros + formData.otrosGastosNoOperacionales;
    const utilidadAntesImpuestosReserva = utilidadOperacion - gastosNoOperacionales;
    const reservaLegal = utilidadAntesImpuestosReserva * 0.07;
    const utilidadAntesImpuesto = utilidadAntesImpuestosReserva - reservaLegal;
    const utilidadDistribuible =
      utilidadAntesImpuesto - parseFloat(formData.impuestoRenta);

    setFormData((prevData) => ({
      ...prevData,
      utilidadBruta,
      utilidadOperacion,
      utilidadAntesImpuestosReserva,
      reservaLegal,
      utilidadAntesImpuesto,
      utilidadDistribuible,
    }));
  }, [
    formData.ventas,
    formData.costoVenta,
    formData.administracion,
    formData.gerenciaFinanciera,
    formData.auditoriaInterna,
    formData.gerenciaVentasMercadeo,
    formData.divisionAvicola,
    formData.direccion,
    formData.cadenaSuministros,
    formData.gastosFinancieros,
    formData.otrosGastosNoOperacionales,
    formData.impuestoRenta,
  ]);

  // Efecto para cargar los datos guardados de un año seleccionado
  useEffect(() => {
    if (formData.año) {
      const estados = JSON.parse(localStorage.getItem('estados')) || {};
      if (estados[formData.año]) {
        setFormData(estados[formData.año]); // Cargar datos si existen
      } else {
        handleClear(); // Limpiar si no existen datos para ese año
      }
    }
  }, [formData.año]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" || isNaN(value) ? 0 : parseFloat(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const estados = JSON.parse(localStorage.getItem('estados')) || {};
    estados[formData.año] = formData;
    localStorage.setItem('estados', JSON.stringify(estados));
    alert('Estado de Resultado guardado exitosamente');
    onSave(formData.año);
  };

  const handleClear = () => {
    setFormData({
      año: formData.año, // Mantener el año seleccionado
      ventas: 0,
      costoVenta: 0,
      utilidadBruta: 0,
      administracion: 0,
      gerenciaFinanciera: 0,
      auditoriaInterna: 0,
      gerenciaVentasMercadeo: 0,
      divisionAvicola: 0,
      direccion: 0,
      cadenaSuministros: 0,
      utilidadOperacion: 0,
      gastosFinancieros: 0,
      otrosGastosNoOperacionales: 0,
      utilidadAntesImpuestosReserva: 0,
      reservaLegal: 0,
      impuestoRenta: 0,
      utilidadAntesImpuesto: 0,
      utilidadDistribuible: 0,
    });
  };

  return (
    <div className="agregar-container">
      <h3>Agregar Estado de Resultado</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Seleccionar Año:</label>
          <select name="año" onChange={handleChange} value={formData.año}>
            <option value="">-- Seleccionar Año --</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        <h4>INGRESOS</h4>
        <label>
          Ventas:
          <input type="number" name="ventas" onChange={handleChange} value={formData.ventas} />
        </label>
        <label>
          Costo de Venta:
          <input type="number" name="costoVenta" onChange={handleChange} value={formData.costoVenta} />
        </label>
        <div className="totales">
          <h5>Utilidad Bruta: {formData.utilidadBruta.toFixed(2)}</h5>
        </div>

        <h4>GASTOS DE OPERACIÓN</h4>
        <label>
          Administración:
          <input type="number" name="administracion" onChange={handleChange} value={formData.administracion} />
        </label>
        <label>
          Gerencia Financiera:
          <input type="number" name="gerenciaFinanciera" onChange={handleChange} value={formData.gerenciaFinanciera} />
        </label>
        <label>
          Auditoría Interna:
          <input type="number" name="auditoriaInterna" onChange={handleChange} value={formData.auditoriaInterna} />
        </label>
        <label>
          Gerencia Ventas y Mercadeo:
          <input type="number" name="gerenciaVentasMercadeo" onChange={handleChange} value={formData.gerenciaVentasMercadeo} />
        </label>
        <label>
          División Avícola:
          <input type="number" name="divisionAvicola" onChange={handleChange} value={formData.divisionAvicola} />
        </label>
        <label>
          Dirección:
          <input type="number" name="direccion" onChange={handleChange} value={formData.direccion} />
        </label>
        <label>
          Cadena de Suministros:
          <input type="number" name="cadenaSuministros" onChange={handleChange} value={formData.cadenaSuministros} />
        </label>

        <div className="totales">
          <h5>Utilidad de Operación: {formData.utilidadOperacion.toFixed(2)}</h5>
        </div>

        <h4>GASTOS NO OPERACIONALES</h4>
        <label>
          Financieros:
          <input type="number" name="gastosFinancieros" onChange={handleChange} value={formData.gastosFinancieros} />
        </label>
        <label>
          Otros Gastos No Operacionales:
          <input type="number" name="otrosGastosNoOperacionales" onChange={handleChange} value={formData.otrosGastosNoOperacionales} />
        </label>

        <div className="totales">
          <h5>Utilidad Antes de Impuestos y Reserva: {formData.utilidadAntesImpuestosReserva.toFixed(2)}</h5>
        </div>

        <h4>RESERVA LEGAL</h4>
        <div className="totales">
          <h5>Reserva Legal (7%): {formData.reservaLegal}</h5>
        </div>

        <h4>UTILIDAD ANTES DE IMPUESTO</h4>
        <div className="totales">
          <h5>Utilidad Antes de Impuesto: {formData.utilidadAntesImpuesto.toFixed(2)}</h5>
        </div>

        <h4>IMPUESTO SOBRE LA RENTA</h4>
        <label>
          Impuesto sobre la Renta:
          <input type="number" name="impuestoRenta" onChange={handleChange} value={formData.impuestoRenta} />
        </label>
        <div className="totales">
          <h5>Utilidad Distribuible: {formData.utilidadDistribuible}</h5>
        </div>

        <div className="buttons">
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleClear}>Limpiar</button>
        </div>
      </form>
    </div>
  );
}

export default AgregarEstadoDeResultado;
