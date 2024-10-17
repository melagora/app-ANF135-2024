import "../css/IndicadoresFinancieros.css";
import React, { useState } from "react";


const IndicadoresFinancieros = () => {
  const [year, setYear] = useState("seleccion");

  const data = [
    {
      year: "2023",
      ventasNetas: 55944165.92,
      ventasNetasACredito: 124234.89,
      comprasACredito: 23234234.34,
      activosTotalesIniciales: 24489222.79,
      activosTotalesFinales: 21647909.15,
      deudaTotal: 100,
      activosTotales: 21647909.15,
      cuentasPorCobrarIniciales: 200,
      cuentasPorCobrarFinales: 10,
      cuentasPorPagarIniciales: 1360661.55,
      cuentasPorPagarFinales: 1720989.69,
      comprasTotales: 300,
      capitalPatrimonial: 21647909.15,
      activosCorrientes: 10676174.16,
      pasivosCorrientes: 6529246.02,
      costosDeBienesVendidos: 46658627.01,
      gastosOperativos: 5162601.08,
      intereses: 0,
      impuestos: 1332048.2,
    },
    {
      year: "2022",
      ventasNetas: 52844893.13,
      ventasNetasACredito: 124234.89,
      comprasACredito: 23234234.34,
      activosTotalesIniciales: 10,
      activosTotalesFinales: 20,
      deudaTotal: 100,
      activosTotales: 24489222.79,
      cuentasPorCobrarIniciales: 200,
      cuentasPorCobrarFinales: 10,
      cuentasPorPagarIniciales: 100,
      cuentasPorPagarFinales: 20,
      comprasTotales: 300,
      capitalPatrimonial: 24489222.79,
      activosCorrientes: 13835693.28,
      pasivosCorrientes: 8833237.83,
      costosDeBienesVendidos: 45215728.59,
      gastosOperativos: 4490928.33,
      intereses: 0,
      impuestos: 899871.41,
    },
    {
      year: "2021",
      ventasNetas: 300000000,
      ventasNetasACredito: 124234.89,
      comprasACredito: 23234234.34,
      activosTotalesIniciales: 10,
      activosTotalesFinales: 20,
      deudaTotal: 100,
      activosTotales: 10,
      cuentasPorCobrarIniciales: 200,
      cuentasPorCobrarFinales: 10,
      cuentasPorPagarIniciales: 100,
      cuentasPorPagarFinales: 20,
      comprasTotales: 300,
      capitalPatrimonial: 200,
      activosCorrientes: 600,
      pasivosCorrientes: 200,
      costosDeBienesVendidos: 20000,
      gastosOperativos: 40,
      intereses: 40,
      impuestos: 30,
    },
    {
      year: "2020",
      ventasNetas: 4000000,
      ventasNetasACredito: 124234.89,
      comprasACredito: 23234234.34,
      activosTotalesIniciales: 10,
      activosTotalesFinales: 20,
      deudaTotal: 100,
      activosTotales: 10,
      cuentasPorCobrarIniciales: 200,
      cuentasPorCobrarFinales: 10,
      cuentasPorPagarIniciales: 100,
      cuentasPorPagarFinales: 20,
      comprasTotales: 300,
      capitalPatrimonial: 200,
      activosCorrientes: 600,
      pasivosCorrientes: 200,
      costosDeBienesVendidos: 20000,
      gastosOperativos: 40,
      intereses: 40,
      impuestos: 30,
    },
    {
      year: "2019",
      ventasNetas: 900000,
      /**Ventas Netas=Ventas Brutas−Devoluciones−Descuentos*/
      ventasNetasACredito: 124234.89,
      comprasACredito: 23234234.34,
      activosTotalesIniciales: 10,
      activosTotalesFinales: 20,
      deudaTotal: 100,
      activosTotales: 10,
      cuentasPorCobrarIniciales: 200,
      cuentasPorCobrarFinales: 10,
      cuentasPorPagarIniciales: 100,
      cuentasPorPagarFinales: 20,
      comprasTotales: 300,
      capitalPatrimonial: 200,
      activosCorrientes: 600,
      pasivosCorrientes: 200,
      costosDeBienesVendidos: 20000,
      gastosOperativos: 40,
      intereses: 40,
      impuestos: 30,
    },
  ];
  function calcularIndicadoresFinancieros(data) {
    data.forEach(item => {
      // Cálculos intermedios
      const utilidadBruta = item.ventasNetas - item.costosDeBienesVendidos;
      const utilidadOperativa = utilidadBruta - item.gastosOperativos;
      const utilidadNeta = utilidadOperativa - item.intereses - item.impuestos;
  
      // Promedios
      const activosTotalesPromedio = (item.activosTotalesIniciales + item.activosTotalesFinales) / 2;
      const cuentasPorCobrarPromedio = (item.cuentasPorCobrarIniciales + item.cuentasPorCobrarFinales) / 2;
      const cuentasPorPagarPromedio = (item.cuentasPorPagarIniciales + item.cuentasPorPagarFinales) / 2;
  
      // Indicadores financieros
      item.rotacionDeActivosTotales = item.ventasNetas / activosTotalesPromedio;
      item.periodoPromedioDeCobro = (cuentasPorCobrarPromedio / item.ventasNetasACredito) * 365;
      item.periodoPromedioDePago = (cuentasPorPagarPromedio / item.comprasACredito) * 365;
      item.razonDeEndeudamiento = item.deudaTotal / item.activosTotales;
      item.razonDeDeudaACapitalPatrimonial = item.deudaTotal / item.capitalPatrimonial;
      item.razonDeLiquidez = item.activosCorrientes / item.pasivosCorrientes;
      item.margeDeUtilidadBruta = (utilidadBruta / item.ventasNetas) * 100;
      item.margenUtilidadOperativa = (utilidadOperativa / item.ventasNetas) * 100;
      item.margeDeUtilidadNeta = (utilidadNeta / item.ventasNetas) * 100;
    });
  }
  
  // Llamada a la función con los datos
  calcularIndicadoresFinancieros(data);

  //******************************* */
  // Función para manejar el cambio en el selector de año
  const handleCalcularClick = (event) => {
    const selectedYear = event.target.value; // Obtiene el valor del año seleccionado
    setYear(selectedYear); // Actualiza el estado con el año seleccionado
  };

  const selectedData = data.find((item) => item.year === year);

  return (
    <div className="info">
      <div className="containerBotonesInfo">
        <div className="selector">
          <h1>Seleccione un año para ver su respetivos Indicadores:</h1>
          <select
            id="yearSelector"
            onChange={handleCalcularClick}
            defaultValue={year}
          >
            <option value="seleccion">Seleccionar año:</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>
      </div>

      {/* Solo mostrar la información si se ha seleccionado un año válido */}
      {year !== "seleccion" && selectedData && (
        <>
          <div className="infoIndicadorEmpresa">
            <p>Saram S.A de C.V.</p>
            <p>Indicadores Financieros</p>
            <p>
              Del 1 de enero hasta el 31 de diciembre del <span>{year}</span>
            </p>
            <p>
              Cifras expresadas en miles de dólares de los Estados Unidos de
              América
            </p>
          </div>

          <div className="containerPorEstado">
            <div className="tituloContainer">
              <p>Indicadores de Actividad</p>
            </div>
            <div className="infoContainer">
              <p>
                Rotación de activos totales -{" "}
                {selectedData.rotacionDeActivosTotales}
              </p>
              <p>
                Período promedio de cobro -{" "}
                {selectedData.periodoPromedioDeCobro}
              </p>
              <p>
                Periodo promedio de pago - {selectedData.periodoPromedioDePago}
              </p>
            </div>
          </div>
          <div className="containerPorEstado">
            <div className="tituloContainer">
              <p>Indicadores de Deuda</p>
            </div>
            <div className="infoContainer">
              <p>
                Razón de endeudamiento - {selectedData.razonDeEndeudamiento}
              </p>
              <p>
                Razón de deuda a Capital patrimonial -{" "}
                {selectedData.razonDeDeudaACapitalPatrimonial}
              </p>
            </div>
          </div>
          <div className="containerPorEstado">
            <div className="tituloContainer">
              <p>Indicadores de Liquidez</p>
            </div>
            <div className="infoContainer">
              <p>Razón de liquidez - {selectedData.razonDeLiquidez}</p>
            </div>
          </div>
          <div className="containerPorEstado">
            <div className="tituloContainer">
              <p>Indicadores de Rentabilidad</p>
            </div>
            <div className="infoContainer">
              <p>
                Margen de utilidad bruta - {selectedData.margeDeUtilidadBruta}%
              </p>
              <p>
                Margen de utilidad operativa -{" "}
                {selectedData.margeDeUtilidadOperativa}%
              </p>
              <p>
                Margen de utilidad neta - {selectedData.margeDeUtilidadNeta}%
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndicadoresFinancieros;
