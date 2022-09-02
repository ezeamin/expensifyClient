import React from "react";
import Box from "../../resumen/box/Box";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useQuery } from "react-query";
import { getData } from "../../../../api/fetchingFunctions";
import getMonth from "../../../../helpers/getMonth";

const ExpenseOldChart = () => {
  const chartID = "spentAndIncomeOldDiv";
  const [data, setData] = React.useState([]);

  const { isLoading, isError } = useQuery(
    ["spentAndIncomeOldChart"],
    () => getData("/api/charts/spentAndIncomeOldChart"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          data.data.forEach((item) => {
            item.month = getMonth(false, item.month);
          });
          setData(data.data);
        }
      },
    }
  );

  React.useLayoutEffect(() => {
    if (data && data.length > 0) {
      const root = am5.Root.new(chartID);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
        })
      );

      // We don't want zoom-out button to appear while animating, so we hide it
      chart.zoomOutButton.set("forceHidden", true);

      var cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "none",
        })
      );
      cursor.lineY.set("visible", false);

      let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
      });

      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.5,
          categoryField: "month",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 1,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series1 = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Gastado",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "spent",
          categoryXField: "month",
          stroke: "#e85454",
          fill: "#e85454",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "{valueY}",
          }),
        })
      );

      series1.strokes.template.setAll({
        strokeWidth: 2,
      });

      series1.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Circle.new(root, {
            radius: 4,
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2,
            fill: "#e85454",
          }),
        });
      });

      let series2 = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Ingreso",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "income",
          categoryXField: "month",
          stroke: "#32a852",
          fill: "#32a852",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "{valueY}",
          }),
        })
      );

      series2.strokes.template.setAll({
        strokeWidth: 2,
      });

      series2.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Circle.new(root, {
            radius: 4,
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2,
            fill: "#32a852",
          }),
        });
      });

      yAxis.data.setAll(data);
      xAxis.data.setAll(data);
      series1.data.setAll(data);
      series2.data.setAll(data);

      series1.appear(1000);
      series2.appear(1000);
      chart.appear(1000, 100);

      return () => root.dispose();
    }
  }, [chartID, data]);

  if (isLoading)
    return (
      <Box className="mt-3">
        <h2 className="mb-0">Grafico histórico</h2>
        <p className="mb-0 py-2 text-center">Cargando...</p>
      </Box>
    );
  if (isError)
    return (
      <Box className="mt-3">
        <h2 className="mb-0">Grafico histórico</h2>
        <p className="mb-0 py-2 text-center text-danger">
          Error cargando gráfico
        </p>
      </Box>
    );
  return (
    <Box className="mb-3">
      <h2 className="mb-0">Grafico histórico</h2>
      {data && data.length > 0 ? (
        <div
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          <div id={chartID} style={{ width: "150%", height: `400px` }}></div>
        </div>
      ) : (
        <p className="text-center mb-0 py-2">Sin datos</p>
      )}
    </Box>
  );
};

export default ExpenseOldChart;
