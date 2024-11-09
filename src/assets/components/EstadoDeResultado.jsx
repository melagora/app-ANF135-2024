import { useState, useEffect } from "react";
import "../css/Estado.css"; // Asegúrate de importar el mismo CSS
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function EstadoDeResultado() {
  const [añoSeleccionado, setAñoSeleccionado] = useState("");
  const [estadoData, setEstadoData] = useState(null);

  // useEffect para cargar el balance del localStorage al iniciar el componente
  useEffect(() => {
    const balances = JSON.parse(localStorage.getItem("estados")) || {};
    if (añoSeleccionado) {
      setEstadoData(balances[añoSeleccionado] || null); // Cargar el balance para el año seleccionado
    }
  }, [añoSeleccionado]); // Dependencia en añoSeleccionado para actualizar balanceData

  const handleAñoChange = (e) => {
    setAñoSeleccionado(e.target.value);
  };

  const formatearNumero = (numero) => {
    return parseFloat(numero).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(estadoData)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = `EstadoResultado_${añoSeleccionado}.json`;
    downloadAnchor.click();
  };

  return (
    <div className="estado-container">
      <div className="form-group">
        <div className="botonesOpciones">
          <div>
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
          <div>
            {añoSeleccionado && (
              <button onClick={generarPDF}>Generar PDF</button>
            )}
          </div>
        </div>
      </div>

      {añoSeleccionado && estadoData ? (
        <div id="pdfContent">
          <div className="centrar">
            <h4>Saram S.A de C.V.</h4>
            <h4>Estado de Resultado</h4>
            <h5>
              Del 1 de enero hasta el 31 de diciembre del {añoSeleccionado}
            </h5>
            <h5>
              Cifras expresadas en miles de dólares de los Estados Unidos de
              América
            </h5>
          </div>

          <div className="json">
            <div>
              <h4 style={{ paddingTop: "30px", textDecoration: "underline" }}>
                INGRESOS
              </h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Ventas:</span>
                  <span>${formatearNumero(estadoData.ventas)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Costo de Venta:</span>
                  <span>${formatearNumero(estadoData.costoVenta)}</span>
                </li>
              </ul>
              <h5 className="alinear-derecha">
                <span>Utilidad Bruta:</span>
                <span>${formatearNumero(estadoData.utilidadBruta)}</span>
              </h5>
              <h4 style={{ textDecoration: "underline" }}>GASTOS DE OPERACIÓN</h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Administración:</span>
                  <span>${formatearNumero(estadoData.administracion)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Gerencia Financiera:</span>
                  <span>${formatearNumero(estadoData.gerenciaFinanciera)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Auditoría Interna:</span>
                  <span>${formatearNumero(estadoData.auditoriaInterna)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Gerencia Ventas y Mercadeo:</span>
                  <span>${formatearNumero(estadoData.gerenciaVentasMercadeo)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>División Avícola:</span>
                  <span>${formatearNumero(estadoData.divisionAvicola)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Dirección:</span>
                  <span>${formatearNumero(estadoData.direccion)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Cadena de Suministros:</span>
                  <span>${formatearNumero(estadoData.cadenaSuministros)}</span>
                </li>
              </ul>
              <h5 className="alinear-derecha">
                <span>Utilidad de Operación:</span>
                <span>${formatearNumero(estadoData.utilidadOperacion)}</span>
              </h5>

              <h4 style={{ textDecoration: "underline" }}>GASTOS NO OPERACIONALES</h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Gastos Financieros:</span>
                  <span>${formatearNumero(estadoData.gastosFinancieros)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Otros Gastos No Operacionales:</span>
                  <span>${formatearNumero(estadoData.otrosGastosNoOperacionales)}</span>
                </li>
              </ul>
              <h5 className="alinear-derecha">
                <span>Utilidad Antes de Impuestos y Reserva:</span>
                <span>${formatearNumero(estadoData.utilidadAntesImpuestosReserva)}</span>
              </h5>

              <h4 style={{ textDecoration: "underline" }}>RESERVA LEGAL</h4>
              <h5 className="alinear-derecha">
                <span>Reserva Legal (7%):</span>
                <span>${formatearNumero(estadoData.reservaLegal)}</span>
              </h5>

              <h4 style={{ textDecoration: "underline" }}>UTILIDAD ANTES DE IMPUESTO</h4>
              <h5 className="alinear-derecha">
                <span>Utilidad Antes de Impuesto:</span>
                <span>${formatearNumero(estadoData.utilidadAntesImpuesto)}</span>
              </h5>

              <h4 style={{ textDecoration: "underline" }}>IMPUESTO SOBRE LA RENTA</h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Impuesto sobre la Renta:</span>
                  <span>${formatearNumero(estadoData.impuestoRenta)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>CESC grandes contribuyentes:</span>
                  <span>${formatearNumero(estadoData.cescGrandesContribuyentes)}</span>
                </li>
              </ul>
              <h5 className="alinear-derecha">
                <span>Utilidad Distribuible:</span>
                <span>${formatearNumero(estadoData.utilidadDistribuible)}</span>
              </h5>

              <button onClick={descargarJson}>Descargar JSON</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Por favor, selecciona un año para ver el estado de resultado.</p>
      )}
    </div>
  );
}

export default EstadoDeResultado;
