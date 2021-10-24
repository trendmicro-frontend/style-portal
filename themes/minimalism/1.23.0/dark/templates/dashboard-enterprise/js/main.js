$("nav.navbar").affix({
  offset: {
    top: 64
  }
});
$(".dashboard-tabs").affix({
  offset: {
    top: 64
  }
});
$("nav.navbar").removeClass("affix-top");

var $chart1, $chart2, $chart3, $chart5;
var checkStep = function (width) {
  if (width < 480 ) {
    return 3;
  } else if (width < 850 ) {
    return 2;
  } 
  return 1;
}
var updateChart = function () {
  if ($chart1) {
    $chart1.update({
      xAxis: [{
        labels: {
          step: checkStep($(".stacked-column-chart").width())
        }
      }]
    });
  }
  if ($chart2) {
    $chart2.update({
      xAxis: [{
        labels: {
          step: checkStep($(".standard-area-chart").width())
        }
      }]
    });
  }
  if ($chart3) {
    $chart3.update({
      xAxis: [{
        labels: {
          step: checkStep($(".standard-line-chart").width())
        }
      }]
    });
  }
  if ($chart5) {
    $chart5.update({
      xAxis: [{
        labels: {
          step: checkStep($(".stacked-column-chart-2").width())
        }
      }]
    });
  }
};
$(function() {
  setTimeout(function() {
    var summay1 = `<div class="summary">
                    <div class="icon-area detection-summary"></div>
                    <ul class="summary-details">
                      <li>
                        <div class="summary-item">
                          <a href="javascript:;" class="count display3">155</a>
                          <p class="summary-label">Known Threats</p>
                        </div>
                      </li>
                      <li>
                        <div class="summary-item">
                          <a href="javascript:;" class="count display3">45</a>
                          <p class="summary-label">UnKnown Threats</p>
                        </div>
                      </li>
                      <li>
                        <div class="summary-item">
                          <span class="count display3">0</span>
                          <p class="summary-label">Policy Violations</p>
                        </div>
                      </li>
                    </ul>
                  </div>`;
    $("#summary-1 .loader-overlay").fadeOut();
    $("#summary-1 .widget-body").append(summay1);
  }, 500);

  setTimeout(function() {
    var summay2 = `<div class="summary">
                    <div class="icon-area management-summary"></div>
                    <ul class="summary-details">
                      <li>
                        <div class="summary-item">
                          <a href="javascript:;" class="count display3">6</a>
                          <p class="summary-label">Managed Agents</p>
                        </div>
                      </li>
                      <li>
                        <div class="summary-item">
                          <span class="count display3">0</span>
                          <p class="summary-label">Outdated Agents</p>
                        </div>
                      </li>
                      <li>
                        <div class="summary-item">
                        <a href="javascript:;" class="count display3">3</a>
                          <p class="summary-label">Unmanaged Endpoints</p>
                        </div>
                      </li>
                    </ul>
                  </div>`;
    $("#summary-2 .loader-overlay").fadeOut();
    $("#summary-2 .widget-body").append(summay2);
  }, 600);

  setTimeout(function() {
    var chart1 = `<div class="date-range btn-group clearfix">
                    <button type="button" class="pull-right btn btn-link dropdown-toggle" data-toggle="dropdown">
                        <span class="tmicon tmicon-caret-down"></span>Last 24 hours
                    </button>
                    <ul class="dropdown-menu pull-right">
                        <li><a href="#">Last 24 hours</a></li>
                        <li><a href="#">Last 7 days</a></li>
                        <li><a href="#">Last 30 days</a></li>
                        <li><a href="#">Last 90 days</a></li>
                    </ul>
                  </div>
                  <div class="stacked-column-chart chart">
                    <div id="stacked-column-chart-container" class="chart-container column-chart-container-with-bottom-legend"></div>
                    <div class="legend">
                        <ul></ul>
                        <div class="legend-page"><i class="tmicon tmicon-caret-up"></i><span class="now"></span> / <span class="total"></span><i class="tmicon tmicon-caret-down"></i></div>
                    </div>
                  </div>`;
    $("#chart-1 .loader-overlay").fadeOut();
    $("#chart-1 .widget-body").append(chart1);
    
    var columnChartSeries = [
      {
        name: "Malicious Content",
        data: [50, 0, 0, 0, 230, 540, 800, 800, 810, 780, 300, 100, 0, 0, 0, 0, 0, 0, 0, 40, 0, 30, 0, 0]
      }, 
      {
        name: "Malicious Behavior",
        data: [300, 250, 385, 500, 1200, 1120, 1000, 780, 820, 1180, 450, 370, 300, 300, 250, 250, 200, 200, 180, 50, 0, 0, 0, 0]
      }, 
      {
        name: "Suspicious Behavior",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 40, 30
        ]
      }, 
      {
        name: "Grayware",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 55, 0, 0
        ]
      }, 
      {
        name: "Exploites",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 40, 50, 50
        ]
      }
    ];
    var columnChartColors = ["#0096cc", "#4cc383", "#fd884e", "#5bd2ea", "#e56669"];

    $chart1 = Highcharts.chart(
      "stacked-column-chart-container", {
        chart: {
          type: "column",
          height: 330,
          marginTop: 25,
          spacingBottom: 0,
          events: {
            load: function() {
              var legend = $(".stacked-column-chart .legend");
              var legendContainer = $("ul", legend);
              var legend_page = $(".legend-page", legend);
              var page_up = $(".tmicon-caret-up", legend_page);
              var page_down = $(".tmicon-caret-down", legend_page);
              var now_page = $(".now", legend_page);
              var total_page = $(".total", legend_page);
              var initPage = "1";
              var legend_height = legend.height();
              var totally_page;

              for (var i = 0; i < columnChartSeries.length; i++) {
                var color_idx = i % 10;
                var newItem = $(
                    "<li>" + columnChartSeries[i].name + "</li>"
                  )
                  .addClass(
                    "color-" + columnChartColors[color_idx].replace("#", "")
                  );
                legendContainer.append(newItem);
                newItem[0].series = columnChartSeries[i];
                if (columnChartSeries[i].visible == false) {
                  newItem.addClass("mute");
                }
              }
              var ul_height = legendContainer.height();

              if (ul_height > legend_height) {
                drawLegendPage();
              }

              function drawLegendPage() {
                var legend_postion = legendContainer.css("margin-top");
                legend.addClass("scrollable");
                ul_height = legendContainer.height();
                var page = parseInt(ul_height) / 30;
                totally_page = Math.ceil(page);
                total_page.text(totally_page);

                if (legend_postion == "0px") {
                  now_page.text(initPage);
                  page_up.addClass("unable");
                } else {
                  var now = parseInt(now_page.text());
                  if (now > totally_page) {
                    changePage(totally_page);
                  } else if (now < totally_page) {
                    page_down.removeClass("unable");
                  } else {
                    page_down.addClass("unable");
                  }
                }
                legend_page.addClass("show");
              }

              function changePage(pages) {
                var value = pages - 1;
                var margin_value = value * legend_height;
                if (pages < 1 || pages > totally_page) {
                  return false;
                } else {
                  now_page.text(pages); //change page
                  legendContainer.css("margin-top", "-" + margin_value + "px"); //change legend
                }
              }
              page_up.on("click", function() {
                var now = parseInt(now_page.text()) - 1;
                if (now == 1) {
                  page_up.addClass("unable");
                }
                page_down.removeClass("unable");
                changePage(now);
              });

              page_down.on("click", function() {
                var now = parseInt(now_page.text()) + 1;
                if (now == totally_page) {
                  page_down.addClass("unable");
                }
                page_up.removeClass("unable");
                changePage(now);
              });
              $(window)
                .on("resize", function() {
                  ul_height = legendContainer.height();
                  if (ul_height > legend_height) {
                    drawLegendPage();
                  } else {
                    legendContainer.css("margin-top", "");
                    page_down.removeClass("unable");
                    page_up.addClass("unable");
                    legend_page.removeClass("show");
                    legend.removeClass("scrollable");
                  }
                });
            }
          },
          style: {
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
          }
        },
        colors: columnChartColors,
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          tickInterval: 3600 * 1000,
          showFirstLabel: true,
          labels: {
            autoRotation: 0,
            style: {
              fontSize: '12px',
              fontWeight: 'normal',
              paddingBottom: '10px',
              color: '#888888'
            },
            step: checkStep($(".stacked-column-chart").width()),
            formatter: function() {
              return moment(this.value)
                .format("HH:mm");
            }
          },
          tickWidth: 0
        },
        yAxis: {
          title: {
            text: null,
            style: {
                color: '#888888'
            }
          },
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 'normal',
              textOverflow: 'none',
              color: '#888888'
            }
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            stacking: "normal",
            borderColor: '#2c2c2c',
            pointStart: moment.utc(moment("2019-04-21 15:00")).valueOf(),
            pointInterval: 3600 * 1000,
            states: {
              hover: {
                brightness: 0.12
              }
            }
          }
        },
        tooltip: {
          shared: true,
          backgroundColor: '#222222',
          borderColor: '#888888',
          padding: 16,
          useHTML: true,
          formatter: function() {
            return (
              this.points.reduce(function(s, point) {
                  return (
                    s +
                    '<tr><td><span style="color:' +
                    point.color +
                    '">\u25CF</span> ' +
                    point.series.name +
                    " </td><td>" +
                    point.y +
                    "</td></tr>"
                  );
                }, "<table><thead><tr><td>" +
                moment(this.x)
                .format("YYYY-MM-DD HH:mm") +
                "</td></tr></thead><tbody>") + "</table>"
            );
          }
        },
        series: columnChartSeries
      },
      function(chart) {
        // bind events to your own custom legend
        $(document)
          .on("click", ".stacked-column-chart .legend li", function (event) {
            var target = event.target || event.srcElement;
            var target_idx = $(this).index();
            var series = chart.series[target_idx];
            if (target.closest(".legend") && target.tagName === "LI" && series) {
              if (series.visible === true) {
                series.hide();
                target.className += " mute";
              } else {
                target.className = target.className.replace(" mute", "");
                series.show();
              }
            }
          });
      }
    );
  }, 1300);

  setTimeout(function() {
    var chart2 = `<div class="clearfix">
                    <div class="traffic-mode btn-group">
                      <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                          <span class="tmicon tmicon-caret-down"></span>All Traffic
                      </button>
                      <ul class="dropdown-menu">
                          <li><a href="#">All Traffic</a></li>
                          <li><a href="#">Malicious Traffic</a></li>
                      </ul>
                    </div>
                    <div class="date-range btn-group pull-right">
                      <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                          <span class="tmicon tmicon-caret-down"></span>Last 24 hours
                      </button>
                      <ul class="dropdown-menu pull-right">
                          <li><a href="#">Last 24 hours</a></li>
                          <li><a href="#">Last 7 days</a></li>
                          <li><a href="#">Last 30 days</a></li>
                          <li><a href="#">Last 90 days</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="standard-area-chart chart">
                    <div id="area-chart-container" class="chart-container column-chart-container-with-bottom-legend"></div>
                    <div class="legend">
                        <ul></ul>
                    </div>
                  </div>`;
    $("#chart-2 .loader-overlay").fadeOut();
    $("#chart-2 .widget-body").append(chart2);
    var AreaChartSeries = [
      {
        name: "All Traffic",
        data: [28, 26, 22, 40, 48, 57, 37, 42, 35, 36, 30, 36, 32, 35, 34, 29, 31, 40, 55, 50, 44, 28, 28, 15]
      }, 
      {
        name: "Malicious Traffic",
        data: [4, 6, 6, 8, 7, 8, 10, 8, 9, 8, 8, 6, 5, 6, 8, 11, 15, 16, 13, 11, 12, 11, 10, 4]
      }
    ];
    var AreaChartColors = ["#0096cc", "#4cc383"];

    $chart2 = Highcharts.chart(
      "area-chart-container", {
        chart: {
          type: "area",
          height: 330,
          marginTop: 25,
          spacingBottom: 0,
          events: {
            load: function() {
              var legend = $(".standard-area-chart .legend");
              var legendContainer = $("ul", legend);
              for (var i = 0; i < AreaChartSeries.length; i++) {
                var color_idx = i % 10;
                var newItem = $(
                    "<li>" + AreaChartSeries[i].name + "</li>"
                  )
                  .addClass(
                    "color-" + AreaChartColors[color_idx].replace("#", "")
                  );
                legendContainer.append(newItem);
                newItem[0].series = AreaChartSeries[i];
                if (AreaChartSeries[i].visible == false) {
                  newItem.addClass("mute");
                }
              }
            }
          },
          style: {
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
          }
        },
        colors: AreaChartColors,
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          tickInterval: 3600 * 1000,
          showFirstLabel: true,
          labels: {
            autoRotation: 0,
            style: {
              fontSize: "12px",
              fontWeight: "normal",
              color: "#888888",
              paddingBottom: "10px"
            },
            step: checkStep($(".standard-area-chart").width()),
            formatter: function() {
              return moment(this.value).format("HH:mm");
            }
          },
          tickWidth: 0
        },
        yAxis: {
          tickInterval: 25,
          title: {
            text: "(GB)",
            margin: -20,
            y: -155,
            x: -10,
            rotation: 0,
            style: {
              color: '#888888'
            }
          },
          labels: {
            style: {
              fontSize: "12px",
              fontWeight: "normal",
              color: "#888888"
            }
          }
        },
        legend: {
          enabled: false
        },
        series: AreaChartSeries,
        plotOptions: {
          area: {
            stacking: 'normal'
          },
          series: {
            pointStart: moment.utc(moment("2019-04-21 15:00")).valueOf(),
            pointInterval: 3600 * 1000,
            fillOpacity: 0.4,
            marker: {
              enabled: false,
              radius: 4,
              symbol: "circle",
              states: {
                hover: {
                  lineWidth: 3,
                  radius: 5
                }
              }
            },
            states: {
              hover: {
                halo: {
                  size: 13,
                  opacity: 0.4
                }
              }
            }
          }
        },
        tooltip: {
          backgroundColor: "#222222",
          padding: 16,
          useHTML: true,
          formatter: function() {
            return `<table>
                      <thead>
                        <tr>
                          <td>${moment(this.x).format("YYYY-MM-DD HH:mm")}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span style="color:${this.color}">\u25CF</span> ${this.series.name}</td>
                          <td>${this.y}</td>
                        </tr>
                      </tbody>
                    </table>`;
          }
        }
      },
      function(chart) {
        // bind events to your own custom legend
        $(document)
          .on("click", ".standard-area-chart .legend li", function(
            event
          ) {
            var target = event.target || event.srcElement;
            var target_idx = $(this)
              .index();
            var series = chart.series[target_idx];
            if (target.closest(".legend") && target.tagName === "LI" && series) {
              if (series.visible === true) {
                series.hide();
                target.className += " mute";
              } else {
                target.className = target.className.replace(" mute", "");
                series.show();
              }
            }
          });
      }
    );
  }, 800);

  setTimeout(function() {
    var chart3 = `<div class="date-range btn-group clearfix">
                    <button type="button" class="pull-right btn btn-link dropdown-toggle" data-toggle="dropdown">
                        <span class="tmicon tmicon-caret-down"></span>Last 90 days
                    </button>
                    <ul class="dropdown-menu pull-right">
                        <li><a href="#">Last 24 hours</a></li>
                        <li><a href="#">Last 7 days</a></li>
                        <li><a href="#">Last 30 days</a></li>
                        <li><a href="#">Last 90 days</a></li>
                    </ul>
                  </div>
                  <div class="standard-line-chart chart">
                    <div id="line-chart-container" class="chart-container line-chart-container-with-bottom-legend"></div>
                    <div class="legend">
                        <ul></ul>
                        <div class="legend-page"><i class="tmicon tmicon-caret-up"></i><span class="now"></span> / <span class="total"></span><i class="tmicon tmicon-caret-down"></i></div>
                    </div>
                  </div>`;
    $("#chart-3 .loader-overlay").fadeOut();
    $("#chart-3 .widget-body").append(chart3);

    var lineChartSeries = [{
      name: "Suspicious File",
      data: [5, 8, 8, 9, 10, 11, 10, 9, 8, 9, 10, 10, 12]
    }, {
      name: "Spam",
      data: [14, 13, 14, 14, 11, 10, 9, 7, 9, 11, 17, 19, 20]
    }, {
      name: "Phishing",
      data: [17, 16, 17, 17, 16, 17, 19, 18, 17, 16, 18, 17, 16]
    }, {
      name: "Content Violation",
      data: [18, 19, 23, 28, 29, 31, 31, 30, 29, 28, 29, 32, 37]
    }, {
      name: "DLP Incident",
      data: [24, 22, 22, 23, 22, 20, 22, 25, 25, 24, 22, 24, 24]
    }];
    var lineChartColors = ["#0096cc", "#4cc383", "#fd884e", "#5bd2ea", "#e56669"];
    $chart3 = Highcharts.chart(
      "line-chart-container", {
        chart: {
          type: "line",
          height: 330,
          marginTop: 25,
          spacingBottom: 0,
          events: {
            load: function() {
              var legend = $(".standard-line-chart .legend");
              var legendContainer = $("ul", legend);
              var legend_page = $(".legend-page", legend);
              var page_up = $(".tmicon-caret-up", legend_page);
              var page_down = $(".tmicon-caret-down", legend_page);
              var now_page = $(".now", legend_page);
              var total_page = $(".total", legend_page);
              var initPage = "1";
              var legend_height = legend.height();
              var totally_page;

              for (var i = 0; i < lineChartSeries.length; i++) {
                var color_idx = i % 10;
                var newItem = $(
                    "<li>" + lineChartSeries[i].name + "</li>"
                  )
                  .addClass(
                    "color-" + lineChartColors[color_idx].replace("#", "")
                  );
                legendContainer.append(newItem);
                newItem[0].series = lineChartSeries[i];
                if (lineChartSeries[i].visible == false) {
                  newItem.addClass("mute");
                }
              }
              var ul_height = legendContainer.height();

              if (ul_height > legend_height) {
                drawLegendPage();
              }

              function drawLegendPage() {
                var legend_postion = legendContainer.css("margin-top");
                legend.addClass("scrollable");
                ul_height = legendContainer.height();
                var page = parseInt(ul_height) / 30;
                totally_page = Math.ceil(page);
                total_page.text(totally_page);

                if (legend_postion == "0px") {
                  now_page.text(initPage);
                  page_up.addClass("unable");
                } else {
                  var now = parseInt(now_page.text());
                  if (now > totally_page) {
                    changePage(totally_page);
                  } else if (now < totally_page) {
                    page_down.removeClass("unable");
                  } else {
                    page_down.addClass("unable");
                  }
                }
                legend_page.addClass("show");
              }

              function changePage(pages) {
                var value = pages - 1;
                var margin_value = value * legend_height;
                if (pages < 1 || pages > totally_page) {
                  return false;
                } else {
                  now_page.text(pages); //change page
                  legendContainer.css("margin-top", "-" + margin_value + "px"); //change legend
                }
              }
              page_up.on("click", function() {
                var now = parseInt(now_page.text()) - 1;
                if (now == 1) {
                  page_up.addClass("unable");
                }
                page_down.removeClass("unable");
                changePage(now);
              });

              page_down.on("click", function() {
                var now = parseInt(now_page.text()) + 1;
                if (now == totally_page) {
                  page_down.addClass("unable");
                }
                page_up.removeClass("unable");
                changePage(now);
              });
              $(window)
                .on("resize", function() {
                  ul_height = legendContainer.height();
                  if (ul_height > legend_height) {
                    drawLegendPage();
                  } else {
                    legendContainer.css("margin-top", "");
                    page_down.removeClass("unable");
                    page_up.addClass("unable");
                    legend_page.removeClass("show");
                    legend.removeClass("scrollable");
                  }
                });
            }
          },
          style: {
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
          }
        },
        colors: lineChartColors,
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          tickInterval: 7 * 24 * 3600 * 1000,
          startOfWeek: 1,
          showFirstLabel: true,
          dateTimeLabelFormats: {
            week: "%m/%d"
          },
          labels: {
            autoRotation: 0,
            style: {
              fontSize: "12px",
              fontWeight: "normal",
              paddingBottom: "10px"
            },
            step: checkStep($(".standard-line-chart").width()),
          },
          tickWidth: 0,
          lineColor: "#e6e6e6"
        },
        yAxis: {
          title: {
            text: null
          },
          labels: {
            style: {
              fontSize: "12px",
              fontWeight: "normal"
            }
          }
        },
        legend: {
          enabled: false
        },
        series: lineChartSeries,
        plotOptions: {
          series: {
            pointStart: moment.utc(moment("2019-01-29"))
              .valueOf(),
            pointInterval: 7 * 24 * 3600 * 1000,
            marker: {
              radius: 4,
              symbol: 'circle',
              states: {
                hover: {
                  lineWidth: 3,
                  radius: 5
                }
              }
            },
            states: {
              hover: {
                halo: {
                  size: 13,
                  opacity: 0.4
                }
              }
            }
          }
        },
        tooltip: {
          backgroundColor: '#222222',
          padding: 16,
          useHTML: true,
          headerFormat: "<table><thead><tr><td>{point.x:%Y/%m/%d}</td></tr></thead>",
          pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span> {series.name} </td>' +
            "<td>{point.y}</td></tr>",
          footerFormat: "</table>"
        }
      },
      function(chart) {
        // bind events to your own custom legend
        $(document)
          .on("click", ".standard-line-chart .legend li", function(
            event
          ) {
            var target = event.target || event.srcElement;
            var target_idx = $(this)
              .index();
            var series = chart.series[target_idx];
            if (target.closest(".legend") && target.tagName === "LI" && series) {
              if (series.visible === true) {
                series.hide();
                target.className += " mute";
              } else {
                target.className = target.className.replace(" mute", "");
                series.show();
              }
            }
          });
      }
    );
  }, 900);

  setTimeout(function() {
    var chart4 = `<div class="date-range btn-group clearfix">
                    <button type="button" class="pull-right btn btn-link dropdown-toggle" data-toggle="dropdown">
                        <span class="tmicon tmicon-caret-down"></span>Last 90 days
                    </button>
                    <ul class="dropdown-menu pull-right">
                        <li><a href="#">Last 24 hours</a></li>
                        <li><a href="#">Last 7 days</a></li>
                        <li><a href="#">Last 30 days</a></li>
                        <li><a href="#">Last 90 days</a></li>
                    </ul>
                  </div>
                  <div class="table-chart chart">
                    <div id="table-chart-container" class="chart-container">
                      <table class="table-chart table table-minimalism table-hover table-longtext-truncated">
                        <thead>
                          <tr>
                            <th>Indicator</th>
                            <th>High</th>
                            <th>Medium</th>
                            <th>Low</th>
                            <th>Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><i class="ransomeware"></i>Ransomeware detections</td>
                            <td><a href="javascript:;" >12</a></td>
                            <td>0</td>
                            <td><a href="javascript:;" >2</a></td>
                            <td><a href="javascript:;" >14</a></td>
                          </tr>
                          <tr>
                            <td><i class="predictive"></i>Predictive Machine Learning detections</td>
                            <td>0</td>
                            <td>0</td>
                            <td><a href="javascript:;" >1</a></td>
                            <td><a href="javascript:;" >1</a></td>
                          </tr>
                          <tr>
                            <td><i class="email-compromise"></i>Bussiness Email Compromise detections</td>
                            <td><a href="javascript:;" >2</a></td>
                            <td><a href="javascript:;" >3</a></td>
                            <td><a href="javascript:;" >10</a></td>
                            <td><a href="javascript:;" >15</a></td>
                          </tr>
                          <tr>
                            <td><i class="targeted-malware"></i>Targeted malware</td>
                            <td><a href="javascript:;" >6</a></td>
                            <td>0</td>
                            <td><a href="javascript:;" >1</a></td>
                            <td><a href="javascript:;" >7</a></td>
                          </tr>
                          <tr>
                            <td><i class="password-protected-files"></i>Password-protected files</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td><i class="files-with-spoofed-names"></i>Files with spoofed names</td>
                            <td><a href="javascript:;" >7</a></td>
                            <td>0</td>
                            <td><a href="javascript:;" >1</a></td>
                            <td><a href="javascript:;" >8</a></td>
                          </tr>
                          <tr>
                            <td><i class="unkown-malicious-links"></i>Unkown malicious links</td>
                            <td>0</td>
                            <td><a href="javascript:;" >4</a></td>
                            <td><a href="javascript:;" >5</a></td>
                            <td><a href="javascript:;" >9</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>`;
    $("#chart-4 .loader-overlay").fadeOut();
    $("#chart-4 .widget-body").append(chart4);

    var mouseY;
    var mouseX;
    var timer;
    var tableLongtextToggle = $("<div class='longtext-toggle tooltip-inner fade tooltip-inner-light'></div>");
    var tableCell = $('.table-longtext-truncated').find('tr').children();
    
    tableCell
      .mouseenter(function () {
        var existAliasTable = $('.alias-table');
        var aliasTable = $(this).closest('table').clone().children().empty().end().addClass('alias-table');
        var cellWidth = $(this).width();
        var cellClone = $(this).clone();
        aliasTable.appendTo('body');
        $('<tr></tr>').append(cellClone).appendTo($($(this).is('td')? 'tbody' : 'thead', aliasTable));
        var cellText = $(this).text();

        if(existAliasTable) {
          existAliasTable.remove();
        }
        if(cellWidth < cellClone.width()) {
          tableLongtextToggle.html(cellText);			
          $(this).css("cursor", "default");
          timer = setTimeout(function(){
            tableLongtextToggle.appendTo('body').css({top: mouseY, left: mouseX});
            setTimeout(function(){
              tableLongtextToggle.addClass("in");
            }, 50);
          }, 500);
        }
      })
      .mouseleave(function () {
        clearTimeout(timer);
        $(this).css("cursor", "auto");
        tableLongtextToggle.removeClass("in").remove();		
      });

      $(document).on('mousemove', function(e){
          mouseY = e.pageY + 10;
          mouseX = e.pageX;
      });
  }, 1100);

  setTimeout(function() {
    var chart5 = `<div class="date-range btn-group clearfix">
                    <button type="button" class="pull-right btn btn-link dropdown-toggle" data-toggle="dropdown">
                        <span class="tmicon tmicon-caret-down"></span>Last 24 hours
                    </button>
                    <ul class="dropdown-menu pull-right">
                        <li><a href="#">Last 24 hours</a></li>
                        <li><a href="#">Last 7 days</a></li>
                        <li><a href="#">Last 30 days</a></li>
                        <li><a href="#">Last 90 days</a></li>
                    </ul>
                  </div>
                  <div class="stacked-column-chart-2 chart">
                    <div id="stacked-column-chart-container-2" class="chart-container column-chart-container-with-bottom-legend"></div>
                    <div class="legend">
                        <ul></ul>
                        <div class="legend-page"><i class="tmicon tmicon-caret-up"></i><span class="now"></span> / <span class="total"></span><i class="tmicon tmicon-caret-down"></i></div>
                    </div>
                  </div>`;
    $("#chart-5 .loader-overlay").fadeOut();
    $("#chart-5 .widget-body").append(chart5);
    var columnChart2Series = [
      {
        name: "CIFS",
        data: [0, 1.2, 1.2, 0.8, 0, 1.2, 0, 1.2, 1, 0.8, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, 
      {
        name: "DNS Request",
        data: [0, 0.4, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: "DNS Response",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0, 0.5, 0, 0, 0, 0, 0, 0]
      },
      {
        name: "FTP",
        data: [0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0.6, 0, 0, 0, 0.3, 0, 0]
      },
      {
        name: "HTTP",
        data: [7.5, 6.3, 5.5, 9.3, 14.2, 6.6, 8.5, 7.5, 9, 7.5, 7.4, 11.8, 13, 9, 5.1, 12.2, 9, 3.7, 3, 4, 2, 2.5, 1.5, 2]
      }, 
      {
        name: "IRC",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0]
      }, 
      {
        name: "POP3",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, 
      {
        name: "SMTP",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, 
      {
        name: "TCP",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0, 0, 0, 0]
      }, 
      {
        name: "UDP",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7]
      }
    ];
    var columnChart2Colors = ["#0096cc", "#4cc383", "#fd884e", "#5bd2ea", "#e56669", "#717eef", "#0abfa1", "#9cd22a", "#faca2a", "#d643c3"];

    $chart5 = Highcharts.chart(
      "stacked-column-chart-container-2", {
        chart: {
          type: "column",
          height: 330,
          marginTop: 25,
          spacingBottom: 0,
          events: {
            load: function() {
              var legend = $(".stacked-column-chart-2 .legend");
              var legendContainer = $("ul", legend);
              var legend_page = $(".legend-page", legend);
              var page_up = $(".tmicon-caret-up", legend_page);
              var page_down = $(".tmicon-caret-down", legend_page);
              var now_page = $(".now", legend_page);
              var total_page = $(".total", legend_page);
              var initPage = "1";
              var legend_height = legend.height();
              var totally_page;

              for (var i = 0; i < columnChart2Series.length; i++) {
                var color_idx = i % 10;
                var newItem = $(
                    "<li>" + columnChart2Series[i].name + "</li>"
                  )
                  .addClass(
                    "color-" + columnChart2Colors[color_idx].replace("#", "")
                  );
                legendContainer.append(newItem);
                newItem[0].series = columnChart2Series[i];
                if (columnChart2Series[i].visible == false) {
                  newItem.addClass("mute");
                }
              }
              var ul_height = legendContainer.height();

              if (ul_height > legend_height) {
                drawLegendPage();
              }

              function drawLegendPage() {
                var legend_postion = legendContainer.css("margin-top");
                legend.addClass("scrollable");
                ul_height = legendContainer.height();
                var page = parseInt(ul_height) / 30;
                totally_page = Math.ceil(page);
                total_page.text(totally_page);

                if (legend_postion == "0px") {
                  now_page.text(initPage);
                  page_up.addClass("unable");
                } else {
                  var now = parseInt(now_page.text());
                  if (now > totally_page) {
                    changePage(totally_page);
                  } else if (now < totally_page) {
                    page_down.removeClass("unable");
                  } else {
                    page_down.addClass("unable");
                  }
                }
                legend_page.addClass("show");
              }

              function changePage(pages) {
                var value = pages - 1;
                var margin_value = value * legend_height;
                if (pages < 1 || pages > totally_page) {
                  return false;
                } else {
                  now_page.text(pages); //change page
                  legendContainer.css("margin-top", "-" + margin_value + "px"); //change legend
                }
              }
              page_up.on("click", function() {
                var now = parseInt(now_page.text()) - 1;
                if (now == 1) {
                  page_up.addClass("unable");
                }
                page_down.removeClass("unable");
                changePage(now);
              });

              page_down.on("click", function() {
                var now = parseInt(now_page.text()) + 1;
                if (now == totally_page) {
                  page_down.addClass("unable");
                }
                page_up.removeClass("unable");
                changePage(now);
              });
              $(window)
                .on("resize", function() {
                  ul_height = legendContainer.height();
                  if (ul_height > legend_height) {
                    drawLegendPage();
                  } else {
                    legendContainer.css("margin-top", "");
                    page_down.removeClass("unable");
                    page_up.addClass("unable");
                    legend_page.removeClass("show");
                    legend.removeClass("scrollable");
                  }
                });
            }
          },
          style: {
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
          }
        },
        colors: columnChart2Colors,
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          tickInterval: 3600 * 1000,
          showFirstLabel: true,
          minPadding: 0,
          maxPadding: 0,
          margin: 0,
          labels: {
            autoRotation: 0,
            style: {
              fontSize: "12px",
              fontWeight: "normal",
              color: "#888888",
              paddingBottom: "10px"
            },
            step: checkStep($(".stacked-column-chart-2").width()),
            padding: 0,
            formatter: function() {
              return moment(this.value)
                .format("HH:mm");
            }
          },
          tickWidth: 0,
          lineColor: "#e6e6e6"
        },
        yAxis: {
          title: {
            text: "(GB)",
            margin: -20,
            y: -155,
            x: -18,
            rotation: 0,
            style: {
              color: '#888888'
            }
          },
          labels: {
            style: {
              fontSize: "12px",
              fontWeight: "normal",
              color: "#888888"
            }
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            stacking: "normal",
            borderColor: '#2c2c2c',
            pointStart: moment.utc(moment("2019-04-21 15:00")).valueOf(),
            pointInterval: 3600 * 1000,
            states: {
              hover: {
                brightness: 0.12
              }
            }
          }
        },
        tooltip: {
          shared: true,
          backgroundColor: '#222222',
          borderColor: '#888888',
          padding: 16,
          useHTML: true,
          formatter: function() {
            return (
              this.points.reduce(function(s, point) {
                  return (
                    s +
                    '<tr><td><span style="color:' +
                    point.color +
                    '">\u25CF</span> ' +
                    point.series.name +
                    " </td><td>" +
                    point.y +
                    "</td></tr>"
                  );
                }, "<table><thead><tr><td>" +
                moment(this.x)
                .format("YYYY-MM-DD HH:mm") +
                "</td></tr></thead><tbody>") + "</table>"
            );
          }
        },
        series: columnChart2Series
      },
      function(chart) {
        // bind events to your own custom legend
        $(document)
          .on("click", ".stacked-column-chart-2 .legend li", function(
            event
          ) {
            var target = event.target || event.srcElement;
            var target_idx = $(this)
              .index();
            var series = chart.series[target_idx];
            if (target.closest(".legend") && target.tagName === "LI" && series) {
              if (series.visible === true) {
                series.hide();
                target.className += " mute";
              } else {
                target.className = target.className.replace(" mute", "");
                series.show();
              }
            }
          });
      }
    );
  }, 700);

  $(window).on('resize', updateChart);
});