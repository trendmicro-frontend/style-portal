"use strict";

portal.on('COMPONENT_SEGMENT_LOADED.0f157d06-a3b3-4c21-84f7-37eb7557bd55', function (e) {
  $(function () {
    var series = [{
      name: "All Traffic",
      data: [28, 26, 22, 40, 48, 57, 37, 42, 35, 36, 30, 36, 32, 35, 34, 29, 31, 40, 55, 50, 44, 28, 28, 15]
    }, {
      name: "Malicious Traffic",
      data: [4, 6, 6, 8, 7, 8, 10, 8, 9, 8, 8, 6, 5, 6, 8, 11, 15, 16, 13, 11, 12, 11, 10, 4]
    }];
    var colors = ["#0096cc", "#4cc383"];

    if (!window.HighChart) {
      window.HighChart = Highcharts;
      delete window.Highcharts;
    }

    HighChart.chart("area-chart-without-markers-container", {
      chart: {
        type: "area",
        marginTop: 25,
        spacingBottom: 0,
        events: {
          load: function load() {
            var legend = $(".standard-area-chart-without-markers .legend");
            var legendContainer = $("ul", legend);
            for (var i = 0; i < series.length; i++) {
              var color_idx = i % 10;
              var newItem = $("<li>" + series[i].name + "</li>").addClass("color-" + colors[color_idx].replace("#", ""));
              legendContainer.append(newItem);
              newItem[0].series = series[i];
              if (series[i].visible == false) {
                newItem.addClass("mute");
              }
            }
          }
        },
        style: {
          fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
        }
      },
      colors: colors,
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
          // step: checkStep($(".standard-area-chart").width()),
          formatter: function formatter() {
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
          y: -170,
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
      series: series,
      plotOptions: {
        area: {
          stacking: "normal"
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
        formatter: function formatter() {
          return "<table>\n                    <thead>\n                      <tr>\n                        <td>" + moment(this.x).format("YYYY-MM-DD HH:mm") + "</td>\n                      </tr>\n                    </thead>\n                    <tbody>\n                      <tr>\n                        <td><span style=\"color:" + this.color + "\">\u25CF</span> " + this.series.name + "</td>\n                        <td>" + this.y + "</td>\n                      </tr>\n                    </tbody>\n                  </table>";
        }
      }
    }, function (chart) {
      // bind events to your own custom legend
      $(document).on("click", ".standard-area-chart-without-markers .legend li", function (event) {
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
    });
  });
});
