import React from "react";
import Box from "../../resumen/box/Box";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useQuery } from "react-query";
import { getData } from "../../../../api/fetchingFunctions";

const CategoriesChart = () => {
  const chartID = "categoriesdiv";
  const [data, setData] = React.useState([]);

  const { isLoading, isError } = useQuery(
    ["categoriesChart"],
    () => getData("/api/charts/chartData"),
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

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yRenderer = am5xy.AxisRendererY.new(root, {
        minGridDistance: 1,
      });

      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0,
          categoryField: "category",
          renderer: yRenderer,
          tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] }),
        })
      );

      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0,
          min: 0,
          extraMax: 0.1,
          renderer: am5xy.AxisRendererX.new(root, {}),
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "value",
          categoryYField: "category",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "{valueX}",
          }),
        })
      );

      // Axis sorting
      function sortCategoryAxis() {
        // Sort by value
        series.dataItems.sort(function (x, y) {
          return x.get("valueX") - y.get("valueX"); // descending
          //return y.get("valueY") - x.get("valueX"); // ascending
        });

        // Go through each axis item
        am5.array.each(yAxis.dataItems, function (dataItem) {
          // get corresponding series item
          let seriesDataItem = getSeriesItem(dataItem.get("category"));

          if (seriesDataItem) {
            // get index of series data item
            let index = series.dataItems.indexOf(seriesDataItem);
            // calculate delta position
            let deltaPosition =
              (index - dataItem.get("index", 0)) / series.dataItems.length;
            // set index to be the same as series data item index
            dataItem.set("index", index);
            // set deltaPosition instanlty
            dataItem.set("deltaPosition", -deltaPosition);
            // animate delta position to 0
            dataItem.animate({
              key: "deltaPosition",
              to: 0,
              duration: 1000,
              easing: am5.ease.out(am5.ease.cubic),
            });
          }
        });

        // Sort axis items by index.
        // This changes the order instantly, but as deltaPosition is set,
        // they keep in the same places and then animate to true positions.
        yAxis.dataItems.sort(function (x, y) {
          return x.get("index") - y.get("index");
        });
      }

      // Rounded corners for columns
      series.columns.template.setAll({
        cornerRadiusTR: 5,
        cornerRadiusBR: 5,
      });

      // Make each column to be of a different color
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      yAxis.data.setAll(data);
      series.data.setAll(data);
      sortCategoryAxis();

      // Get series item by category
      function getSeriesItem(category) {
        for (let i = 0; i < series.dataItems.length; i++) {
          let dataItem = series.dataItems[i];
          if (dataItem.get("categoryY") === category) {
            return dataItem;
          }
        }
      }

      return () => root.dispose();
    }
  }, [chartID, data]);

  if (isLoading)
    return (
      <Box className="mt-3">
        <h2 className="mb-0">Gráfico por categoría</h2>
        <p className="mb-0 py-2 text-center">Cargando...</p>
      </Box>
    );
  if (isError)
    return (
      <Box className="mt-3">
        <h2 className="mb-0">Gráfico por categoría</h2>
        <p className="mb-0 py-2 text-center text-danger">
          Error cargando gráfico
        </p>
      </Box>
    );
  return (
    <Box className="mb-3">
      <h2>Gráfico por categoría</h2>
      {data && data.length > 0 ? (
        <div
          id={chartID}
          style={{ width: "100%", height: `${data.length * 30 + 75}px` }}
        ></div>
      ) : (
        <p className="text-center mb-0 py-2">Sin datos</p>
      )}
    </Box>
  );
};

export default CategoriesChart;
