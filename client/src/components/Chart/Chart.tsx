// amcharts 5
// ----------
// Stock Chart with Volume Profile
// https://codepen.io/CasebookKiller/pen/ByoxBEP?editors=0010
//
// Customizing Scrollbar Grips
// https://www.amcharts.com/docs/v5/tutorials/customizing-scrollbar-grips/
//
// Customizing Scrollbar Grips. Example
// https://codepen.io/team/amcharts/pen/rNEXgmW?editors=0010
//
// Colors, gradients, and patterns
// https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
//
// Locales
// https://www.amcharts.com/docs/v5/concepts/locales/#Translations_in_maps
// 
// Stock annotations
// https://www.amcharts.com/docs/v5/charts/stock/stock-annotations/
//
// Basic stock chart
// https://codepen.io/team/amcharts/pen/MWrmBoV?editors=0010
// 
// Zoom and pan
// https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Relative_pre_zoom
//
// Scrollbar with chart preview
// https://codepen.io/CasebookKiller/pen/KwdRZzN
// 
// Profesional candlesticks
// https://codepen.io/CasebookKiller/pen/wBKjKBQ?editors=0010
// 
//
// end amcharts 5
// ----------

import { useLayoutEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU";

//import { data } from './data';
import { translations } from './translations';

const colorPositive = 0x767D84;
const colorNegative = 0x5B636A;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Chart(props: any) {
  const chartRef = useRef<am5stock.StockChart | null>(null);
  
  console.log(props);
  
  //const series1Ref = useRef<am5xy.ColumnSeries | null>(null);
  //const series2Ref = useRef<am5xy.ColumnSeries | null>(null);
  //const xAxisRef = useRef<am5xy.CategoryAxis<am5xy.AxisRenderer> | null>(null);

  // This code will only run one time
  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");
    root.locale = am5locales_ru_RU;
    root.locale.firstDayOfWeek = 1;

    const tooltip = am5.Tooltip.new(root, {
      autoTextColor: false,
      getFillFromSprite: false,
      background: am5.Rectangle.new(root, {
        fill: am5.color(0xffffff),
        stroke :am5.color(0x000000),
        strokeOpacity: 0.3  
      })
    });

    tooltip.label.setAll({
      fill: am5.color(0x000000),
      fontSize: "0.8em"
    })

    // eslint-disable-next-line react-hooks/unsupported-syntax
    class MyTheme extends am5.Theme {
      setupDefaultRules() {
        // Set theme rules here
        // ...
        this.rule("Grid", ["scrollbar", "minor"]).setAll({
          visible: false
        });

        this.rule("Label").setAll({
          fontSize: 12,
          fill: am5.color(0x777777)
        });

        this.rule("AxisRenderer").setAll({
          minGridDistance: 30
        });

        this.rule("RoundedRectangle", ["series", "column", "volumeprofile"]).setAll({
          tooltip: tooltip, 
          tooltipX: am5.p100,
          tooltipText: "[#2E78E3]продажи: {down.formatNumber('0.0a')}[/] [#E3B30C]покупки: {up.formatNumber('0.0a')}[/] всего: {total.formatNumber('0.0a')}"
        })
      }
    }

    root.language.setTranslationsAny(translations);

    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Dark.new(root),
      MyTheme.new(root)
    ]);


    const stockChart = root.container.children.push(
      am5stock.StockChart.new(root, {
        paddingRight: 0,
        stockPositiveColor: am5.color(0x009999),
        stockNegativeColor: am5.color(0x006666),
        volumePositiveColor:am5.color(colorPositive),
        volumeNegativeColor: am5.color(colorNegative)
      })
    );

    root.numberFormatter.set("numberFormat", "#,###.00");

    const mainPanel = stockChart.panels.push(
      am5stock.StockPanel.new(root, {
        wheelY: "zoomX",
        panX: true,
        panY: true,
        height: am5.percent(70)
      })
    );

    const valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom"
        }),
        tooltip: am5.Tooltip.new(root, {}),
        numberFormat: "#,###.00",
        extraTooltipPrecision: 2
      })
    );

    const dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        groupData: true,
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );    

    const valueSeries = mainPanel.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: "MSFT",
        clustered: false,
        valueXField: "Date",
        valueYField: "Close",
        highValueYField: "High",
        lowValueYField: "Low",
        openValueYField: "Open",
        calculateAggregates: true,
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
        legendRangeValueText: ""
      })
    );    

    valueSeries.columns.template.setAll({
      strokeWidth: 2
    });

    stockChart.set("stockSeries", valueSeries);

    const valueLegend = mainPanel.plotContainer.children.push(
      am5stock.StockLegend.new(root, {
        stockChart: stockChart
      })
    );

    const volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
      inside: true
    });

    volumeAxisRenderer.labels.template.set("forceHidden", true);
    volumeAxisRenderer.grid.template.set("forceHidden", true);

    const volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
      numberFormat: "#.#a",
      height: am5.percent(20),
      y: am5.percent(100),
      centerY: am5.percent(100),
      renderer: volumeAxisRenderer
    }));

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
      name: "Volume",
      clustered: false,
      valueXField: "Date",
      valueYField: "Volume",
      xAxis: dateAxis,
      yAxis: volumeValueAxis,
      legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]"
    }));

    volumeSeries.columns.template.setAll({
      strokeOpacity: 0,
      fillOpacity: 0.5
    });

    // color columns by stock rules
    volumeSeries.columns.template.adapters.add("fill", function (fill, target) {
      const dataItem = target.dataItem;
      if (dataItem) {
        return stockChart.getVolumeColor(dataItem);
      }
      return fill;
    })

    stockChart.set("volumeSeries", volumeSeries);
    valueLegend.data.setAll([valueSeries, volumeSeries]);

    //valueLegend.data.setAll([valueSeries]);



    mainPanel.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: "y!"
      })
    );

    

    const scrollbarX = am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 40
    });

    const scrollbar = mainPanel.set("scrollbarX", scrollbarX);

    scrollbar.thumb.setAll({
      fill: am5.color(0x000000),
      fillOpacity: 0.3
    });

    stockChart.toolsContainer.children.push(scrollbar);
    
    const sbDateAxis = scrollbar.chart.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    const sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        valueYField: "Close",
        valueXField: "Date",
        xAxis: sbDateAxis,
        yAxis: sbValueAxis
      })
    );

    sbSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3
    });

    const volumeProfile = stockChart.indicators.push(am5stock.VolumeProfile.new(root, {
      stockChart: stockChart,
      stockSeries: valueSeries,
      volumeSeries: volumeSeries,
      legend: valueLegend
    }));

    volumeProfile.setAll({
      draggable: true,
      upColor: am5.color(colorPositive),
      downColor: am5.color(colorNegative)
    });

    customizeGrip(scrollbar.startGrip);
    customizeGrip(scrollbar.endGrip);

    console.log('scrollbar', scrollbar);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function customizeGrip(grip: any) {
      grip.get("background").setAll({
        fillOpacity: 0,
        strokeOpacity: 0
      });
      
      grip.get("icon").set("forceHidden", true);
      //grip.children.push(am5.Line.new(root, {
      //  fill: am5.color(0x8080AB),
      //  width: 4,
      //  height: 4,
      //  x: am5.p50,
      //  centerX: am5.p50,
      //  y: am5.p50,
      //  centerY: am5.p50,
      //  rotation: 45
      //}));
      
      grip.children.push(am5.Rectangle.new(root, {
        fill: am5.color(0x8080AB),
        width: 3,
        height: scrollbar.get("height"),
        x: am5.p50,
        centerX: am5.p50,
        y: am5.p50,
        centerY: am5.p50
      }));
      
      grip.setAll({
        maskContent: true
      });
      
      grip.events.on("pointerdown", function() {
        console.log("down")
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function loadData(ticker: any, series: any) {
      // Load external data
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
      am5.net
        .load(
          "https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" +
            ticker +
            ".csv"
        )
        .then(function (result) {
          if (result.response) {
            // Parse loaded data
            const data = am5.CSVParser.parse(result.response, {
              delimiter: ",",
              skipEmpty: true,
              useColumnNames: true
            });

            // Process data (convert dates and values)
            const processor = am5.DataProcessor.new(root, {
              dateFields: ["Date"],
              dateFormat: "yyyy-MM-dd",
              numericFields: [
                "Open",
                "High",
                "Low",
                "Close",
                "Adj Close",
                "Volume"
              ]
            });
            processor.processMany(data);

            // Set data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            am5.array.each(series, function (item: any) {
              item.data.setAll(data);
            });
          }
        });
        
    }

    // Load initial data for the first series
    loadData("MSFT", [valueSeries, volumeSeries, sbSeries]);

//valueSeries.data.setAll(data);
//volumeSeries.data.setAll(data);
//sbSeries.data.setAll(data);

    const chartcontrols = document.getElementById("chartcontrols") || document.createElement("div");

    /*let toolbar = */am5stock.StockToolbar.new(root, {
      container: chartcontrols,
      stockChart: stockChart,
      controls: [
        am5stock.IndicatorControl.new(root, {
          stockChart: stockChart,
          legend: valueLegend
        }),
        am5stock.DateRangeSelector.new(root, {
          stockChart: stockChart
        }),
        am5stock.PeriodSelector.new(root, {
          stockChart: stockChart
        }),

        am5stock.DrawingControl.new(root, {
          stockChart: stockChart
        }),
        am5stock.ResetControl.new(root, {
          stockChart: stockChart
        }),
        am5stock.SettingsControl.new(root, {
          stockChart: stockChart
        })
      ]
    });    


    /////////
    /*let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category"
      })
    );

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value1",
        categoryXField: "category"
      })
    );

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        categoryXField: "category"
      })
    );

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);
    
    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    
    xAxisRef.current = xAxis;
    series1Ref.current = series1;
    series2Ref.current = series2;
    */

    chartRef.current = stockChart;

    return () => {
      root.dispose();
    };
  }, []);

  // This code will only run when props.data changes
  useLayoutEffect(() => {
    chartRef.current?.set("paddingRight", props.paddingRight);
    //xAxisRef.current?.data.setAll(props.data);
    //series1Ref.current?.data.setAll(props.data);
    //series2Ref.current?.data.setAll(props.data);
  }, [props.data, props.paddingRight]);

  return [
    <div
      key="chartcontrols"
      id="chartcontrols"
      style={{ height: "auto", padding: "5px 45px 0 15px" }}
    />,
    <div
      key="chartdiv"
      id="chartdiv"
      style={{ width: "100%", height: "500px" }}
    />
  ];
}
export default Chart;