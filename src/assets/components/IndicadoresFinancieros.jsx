import "../css/IndicadoresFinancieros.css";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const IndicadoresFinancieros = () => {
  const [añoSeleccionado, setAñoSeleccionado] = useState("");
  const [balanceData, setBalanceData] = useState(null);
  const [estadoData, setEstadoData] = useState(null);

  const handleAñoChange = (e) => {
    const año = e.target.value;
    setAñoSeleccionado(año);

    // Cargar balances y estados desde localStorage
    const balances = JSON.parse(localStorage.getItem("balances")) || {};
    const estados = JSON.parse(localStorage.getItem("estados")) || {};

    if (balances[año]) {
      setBalanceData(balances[año]);
    } else {
      setBalanceData(null);
    }

    if (estados[año]) {
      setEstadoData(estados[año]);
    } else {
      setEstadoData(null);
    }
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
        pdf.save(`AnalisisDupont_SARAM_${añoSeleccionado}.pdf`);
        setGenerandoPDF(false);
      });
    }, 300);
  };

  // Cálculos de los indicadores
  const razonDeLiquidez = balanceData
    ? (
        balanceData.totalActivoCorriente / balanceData.totalPasivoCorriente
      ).toFixed(2)
    : null;
  const pruebaAcida = balanceData
    ? (
        (balanceData.totalActivoCorriente - balanceData.inventarios) /
        balanceData.totalPasivoCorriente
      ).toFixed(2)
    : null;
  const capitalDeTrabajo = balanceData
    ? (
        balanceData.totalActivoCorriente - balanceData.totalPasivoCorriente
      ).toFixed(2)
    : null;
  const razonDeEndeudamiento = balanceData
    ? (balanceData.totalPasivos / balanceData.totalActivos).toFixed(2)
    : null;
  const razonDeudaCapitalPatrimonial = balanceData
    ? (balanceData.totalPasivos / balanceData.capitalSocial).toFixed(2)
    : null;
  const margenUtilidadBruta = estadoData
    ? (estadoData.utilidadBruta / estadoData.ventas).toFixed(2)
    : null;
  const margenUtilidadOperativa = estadoData
    ? (estadoData.utilidadOperacion / estadoData.ventas).toFixed(2)
    : null;
  const margenUtilidadNeta = estadoData
    ? (estadoData.utilidadDistribuible / estadoData.ventas).toFixed(2)
    : null;
  const rotacionActivosTotales =
    estadoData && balanceData
      ? (estadoData.ventas / balanceData.totalActivos).toFixed(2)
      : null;
  const periodoPromedioCobro =
    estadoData && balanceData
      ? ((balanceData.deudoresComerciales / estadoData.ventas) * 365).toFixed(2)
      : null;
  const periodoPromedioPago =
    estadoData && balanceData
      ? ((balanceData.deudasComerciales / estadoData.costoVenta) * 365).toFixed(
          2
        )
      : null;
      

  return (
    <div className="info">
      <div className="containerBotonesInfo">
        <div className="selector">
          <h1>Seleccione un año para ver sus respectivos Indicadores:</h1>
          <select
            id="yearSelector"
            onChange={handleAñoChange}
            value={añoSeleccionado}
          >
            <option value="">Seleccionar año:</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          {/* Mostrar el botón solo si se ha seleccionado un año */}
          {añoSeleccionado && <button onClick={generarPDF}>Generar PDF</button>}
        </div>
      </div>

      {añoSeleccionado && balanceData && estadoData ? (
        <div id="pdfContent">
          <div className="infoIndicadorEmpresa">
            <p>SARAM S.A de C.V.</p>
            <p>Indicadores Financieros</p>
            <p>Del 1 de enero hasta el 31 de diciembre del {añoSeleccionado}</p>
            <p>
              Cifras expresadas en miles de dólares de los Estados Unidos de
              América
            </p>
          </div>

          <div className="containerPorEstado">
            <div className="tituloContainer">
              <p>Indicadores de Liquidez</p>
            </div>
            <div className="infoContainer">
              <p>Razón de liquidez: {razonDeLiquidez}%</p>
              <p>Prueba ácida: {pruebaAcida}</p>
              <p>Capital de Trabajo: ${capitalDeTrabajo}</p>
            </div>
          </div>

          <div className="containerPorEstado">
            <div className="tituloContainer">
              <p>Índices de Endeudamiento o Apalancamiento</p>
            </div>
            <div className="infoContainer">
              <p>Razón de endeudamiento: {razonDeEndeudamiento} ({(razonDeEndeudamiento*100).toFixed(2)}%)</p>
              <p>
                Razón deuda-capital patrimonial: {razonDeudaCapitalPatrimonial}%
              </p>
            </div>
          </div>

          <div className="containerPorEstado">
            <div className="tituloContainer">
              <p>Índices de Rentabilidad</p>
            </div>
            <div className="infoContainer">
              <p>Margen de utilidad bruta: {margenUtilidadBruta} ({(margenUtilidadBruta*100).toFixed(2)}%)</p>
              <p>Margen de utilidad operativa: {margenUtilidadOperativa} ({(margenUtilidadOperativa*100).toFixed(2)}%)</p>
              <p>Margen de utilidad neta: {margenUtilidadNeta} ({(margenUtilidadNeta*100).toFixed(2)}%)</p>
            </div>
          </div>

          <div className="containerPorEstado">
            <div className="tituloContainer">
              <p>Indicadores de Actividad</p>
            </div>
            <div className="infoContainer">
              <p>Rotación de activos totales: {rotacionActivosTotales}%</p>
              <p>Período promedio de cobro: {periodoPromedioCobro} días</p>
              <p>Período promedio de pago: {periodoPromedioPago} días</p>
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
        <p>
          Por favor, selecciona un año para ver los indicadores financieros.
        </p>
      )}
    </div>
  );
};

export default IndicadoresFinancieros;
