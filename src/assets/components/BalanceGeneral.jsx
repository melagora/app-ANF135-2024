import { useState, useEffect } from "react";
import "../css/Estado.css"; // Asegúrate de importar el CSS
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BalanceGeneral() {
  const [añoSeleccionado, setAñoSeleccionado] = useState("");
  const [balanceData, setBalanceData] = useState(null);

  // useEffect para cargar el balance del localStorage al iniciar el componente
  useEffect(() => {
    const balances = JSON.parse(localStorage.getItem("balances")) || {};
    if (añoSeleccionado) {
      setBalanceData(balances[añoSeleccionado] || null); // Cargar el balance para el año seleccionado
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

  const [generandoPDF, setGenerandoPDF] = useState(false);
  const generarPDF = () => {
    setGenerandoPDF(true);
    setTimeout(() => {
      const input = document.getElementById("pdfContent");
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const contentWidth = pageWidth - 2 * margin;
        const contentHeight = pageHeight - 2 * margin;
        let imgWidth = contentWidth;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > contentHeight) {
          imgHeight = contentHeight;
          imgWidth = (canvas.width * imgHeight) / canvas.height;
        }

        const positionX = (pageWidth - imgWidth) / 2;
        const positionY = (pageHeight - imgHeight) / 2;

        pdf.addImage(imgData, "PNG", positionX, positionY, imgWidth, imgHeight);
        pdf.save(`BalanceGeneral_SARAM_${añoSeleccionado}.pdf`);
        setGenerandoPDF(false);
      });
    }, 300);
  };

  const descargarJson = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(balanceData)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = `BalanceGeneral_${añoSeleccionado}.json`;
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
            {/* Mostrar el botón solo si se ha seleccionado un año */}
            {añoSeleccionado && (
              <button onClick={generarPDF}>Generar PDF</button>
            )}
          </div>
        </div>
      </div>

      {añoSeleccionado && balanceData ? (
        <div id="pdfContent">
          <div className="centrar">
            <h4>Saram S.A de C.V.</h4>
            <h4>Balance General</h4>
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
              <h4 style={{ paddingTop: "20px", textDecoration: "underline" }}>
                ACTIVOS
              </h4>{" "}
              <h5>ACTIVO CORRIENTE</h5>
              <ul>
                <li className="alinear-derecha">
                  <span>Efectivo y Equivalentes al Efectivo:</span>
                  <span>${formatearNumero(balanceData.efectivo)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Inversiones Financieras a Corto Plazo:</span>
                  <span>
                    ${formatearNumero(balanceData.inversionesCortoPlazo)}
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Deudores Comerciales y Otras Cuentas por Cobrar:</span>
                  <span>
                    ${formatearNumero(balanceData.deudoresComerciales)}
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Inventarios:</span>
                  <span>${formatearNumero(balanceData.inventarios)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Pagos Anticipados:</span>
                  <span>${formatearNumero(balanceData.pagosAnticipados)}</span>
                </li>
              </ul>
              <h5>
                TOTAL ACTIVO CORRIENTE: $
                {formatearNumero(balanceData.totalActivoCorriente)}
              </h5>
              <h5>ACTIVO NO CORRIENTE</h5>
              <ul>
                <li className="alinear-derecha">
                  <span>Propiedad, Planta y Equipo (neto):</span>
                  <span>
                    ${formatearNumero(balanceData.propiedadPlantaEquipo)}
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Activo Biológico:</span>
                  <span>${formatearNumero(balanceData.activoBiologico)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Intangibles:</span>
                  <span>${formatearNumero(balanceData.intangibles)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Inversiones Financieras a Largo Plazo:</span>
                  <span>
                    ${formatearNumero(balanceData.inversionesLargoPlazo)}
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Proyectos en Proceso:</span>
                  <span>${formatearNumero(balanceData.proyectosProceso)}</span>
                </li>
              </ul>
              <h5>
                TOTAL ACTIVO NO CORRIENTE: $
                {formatearNumero(balanceData.totalActivoNoCorriente)}
              </h5>
              <h5 style={{ textDecoration: "underline" }}>
                TOTAL ACTIVO: ${formatearNumero(balanceData.totalActivos)}
              </h5>
              <h4 style={{ textDecoration: "underline" }}>PASIVOS</h4>
              <h5>PASIVO CORRIENTE</h5>
              <ul>
                <li className="alinear-derecha">
                  <span>Deudas Financieras a Corto Plazo:</span>
                  <span>${formatearNumero(balanceData.deudasCortoPlazo)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>
                    Deudas Comerciales y Otras Cuentas por Pagar a Corto Plazo:
                  </span>
                  <span>${formatearNumero(balanceData.deudasComerciales)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Beneficios a Empleados a Corto Plazo:</span>
                  <span>
                    ${formatearNumero(balanceData.beneficiosEmpleados)}
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Impuestos por Pagar:</span>
                  <span>${formatearNumero(balanceData.impuestosPorPagar)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Dividendos por Pagar:</span>
                  <span>
                    ${formatearNumero(balanceData.dividendosPorPagar)}
                  </span>
                </li>
              </ul>
              <h5>
                <marker>
                  TOTAL PASIVO CORRIENTE: $
                  {formatearNumero(balanceData.totalPasivoCorriente)}
                </marker>
              </h5>
              <h5>PASIVO NO CORRIENTE</h5>
              <ul>
                <li className="alinear-derecha">
                  <span>Deudas Financieras a Largo Plazo:</span>
                  <span>${formatearNumero(balanceData.deudasLargoPlazo)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Provisiones y Otros Pasivos a Largo Plazo:</span>
                  <span>${formatearNumero(balanceData.provisiones)}</span>
                </li>
              </ul>
              <h5>
                TOTAL PASIVO NO CORRIENTE: $
                {formatearNumero(balanceData.totalPasivoNoCorriente)}
              </h5>
              <h5 style={{ textDecoration: "underline" }}>
                TOTAL PASIVO: ${formatearNumero(balanceData.totalPasivos)}
              </h5>
              <h4 style={{ textDecoration: "underline" }}>PATRIMONIO</h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Capital Social:</span>
                  <span>${formatearNumero(balanceData.capitalSocial)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Reservas:</span>
                  <span>${formatearNumero(balanceData.reservas)}</span>
                </li>
                <li className="alinear-derecha">
                  <span>Resultados Acumulados:</span>
                  <span>
                    ${formatearNumero(balanceData.resultadosAcumulados)}
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Resultados del Ejercicio:</span>
                  <span>
                    ${formatearNumero(balanceData.resultadosEjercicio)}
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>
                    Ajustes y Efectos por Valuación y Cambio de Valor:
                  </span>
                  <span>
                    ${formatearNumero(balanceData.ajustesEfectosValuacion)}
                  </span>
                </li>
              </ul>
              <h5 style={{ textDecoration: "underline" }}>
                TOTAL PATRIMONIO: $
                {formatearNumero(balanceData.totalPatrimonio)}
              </h5>
              <h5 style={{ textDecoration: "underline" }}>
                TOTAL PASIVO Y PATRIMONIO: $
                {formatearNumero(balanceData.totalPasivosPatrimonio)}
              </h5>
            </div>
            <div
              className={
                generandoPDF ? "descargarJson oculto" : "descargarJson"
              }
            >
              <button onClick={descargarJson}>Descargar JSON</button>
            </div>
          </div>
          <div className={generandoPDF ? "firmas" : "firmas oculto"}>
            <div>
              <p>_______________</p>
              <p>Firma1</p>
            </div>
            <div>
              <p>_______________</p>
              <p>Firma2</p>
            </div>
            <div>
              <p>_______________</p>
              <p>Firma3</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Por favor, selecciona un año para ver el balance general.</p>
      )}
    </div>
  );
}

export default BalanceGeneral;
