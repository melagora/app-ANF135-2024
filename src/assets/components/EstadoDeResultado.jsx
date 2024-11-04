import { useState, useEffect } from "react";
import '../css/Estado.css'; // Asegúrate de importar el mismo CSS
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function EstadoDeResultado() {
  const [añoSeleccionado, setAñoSeleccionado] = useState("");
  const [estadoData, setEstadoData] = useState(null);

  // useEffect para cargar el balance del localStorage al iniciar el componente
  useEffect(() => {
    const balances = JSON.parse(localStorage.getItem('estados')) || {};
    if (añoSeleccionado) {
      setEstadoData(balances[añoSeleccionado] || null); // Cargar el balance para el año seleccionado
    }
  }, [añoSeleccionado]); // Dependencia en añoSeleccionado para actualizar balanceData

  const handleAñoChange = (e) => {
    setAñoSeleccionado(e.target.value);
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

      pdf.save(`EstadoResultado_SARAM_${añoSeleccionado}.pdf`);
    });
  };

  const descargarJson = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(estadoData))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = `EstadoResultado_${añoSeleccionado}.json`;
    downloadAnchor.click();
  };

  return (
    <div className="estado-container">
      <div className="centrar">
        <h4>Saram S.A de C.V.</h4>
        <h4>Estado de Resultado</h4>
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

      {añoSeleccionado && estadoData ? (
        <div id="pdfContent">
          <div>
            <h4>INGRESOS</h4>
            <ul>
              <li>Ventas: {formatearNumero(estadoData.ventas)}</li>
              <li>Costo de Venta: {formatearNumero(estadoData.costoVenta)}</li>
            </ul>
            <h5>Utilidad Bruta: {formatearNumero(estadoData.utilidadBruta)}</h5>

            <h4>GASTOS DE OPERACIÓN</h4>
            <ul>
              <li>Administración: {formatearNumero(estadoData.administracion)}</li>
              <li>Gerencia Financiera: {formatearNumero(estadoData.gerenciaFinanciera)}</li>
              <li>Auditoría Interna: {formatearNumero(estadoData.auditoriaInterna)}</li>
              <li>Gerencia Ventas y Mercadeo: {formatearNumero(estadoData.gerenciaVentasMercadeo)}</li>
              <li>División Avícola: {formatearNumero(estadoData.divisionAvicola)}</li>
              <li>Dirección: {formatearNumero(estadoData.direccion)}</li>
              <li>Cadena de Suministros: {formatearNumero(estadoData.cadenaSuministros)}</li>
            </ul>
            <h5>Utilidad de Operación: {formatearNumero(estadoData.utilidadOperacion)}</h5>

            <h4>GASTOS NO OPERACIONALES</h4>
            <ul>
              <li>Gastos Financieros: {formatearNumero(estadoData.gastosFinancieros)}</li>
              <li>Otros Gastos No Operacionales: {formatearNumero(estadoData.otrosGastosNoOperacionales)}</li>
            </ul>
            <h5>Utilidad Antes de Impuestos y Reserva: {formatearNumero(estadoData.utilidadAntesImpuestosReserva)}</h5>

            <h4>RESERVA LEGAL</h4>
            <h5>Reserva Legal (7%): {formatearNumero(estadoData.reservaLegal)}</h5>

            <h4>UTILIDAD ANTES DE IMPUESTO</h4>
            <h5>Utilidad Antes de Impuesto: {formatearNumero(estadoData.utilidadAntesImpuesto)}</h5>

            <h4>IMPUESTO SOBRE LA RENTA</h4>
            <ul>
              <li>Impuesto sobre la Renta: {formatearNumero(estadoData.impuestoRenta)}</li>
              <li>CESC grandes contribuyentes: {formatearNumero(estadoData.cescGrandesContribuyentes)}</li>
            </ul>
            <h5>Utilidad Distribuible: {formatearNumero(estadoData.utilidadDistribuible)}</h5>

            <button onClick={descargarJson}>Descargar JSON</button>
          </div>
        </div>
      ) : (
        <p>Por favor, selecciona un año para ver el estado de resultado.</p>
      )}
    </div>
  );
}

export default EstadoDeResultado;
