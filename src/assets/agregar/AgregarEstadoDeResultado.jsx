import { useState } from "react";
import "../css/Agregar.css"; // Reutilizando los mismos estilos
import { estados } from "../components/Datos";

function AgregarEstadoDeResultado({ onSave }) {
  const [formData, setFormData] = useState({
    año: "",
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
    cescGrandesContribuyentes: 0,
    utilidadAntesImpuesto: 0,
    utilidadDistribuible: 0,
  });

  const handleLoadData = () => {
    const yearData = estados[formData.año];
    if (yearData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...yearData,
      }));
    } else {
      alert("No se encontraron datos para el año seleccionado en data.jsx.");
    }
  };

  const calculateTotals = (updatedData) => {
    const utilidadBruta = parseFloat((updatedData.ventas - updatedData.costoVenta).toFixed(2));
  
    const gastosOperacion = parseFloat(
      (
        updatedData.administracion +
        updatedData.gerenciaFinanciera +
        updatedData.auditoriaInterna +
        updatedData.gerenciaVentasMercadeo +
        updatedData.divisionAvicola +
        updatedData.direccion +
        updatedData.cadenaSuministros
      ).toFixed(2)
    );
  
    const utilidadOperacion = parseFloat((utilidadBruta - gastosOperacion).toFixed(2));
  
    const utilidadAntesImpuestosReserva = parseFloat(
      (
        utilidadOperacion -
        updatedData.gastosFinancieros -
        updatedData.otrosGastosNoOperacionales
      ).toFixed(2)
    );
  
    const utilidadAntesImpuesto = parseFloat(
      (utilidadAntesImpuestosReserva - updatedData.reservaLegal).toFixed(2)
    );
  
    const utilidadDistribuible = parseFloat(
      (
        utilidadAntesImpuesto -
        updatedData.impuestoRenta -
        updatedData.cescGrandesContribuyentes
      ).toFixed(2)
    );
  
    return {
      utilidadBruta,
      utilidadOperacion,
      utilidadAntesImpuestosReserva,
      utilidadAntesImpuesto,
      utilidadDistribuible,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;

    // Actualizamos el estado
    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        [name]: numericValue,
      };

      const totals = calculateTotals(updatedData);

      return {
        ...updatedData,
        ...totals,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const balances = JSON.parse(localStorage.getItem("estados")) || {};
    balances[formData.año] = formData;
    localStorage.setItem("estados", JSON.stringify(balances));
    alert("Estado guardado exitosamente");
    onSave(formData.año);
  };

  const handleClear = () => {
    setFormData({
      año: "",
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
      cescGrandesContribuyentes: 0,
      utilidadAntesImpuesto: 0,
      utilidadDistribuible: 0,
    });
  };

  const formatNumber = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
          <button type="button" onClick={handleLoadData}>
            Cargar datos
          </button>
        </div>

        <div className="json">
          <div>
            <h4>INGRESOS</h4>
            <div>
              <label>
                Ventas:
                <input
                  type="number"
                  name="ventas"
                  onChange={handleChange}
                  value={formData.ventas}
                />
              </label>
            </div>
            <div>
              <label>
                Costo de Venta:
                <input
                  type="number"
                  name="costoVenta"
                  onChange={handleChange}
                  value={formData.costoVenta}
                />
              </label>
            </div>
            <div>
              <div className="totales">
                <h5>Utilidad Bruta: {formatNumber(formData.utilidadBruta)}</h5>
              </div>
            </div>

            <h4>GASTOS DE OPERACIÓN</h4>
            <div>
              <label>
                Administración:
                <input
                  type="number"
                  name="administracion"
                  onChange={handleChange}
                  value={formData.administracion}
                />
              </label>
            </div>
            <div>
              <label>
                Gerencia Financiera:
                <input
                  type="number"
                  name="gerenciaFinanciera"
                  onChange={handleChange}
                  value={formData.gerenciaFinanciera}
                />
              </label>
            </div>
            <div>
              <label>
                Auditoría Interna:
                <input
                  type="number"
                  name="auditoriaInterna"
                  onChange={handleChange}
                  value={formData.auditoriaInterna}
                />
              </label>
            </div>
            <div>
              <label>
                Gerencia Ventas y Mercadeo:
                <input
                  type="number"
                  name="gerenciaVentasMercadeo"
                  onChange={handleChange}
                  value={formData.gerenciaVentasMercadeo}
                />
              </label>
            </div>
            <div>
              <label>
                División Avícola:
                <input
                  type="number"
                  name="divisionAvicola"
                  onChange={handleChange}
                  value={formData.divisionAvicola}
                />
              </label>
            </div>
            <div>
              <label>
                Dirección:
                <input
                  type="number"
                  name="direccion"
                  onChange={handleChange}
                  value={formData.direccion}
                />
              </label>
            </div>
            <div>
              <label>
                Cadena de Suministros:
                <input
                  type="number"
                  name="cadenaSuministros"
                  onChange={handleChange}
                  value={formData.cadenaSuministros}
                />
              </label>
            </div>
            <div>
              <div className="totales">
                <h5>
                  Utilidad de Operación:{" "}
                  {formatNumber(formData.utilidadOperacion)}
                </h5>
              </div>
            </div>
            <h4>GASTOS NO OPERACIONALES</h4>
            <div>
              <label>
                Financieros:
                <input
                  type="number"
                  name="gastosFinancieros"
                  onChange={handleChange}
                  value={formData.gastosFinancieros}
                />
              </label>
              <label>
                Otros Gastos No Operacionales:
                <input
                  type="number"
                  name="otrosGastosNoOperacionales"
                  onChange={handleChange}
                  value={formData.otrosGastosNoOperacionales}
                />
              </label>
            </div>
            <div>
              <div className="totales">
                <h5>
                  Utilidad Antes de Impuestos y Reserva:{" "}
                  {formatNumber(formData.utilidadAntesImpuestosReserva)}
                </h5>
              </div>
            </div>
            <h4>RESERVA LEGAL</h4>
            <div>
              <label>
                Reserva Legal:
                <input
                  type="number"
                  name="reservaLegal"
                  onChange={handleChange}
                  value={formData.reservaLegal}
                />
              </label>
            </div>
            <h4>UTILIDAD ANTES DE IMPUESTO</h4>
            <div>
              <div className="totales">
                <h5>
                  Utilidad Antes de Impuesto:{" "}
                  {formatNumber(formData.utilidadAntesImpuesto)}
                </h5>
              </div>
            </div>
            <h4>IMPUESTO SOBRE LA RENTA</h4>
            <div>
              <label>
                Impuesto sobre la Renta:
                <input
                  type="number"
                  name="impuestoRenta"
                  onChange={handleChange}
                  value={formData.impuestoRenta}
                />
              </label>
              <label>
                CESC GRANDES CONTRIBUYENTES: {/* Nuevo campo */}
                <input
                  type="number"
                  name="cescGrandesContribuyentes"
                  onChange={handleChange}
                  value={formData.cescGrandesContribuyentes}
                />
              </label>
            </div>
            <div>
              <div className="totales">
                <h5>
                  Utilidad Distribuible:{" "}
                  {formatNumber(formData.utilidadDistribuible)}
                </h5>
              </div>
            </div>
          </div>
          <div>
            <button type="submit">Guardar Estado de Resultado</button>
            <button type="button" onClick={handleClear}>
              Limpiar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AgregarEstadoDeResultado;
