import React from "react";
import Box from "../../resumen/box/Box";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useQuery } from "react-query";
import { getData } from "../../../../api/fetchingFunctions";
import getMonth from "../../../../helpers/getMonth";

const DayChart = () => {
  const chartID1 = "dayexpensediv";
  const chartID2 = "dayincomediv";
  const [data, setData] = React.useState([]);
  const month = getMonth(new Date().getMonth());

  const { isLoading, isError } = useQuery(
    ["dayChart"],
    () => getData("/api/charts/dayChart"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setData(data.data);
        }
      },
    }
  );

  React.useLayoutEffect(() => {
    if (data && data.length > 0) {
      const root1 = am5.Root.new(chartID1);
      const root2 = am5.Root.new(chartID2);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root1.setThemes([am5themes_Animated.new(root1)]);

      let yRenderer1 = am5xy.AxisRendererY.new(root1, {
        minGridDistance: 1,
      });

      let yRenderer2 = am5xy.AxisRendererY.new(root2, {
        minGridDistance: 1,
      });

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart1 = root1.container.children.push(
        am5xy.XYChart.new(root1, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
          layout: root1.verticalLayout,
        })
      );

      var chart2 = root2.container.children.push(
        am5xy.XYChart.new(root2, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
          layout: root2.verticalLayout,
        })
      );

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var yAxis1 = chart1.yAxes.push(
        am5xy.CategoryAxis.new(root1, {
          categoryField: "day",
          renderer: yRenderer1,
          tooltip: am5.Tooltip.new(root1, {}),
        })
      );

      yAxis1.data.setAll(data);

      var yAxis2 = chart2.yAxes.push(
        am5xy.CategoryAxis.new(root2, {
          categoryField: "day",
          renderer: yRenderer2,
          tooltip: am5.Tooltip.new(root2, {}),
        })
      );

      yAxis2.data.setAll(data);

      var xAxis1 = chart1.xAxes.push(
        am5xy.ValueAxis.new(root1, {
          min: 0,
          renderer: am5xy.AxisRendererX.new(root1, {}),
        })
      );

      var xAxis2 = chart2.xAxes.push(
        am5xy.ValueAxis.new(root2, {
          min: 0,
          renderer: am5xy.AxisRendererX.new(root2, {}),
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series1 = chart1.series.push(
        am5xy.ColumnSeries.new(root1, {
          name: "Gastos",
          xAxis: xAxis1,
          yAxis: yAxis1,
          valueXField: "expenses",
          categoryYField: "day",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root1, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryY}: {valueX}",
          }),
        })
      );

      series1.columns.template.setAll({
        height: am5.percent(70),
      });
      series1.set("fill", am5.color("#e74f4f"));
      series1.set("stroke", am5.color("#e74f4f"));

      // Rounded corners for columns
      series1.columns.template.setAll({
        cornerRadiusTR: 5,
        cornerRadiusBR: 5,
      });

      var series2 = chart2.series.push(
        am5xy.ColumnSeries.new(root2, {
          name: "Ingresos",
          xAxis: xAxis2,
          yAxis: yAxis2,
          valueXField: "incomes",
          categoryYField: "day",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root2, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryY}: {valueX}",
          }),
        })
      );

      series2.columns.template.setAll({
        height: am5.percent(70),
      });

      series2.set("fill", am5.color("#69bb70"));
      series2.set("stroke", am5.color("#69bb70"));

      // Rounded corners for columns
      series2.columns.template.setAll({
        cornerRadiusTR: 5,
        cornerRadiusBR: 5,
      });

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor1 = chart1.set(
        "cursor",
        am5xy.XYCursor.new(root1, {
          behavior: "zoomY",
        })
      );
      cursor1.lineX.set("visible", false);

      var cursor2 = chart2.set(
        "cursor",
        am5xy.XYCursor.new(root2, {
          behavior: "zoomY",
        })
      );
      cursor2.lineX.set("visible", false);

      series1.data.setAll(data);
      series2.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series1.appear();
      series2.appear();
      chart1.appear(1000, 100);
      chart2.appear(1000, 100);

      return () => {
        root1.dispose();
        root2.dispose();
      };
    }
  }, [chartID1, data]);

  if (isLoading)
    return (
      <>
        <Box className="mt-3">
          <h2 className="mb-0">Gráfico por día - Gastos</h2>
          <p className="mb-0 py-2 text-center">Cargando...</p>
        </Box>
        <Box className="mt-3">
          <h2 className="mb-0">Gráfico por día - Ingresos</h2>
          <p className="mb-0 py-2 text-center">Cargando...</p>
        </Box>
      </>
    );
  if (isError)
    return (
      <>
        <Box className="mt-3">
          <h2 className="mb-0">Gráfico por día - Gastos</h2>
          <p className="mb-0 py-2 text-center text-danger">
            Error cargando gráfico
          </p>
        </Box>
        <Box className="mt-3">
          <h2 className="mb-0">Gráfico por día - Ingresos</h2>
          <p className="mb-0 py-2 text-center text-danger">
            Error cargando gráfico
          </p>
        </Box>
      </>
    );
  return (
    <>
      <Box className="mb-3">
        <h2 className="mb-0">Gráfico por día - Gastos</h2>
        <p className="mb-1">{month}</p>
        {data && data.length > 0 ? (
          <div
            id={chartID1}
            style={{ width: "100%", height: `${data.length * 30 + 75}px` }}
          ></div>
        ) : (
          <p className="text-center mb-0 py-2">Sin datos</p>
        )}
      </Box>
      <Box className="mb-3">
        <h2 className="mb-0">Gráfico por día - Ingresos</h2>
        <p className="mb-1">{month}</p>
        {data && data.length > 0 ? (
          <div
            id={chartID2}
            style={{ width: "100%", height: `${data.length * 30 + 75}px` }}
          ></div>
        ) : (
          <p className="text-center mb-0 py-2">Sin datos</p>
        )}
      </Box>
    </>
  );
};

export default DayChart;
