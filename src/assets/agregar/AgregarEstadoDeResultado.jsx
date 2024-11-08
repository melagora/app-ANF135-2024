import { useState } from "react";
import "../css/Agregar.css"; // Reutilizando los mismos estilos
import { estados } from "../components/Datos";

function AgregarEstadoDeResultado({ onSave }) {
  const [formData, setFormData] = useState({
    año: "",
    ventas: "",
    costoVenta: "",
    utilidadBruta: "",
    administracion: "",
    gerenciaFinanciera: "",
    auditoriaInterna: "",
    gerenciaVentasMercadeo: "",
    divisionAvicola: "",
    direccion: "",
    cadenaSuministros: "",
    utilidadOperacion: "",
    gastosFinancieros: "",
    otrosGastosNoOperacionales: "",
    utilidadAntesImpuestosReserva: "",
    reservaLegal: "",
    impuestoRenta: "",
    cescGrandesContribuyentes: "",
    utilidadAntesImpuesto: "",
    utilidadDistribuible: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
      ventas: "",
      costoVenta: "",
      utilidadBruta: "",
      administracion: "",
      gerenciaFinanciera: "",
      auditoriaInterna: "",
      gerenciaVentasMercadeo: "",
      divisionAvicola: "",
      direccion: "",
      cadenaSuministros: "",
      utilidadOperacion: "",
      gastosFinancieros: "",
      otrosGastosNoOperacionales: "",
      utilidadAntesImpuestosReserva: "",
      reservaLegal: "",
      impuestoRenta: "",
      cescGrandesContribuyentes: "",
      utilidadAntesImpuesto: "",
      utilidadDistribuible: "",
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
          </div>
          <div>
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
          </div>
          <div>
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
            </div>
            <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <h4>UTILIDAD ANTES DE IMPUESTO</h4>
            <div>
              <div className="totales">
                <h5>
                  Utilidad Antes de Impuesto:{" "}
                  {formatNumber(formData.utilidadAntesImpuesto)}
                </h5>
              </div>
            </div>
          </div>
          <div>
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
            </div>
            <div>
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
