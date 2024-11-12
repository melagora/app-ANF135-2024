import { useState } from "react";
import "../css/Estado.css"; // Asegúrate de importar el mismo CSS
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function AnalisisVertical() {
  const [añoSeleccionado, setAñoSeleccionado] = useState("");
  const [balanceData, setBalanceData] = useState(null);
  const [estadoData, setEstadoData] = useState(null);
  const [vista, setVista] = useState("balance"); // Por defecto, muestra el balance

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

  // Función para formatear los números
  const formatearNumero = (numero) => {
    return parseFloat(numero).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calcularPorcentaje = (parte, total) => {
    return total ? ((parte / total) * 100).toFixed(2) + "%" : "0.00%";
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
            <label>Seleccionar Vista:</label>
            <select onChange={(e) => setVista(e.target.value)} value={vista}>
              <option value="">-- Seleccionar Opcion --</option>
              <option value="balance">Balance General</option>
              <option value="estado">Estado de Resultado</option>
            </select>
          </div>
        </div>

        <div>
          {/* Mostrar el botón solo si se ha seleccionado un año */}
          {añoSeleccionado && <button onClick={generarPDF}>Generar PDF</button>}
        </div>
      </div>

      {vista === "balance" && balanceData ? (
        <div id="pdfContent">
          <div className="centrar">
            <h4>Saram S.A de C.V.</h4>
            <h4>
              {vista === "balance"
                ? "Análisis Vertical del Balance General"
                : "Estado de Resultado"}
            </h4>
            <h5>
              Del 1 de enero hasta el 31 de diciembre del {añoSeleccionado}
            </h5>
            <h5>
              Cifras expresadas en miles de dólares de los Estados Unidos de
              América
            </h5>
          </div>
          <div className="json">
            {/* Aquí va el contenido del balance general */}
            <div>
              <h4 style={{ paddingTop: "20px", textDecoration: "underline" }}>
                ACTIVOS
              </h4>
              <h5>ACTIVO CORRIENTE</h5>
              <ul>
                <li className="alinear-derecha">
                  <span>Efectivo y Equivalentes al Efectivo: </span>
                  <span>
                    ${formatearNumero(balanceData.efectivo)} (
                    {calcularPorcentaje(
                      balanceData.efectivo,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Inversiones Financieras a Corto Plazo: </span>
                  <span>
                    ${formatearNumero(balanceData.inversionesCortoPlazo)} (
                    {calcularPorcentaje(
                      balanceData.inversionesCortoPlazo,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Deudores Comerciales y Otras Cuentas por Cobrar: </span>
                  <span>
                    ${formatearNumero(balanceData.deudoresComerciales)} (
                    {calcularPorcentaje(
                      balanceData.deudoresComerciales,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Inventarios: </span>
                  <span>
                    ${formatearNumero(balanceData.inventarios)} (
                    {calcularPorcentaje(
                      balanceData.inventarios,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Pagos Anticipados: </span>
                  <span>
                    ${formatearNumero(balanceData.pagosAnticipados)} (
                    {calcularPorcentaje(
                      balanceData.pagosAnticipados,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
              </ul>
              <h5>
                TOTAL ACTIVO CORRIENTE: $
                {formatearNumero(balanceData.totalActivoCorriente)} (
                {calcularPorcentaje(
                  balanceData.totalActivoCorriente,
                  balanceData.totalActivos
                )}
                )
              </h5>

              <h5>ACTIVO NO CORRIENTE</h5>
              <ul>
                <li className="alinear-derecha">
                  <span>Propiedad, Planta y Equipo (neto): </span>
                  <span>
                    ${formatearNumero(balanceData.propiedadPlantaEquipo)} (
                    {calcularPorcentaje(
                      balanceData.propiedadPlantaEquipo,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Activo Biológico: </span>
                  <span>
                    ${formatearNumero(balanceData.activoBiologico)} (
                    {calcularPorcentaje(
                      balanceData.activoBiologico,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Intangibles: </span>
                  <span>
                    ${formatearNumero(balanceData.intangibles)} (
                    {calcularPorcentaje(
                      balanceData.intangibles,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Inversiones Financieras a Largo Plazo: </span>
                  <span>
                    ${formatearNumero(balanceData.inversionesLargoPlazo)} (
                    {calcularPorcentaje(
                      balanceData.inversionesLargoPlazo,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Proyectos en Proceso: </span>
                  <span>
                    ${formatearNumero(balanceData.proyectosProceso)} (
                    {calcularPorcentaje(
                      balanceData.proyectosProceso,
                      balanceData.totalActivos
                    )}
                    )
                  </span>
                </li>
              </ul>
              <h5>
                TOTAL ACTIVO NO CORRIENTE: $
                {formatearNumero(balanceData.totalActivoNoCorriente)} (
                {calcularPorcentaje(
                  balanceData.totalActivoNoCorriente,
                  balanceData.totalActivos
                )}
                )
              </h5>

              <h5 style={{ textDecoration: "underline" }}>
                TOTAL ACTIVO: ${formatearNumero(balanceData.totalActivos)}
              </h5>

              <h4 style={{ textDecoration: "underline" }}>PASIVOS</h4>
              <h5>PASIVO CORRIENTE</h5>
              <ul>
                <li className="alinear-derecha">
                  <span>Deudas Financieras a Corto Plazo: </span>
                  <span>
                    ${formatearNumero(balanceData.deudasCortoPlazo)} (
                    {calcularPorcentaje(
                      balanceData.deudasCortoPlazo,
                      balanceData.totalPasivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>
                    Deudas Comerciales y Otras Cuentas por Pagar a Corto Plazo:{" "}
                  </span>
                  <span>
                    ${formatearNumero(balanceData.deudasComerciales)} (
                    {calcularPorcentaje(
                      balanceData.deudasComerciales,
                      balanceData.totalPasivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Beneficios a Empleados a Corto Plazo: </span>
                  <span>
                    ${formatearNumero(balanceData.beneficiosEmpleados)} (
                    {calcularPorcentaje(
                      balanceData.beneficiosEmpleados,
                      balanceData.totalPasivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Impuestos por Pagar: </span>
                  <span>
                    ${formatearNumero(balanceData.impuestosPorPagar)} (
                    {calcularPorcentaje(
                      balanceData.impuestosPorPagar,
                      balanceData.totalPasivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Dividendos por Pagar: </span>
                  <span>
                    ${formatearNumero(balanceData.dividendosPorPagar)} (
                    {calcularPorcentaje(
                      balanceData.dividendosPorPagar,
                      balanceData.totalPasivos
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h5>
                TOTAL PASIVO CORRIENTE: $
                {formatearNumero(balanceData.totalPasivoCorriente)} (
                {calcularPorcentaje(
                  balanceData.totalPasivoCorriente,
                  balanceData.totalPasivos
                )}
                )
              </h5>

              <h5>PASIVO NO CORRIENTE</h5>
              <ul>
                <li className="alinear-derecha">
                  <span>Deudas Financieras a Largo Plazo: </span>
                  <span>
                    ${formatearNumero(balanceData.deudasLargoPlazo)} (
                    {calcularPorcentaje(
                      balanceData.deudasLargoPlazo,
                      balanceData.totalPasivos
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Provisiones y Otros Pasivos a Largo Plazo: </span>
                  <span>
                    ${formatearNumero(balanceData.provisiones)} (
                    {calcularPorcentaje(
                      balanceData.provisiones,
                      balanceData.totalPasivos
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h5>
                TOTAL PASIVO NO CORRIENTE: $
                {formatearNumero(balanceData.totalPasivoNoCorriente)} (
                {calcularPorcentaje(
                  balanceData.totalPasivoNoCorriente,
                  balanceData.totalPasivos
                )}
                )
              </h5>

              <h5 style={{ textDecoration: "underline" }}>
                TOTAL PASIVO: ${formatearNumero(balanceData.totalPasivos)}
              </h5>

              <h4 style={{ textDecoration: "underline" }}>PATRIMONIO</h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Capital Social: </span>
                  <span>
                    ${formatearNumero(balanceData.capitalSocial)} (
                    {calcularPorcentaje(
                      balanceData.capitalSocial,
                      balanceData.totalPatrimonio
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Reservas: </span>
                  <span>
                    ${formatearNumero(balanceData.reservas)} (
                    {calcularPorcentaje(
                      balanceData.reservas,
                      balanceData.totalPatrimonio
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Resultados Acumulados: </span>
                  <span>
                    ${formatearNumero(balanceData.resultadosAcumulados)} (
                    {calcularPorcentaje(
                      balanceData.resultadosAcumulados,
                      balanceData.totalPatrimonio
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Resultados del Ejercicio: </span>
                  <span>
                    ${formatearNumero(balanceData.resultadosEjercicio)} (
                    {calcularPorcentaje(
                      balanceData.resultadosEjercicio,
                      balanceData.totalPatrimonio
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>
                    Ajustes y Efectos por Valuación y Cambio de Valor:{" "}
                  </span>
                  <span>
                    ${formatearNumero(balanceData.ajustesEfectosValuacion)} (
                    {calcularPorcentaje(
                      balanceData.ajustesEfectosValuacion,
                      balanceData.totalPatrimonio
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h5>
                TOTAL PATRIMONIO: $
                {formatearNumero(balanceData.totalPatrimonio)}
              </h5>

              <h4 style={{ textDecoration: "underline" }}>
                TOTAL PASIVO + PATRIMONIO: $
                {formatearNumero(
                  balanceData.totalPasivos + balanceData.totalPatrimonio
                )}
              </h4>
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
      ) : vista === "estado" && estadoData ? (
        <div id="pdfContent">
          <div className="centrar">
            <h4>Saram S.A de C.V.</h4>
            <h4>
              {vista === "balance"
                ? "Análisis Vertical del Balance General"
                : "Análisis Vertical del Estado de Resultado"}
            </h4>
            <h5>
              Del 1 de enero hasta el 31 de diciembre del {añoSeleccionado}
            </h5>
            <h5>
              Cifras expresadas en miles de dólares de los Estados Unidos de
              América
            </h5>
          </div>
          <div className="json">
            {/* Aquí va el contenido del estado de resultados */}
            <div>
              <h4 style={{ paddingTop: "20px", textDecoration: "underline" }}>
                INGRESOS
              </h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Ventas: </span>
                  <span>
                    ${formatearNumero(estadoData.ventas)} (
                    {calcularPorcentaje(estadoData.ventas, estadoData.ventas)})
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Costo de Venta: </span>
                  <span>
                    ${formatearNumero(estadoData.costoVenta)} (
                    {calcularPorcentaje(
                      estadoData.costoVenta,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Utilidad Bruta: </span>
                  <span>
                    ${formatearNumero(estadoData.utilidadBruta)} (
                    {calcularPorcentaje(
                      estadoData.utilidadBruta,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h4 style={{ textDecoration: "underline" }}>
                GASTOS DE OPERACIÓN
              </h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Administración: </span>
                  <span>
                    ${formatearNumero(estadoData.administracion)} (
                    {calcularPorcentaje(
                      estadoData.administracion,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Gerencia Financiera: </span>
                  <span>
                    ${formatearNumero(estadoData.gerenciaFinanciera)} (
                    {calcularPorcentaje(
                      estadoData.gerenciaFinanciera,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Auditoría Interna: </span>
                  <span>
                    ${formatearNumero(estadoData.auditoriaInterna)} (
                    {calcularPorcentaje(
                      estadoData.auditoriaInterna,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Gerencia Ventas y Mercadeo: </span>
                  <span>
                    ${formatearNumero(estadoData.gerenciaVentasMercadeo)} (
                    {calcularPorcentaje(
                      estadoData.gerenciaVentasMercadeo,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>División Avícola: </span>
                  <span>
                    ${formatearNumero(estadoData.divisionAvicola)} (
                    {calcularPorcentaje(
                      estadoData.divisionAvicola,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Dirección: </span>
                  <span>
                    ${formatearNumero(estadoData.direccion)} (
                    {calcularPorcentaje(
                      estadoData.direccion,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Cadena de Suministros: </span>
                  <span>
                    ${formatearNumero(estadoData.cadenaSuministros)} (
                    {calcularPorcentaje(
                      estadoData.cadenaSuministros,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h4>
                UTILIDAD DE OPERACIÓN: $
                {formatearNumero(estadoData.utilidadOperacion)} (
                {calcularPorcentaje(
                  estadoData.utilidadOperacion,
                  estadoData.ventas
                )}
                )
              </h4>

              <h4 style={{ textDecoration: "underline" }}>
                GASTOS NO OPERACIONALES
              </h4>
              <ul>
                <li className="alinear-derecha">
                  <span>Gastos Financieros: </span>
                  <span>
                    ${formatearNumero(estadoData.gastosFinancieros)} (
                    {calcularPorcentaje(
                      estadoData.gastosFinancieros,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>Otros Gastos: </span>
                  <span>
                    ${formatearNumero(estadoData.otrosGastosNoOperacionales)} (
                    {calcularPorcentaje(
                      estadoData.otrosGastosNoOperacionales,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h5 className="alinear-derecha">
                Utilidad Antes de Impuestos y Reserva:{" "}
              </h5>

              <ul>
                <li className="alinear-derecha">
                  <span>Utilidad Antes de Impuestos y Reserva: </span>
                  <span>
                    ${formatearNumero(estadoData.utilidadAntesImpuestosReserva)}{" "}
                    (
                    {calcularPorcentaje(
                      estadoData.utilidadAntesImpuestosReserva,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h5 className="alinear-derecha">Reserva Legal: </h5>

              <ul>
                <li className="alinear-derecha">
                  <span>Reserva Legal: </span>
                  <span>
                    ${formatearNumero(estadoData.reservaLegal)} (
                    {calcularPorcentaje(
                      estadoData.reservaLegal,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h5 className="alinear-derecha">UTILIDAD ANTES DE IMPUESTO: </h5>

              <ul>
                <li className="alinear-derecha">
                  <span>UTILIDAD ANTES DE IMPUESTO: </span>
                  <span>
                    ${formatearNumero(estadoData.utilidadAntesImpuesto)} (
                    {calcularPorcentaje(
                      estadoData.utilidadAntesImpuesto,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h5 className="alinear-derecha">IMPUESTO SOBRE LA RENTA: </h5>

              <ul>
                <li className="alinear-derecha">
                  <span>IMPUESTO SOBRE LA RENTA: </span>
                  <span>
                    ${formatearNumero(estadoData.impuestoRenta)} (
                    {calcularPorcentaje(
                      estadoData.impuestoRenta,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
                <li className="alinear-derecha">
                  <span>CESC grandes contribuyentes: </span>
                  <span>
                    ${formatearNumero(estadoData.cescGrandesContribuyentes)} (
                    {calcularPorcentaje(
                      estadoData.cescGrandesContribuyentes,
                      estadoData.ventas
                    )}
                    )
                  </span>
                </li>
              </ul>

              <h4
                className="alinear-derecha"
                style={{ textDecoration: "underline" }}
              >
                <span>UTILIDAD DISTRIBUIBLE: </span>
                <span>
                  ${formatearNumero(estadoData.utilidadDistribuible)} (
                  {calcularPorcentaje(
                    estadoData.utilidadDistribuible,
                    estadoData.ventas
                  )}
                  )
                </span>
              </h4>
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
        <p>Por favor selecciona un año y vista.</p>
      )}
    </div>
  );
}

export default AnalisisVertical;
