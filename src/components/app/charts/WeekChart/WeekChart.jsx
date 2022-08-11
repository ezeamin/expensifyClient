import React from "react";
import Box from "../../resumen/box/Box";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useQuery } from "react-query";
import { getData } from "../../../../api/fetchingFunctions";
import getMonth from "../../../../helpers/getMonth";

const WeekChart = () => {
  const chartID = "weekdiv";
  const [data, setData] = React.useState([]);
  const month = getMonth(new Date().getMonth());

  const { isLoading, isError } = useQuery(
    ["weekChart"],
    () => getData("/api/charts/weekChart"),
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
      const root = am5.Root.new(chartID);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          layout: root.verticalLayout,
        })
      );

      // Create axes and their renderers
      var yRenderer = am5xy.AxisRendererY.new(root, {
        visible: false,
        minGridDistance: 20,
        inversed: true,
      });

      yRenderer.grid.template.set("visible", false);

      var yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0,
          renderer: yRenderer,
          categoryField: "weekday",
        })
      );

      var xRenderer = am5xy.AxisRendererX.new(root, {
        visible: false,
        minGridDistance: 30,
        opposite: true,
      });

      xRenderer.grid.template.set("visible", false);

      var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: xRenderer,
          categoryField: "hour",
        })
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          calculateAggregates: true,
          stroke: am5.color(0xffffff),
          clustered: false,
          xAxis: xAxis,
          yAxis: yAxis,
          categoryXField: "hour",
          categoryYField: "weekday",
          valueField: "value",
        })
      );

      series.columns.template.setAll({
        tooltipText: "{value}",
        strokeOpacity: 1,
        strokeWidth: 2,
        width: am5.percent(100),
        height: am5.percent(100),
      });

      series.columns.template.events.on("pointerover", function (event) {
        var di = event.target.dataItem;
        if (di) {
          heatLegend.showValue(di.get("value", 0));
        }
      });

      series.events.on("datavalidated", function () {
        heatLegend.set("startValue", series.getPrivate("valueHigh"));
        heatLegend.set("endValue", series.getPrivate("valueLow"));
      });

      // Set up heat rules
      // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
      series.set("heatRules", [
        {
          target: series.columns.template,
          min: am5.color(0xfffb77),
          max: am5.color(0xfe131a),
          dataField: "value",
          key: "fill",
        },
      ]);

      // Add heat legend
      // https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/
      var heatLegend = chart.bottomAxesContainer.children.push(
        am5.HeatLegend.new(root, {
          orientation: "horizontal",
          endColor: am5.color(0xfffb77),
          startColor: am5.color(0xfe131a),
        })
      );

      series.data.setAll(data);

      yAxis.data.setAll([
        { weekday: "Lunes" },
        { weekday: "Martes" },
        { weekday: "Miercoles" },
        { weekday: "Jueves" },
        { weekday: "Viernes" },
        { weekday: "Sabado" },
        { weekday: "Domingo" },
      ]);

      xAxis.data.setAll([
        { hour: "7hs" },
        { hour: "9hs" },
        { hour: "11hs" },
        { hour: "13hs" },
        { hour: "15hs" },
        { hour: "17hs" },
        { hour: "19hs" },
        { hour: "21hs" },
        { hour: "23hs" },
        { hour: "1hs" },
        { hour: "3hs" },
        { hour: "5hs" },
      ]);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
      chart.appear(1000, 100);

      return () => root.dispose();
    }
  }, [chartID,data]);

  if (isLoading)
    return (
      <Box className="mt-3">
        <h2 className="mb-0">Gráfico por semana</h2>
        <p className="mb-0 py-2 text-center">Cargando...</p>
      </Box>
    );
  if (isError)
    return (
      <Box className="mt-3">
        <h2 className="mb-0">Gráfico por semana</h2>
        <p className="mb-0 py-2 text-center text-danger">
          Error cargando gráfico
        </p>
      </Box>
    );
  return (
    <Box className="mb-3">
      <h2 className="mb-0">Gráfico por semana</h2>
      <p className="mb-1">{month}</p>
      {data && data.length > 0 ? (
        <div
          style={{
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          <div id={chartID} style={{ width: "200%", height: `300px` }}></div>
        </div>
      ) : (
        <p className="text-center mb-0 py-2">Sin datos</p>
      )}
    </Box>
  );
};

export default WeekChart;
