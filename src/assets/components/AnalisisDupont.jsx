import "../css/IndicadoresFinancieros.css";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AnalisisDupont = () => {
  const [añoSeleccionado, setAñoSeleccionado] = useState("");
  const [balanceData, setBalanceData] = useState(null);
  const [estadoData, setEstadoData] = useState(null);

  const handleAñoChange = (e) => {
    const año = e.target.value;
    setAñoSeleccionado(año);

    // Cargar balances y estados desde localStorage
    const balances = JSON.parse(localStorage.getItem('balances')) || {};
    const estados = JSON.parse(localStorage.getItem('estados')) || {};

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

      pdf.save(`AnalisisDupont_SARAM_${añoSeleccionado}.pdf`);
    });
  };

  // Cálculos para el análisis DuPont
  const utilidadNeta = estadoData ? estadoData.utilidadDistribuible : 0;
  const ventas = estadoData ? estadoData.ventas : 0;
  const activosTotales = balanceData ? balanceData.totalActivos : 0;
  const patrimonio = balanceData ? balanceData.capitalSocial : 0;

  const margenUtilidadNeta = ventas ? (utilidadNeta / ventas).toFixed(4) : null;
  const rotacionActivos = activosTotales ? (ventas / activosTotales).toFixed(4) : null;
  const apalancamiento = patrimonio ? (activosTotales / patrimonio).toFixed(4) : null;

  const roe = margenUtilidadNeta && rotacionActivos && apalancamiento
    ? (margenUtilidadNeta * rotacionActivos * apalancamiento).toFixed(4)
    : null;

  return (
    <div className="info">
      <div className="containerBotonesInfo">
        <div className="selector">
          <h1>Seleccione un año para el Análisis DuPont:</h1>
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
          {añoSeleccionado && (
            <button onClick={generarPDF}>Generar PDF</button>
          )}
        </div>
      </div>

      {añoSeleccionado && balanceData && estadoData ? (
        <div id="pdfContent">
          <div className="infoIndicadorEmpresa">
            <p>SARAM S.A de C.V.</p>
            <p>Análisis DuPont</p>
            <p>Del 1 de enero hasta el 31 de diciembre del {añoSeleccionado}</p>
            <p>Cifras expresadas en miles de dólares de los Estados Unidos de América</p>
          </div>

          <div className="containerPorEstado">
            <div className="">
              <p>Rendimiento sobre el Patrimonio (ROE)</p>
              <p>{roe}</p>
            </div>
            <div className="">
              <p>Rendimiento sobre los Activos Totales (ROA)</p>
              <p>{(roe && rotacionActivos) ? (roe / rotacionActivos).toFixed(4) : 0}</p>
            </div>
            <div className="">
              <p>Margen de Utilidad Neta</p>
              <p>{margenUtilidadNeta}</p>
            </div>
            <div className="">
              <p>Utilidad Neta</p>
              <p>${utilidadNeta.toLocaleString()}</p>
            </div>
            <div className="">
              <p>Ventas</p>
              <p>${ventas.toLocaleString()}</p>
            </div>
            <div className="">
              <p>Rotación de los Activos Totales</p>
              <p>{rotacionActivos}</p>
            </div>
            <div className="">
              <p>Multiplicador de Apalancamiento Financiero (MAF)</p>
              <p>{apalancamiento}</p>
            </div>
            <div className="">
              <p>Activos Totales</p>
              <p>${activosTotales.toLocaleString()}</p>
            </div>
            <div className="">
              <p>Patrimonio</p>
              <p>${patrimonio.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>
          Por favor, selecciona un año para ver el Análisis DuPont.
        </p>
      )}
    </div>
  );
};

export default AnalisisDupont;
