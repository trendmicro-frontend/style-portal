'use strict';

portal.on('COMPONENT_SEGMENT_LOADED.2ad1fad3-fa9d-4030-993d-2b1bf31b28df', function (e) {
    $(function () {
        var series = [{
            name: 'Ransomware',
            data: [33, 66, 230, 130, 95]
        }, {
            name: 'Anti-spyware',
            data: [66, 133, 350, 195, 120]
        }, {
            name: 'Web Reputation',
            data: [180, 220, 510, 330, 230]
        }, {
            name: 'Virus/Malware',
            data: [40, 70, 450, 250, 110]
        }];
        var colors = ['#0096cc', '#4cc383', '#fd884e', '#5bd2ea', '#e56669', '#717eef', '#0abfa1', '#9cd22a', '#faca2a', '#d643c3'];

        if (!window.HighChart) {
            window.HighChart = Highcharts;
            delete window.Highcharts;
        }

        HighChart.chart('grouped-column-chart-container', {
            chart: {
                type: 'column',
                spacingBottom: 0,
                events: {
                    load: function load() {
                        var legend = $(".grouped-column-chart .legend");
                        var legendContainer = $('ul', legend);
                        for (var i = 0; i < series.length; i++) {
                            var color_idx = i % 10;
                            var newItem = $('<li>' + series[i].name + '</li>').addClass('color-' + colors[color_idx].replace('#', ''));
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
                categories: ['2013', '2014', '2015', '2016', '2017'],
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 'normal',
                        paddingBottom: '10px',
                        color: '#888888'
                    }
                },
                tickWidth: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Scanned Traffic (GB)',
                    style: {
                        color: '#bbbbbb'
                    }
                },
                labels: {
                    style: {
                        fontSize: '12px',
                        fontWeight: 'normal',
                        color: '#888888'
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: series,
            plotOptions: {
                series: {
                    pointWidth: 8,
                    borderWidth: 0,
                    groupPadding: 0.25,
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
                headerFormat: '<table><thead><tr><td>{point.x}</td></tr></thead>',
                pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span> {series.name} </td>' + '<td>{point.y}</td></tr>',
                footerFormat: '</table>'
            }
        }, function (chart) {
            // bind events to your own custom legend
            $(document).on('click', '.grouped-column-chart .legend li', function (event) {
                var target = event.target || event.srcElement;
                var target_idx = $(this).index();
                var series = chart.series[target_idx];
                if (target.closest('.legend') && target.tagName === 'LI' && series) {
                    if (series.visible === true) {
                        series.hide();
                        target.className += ' mute';
                    } else {
                        target.className = target.className.replace(' mute', '');
                        series.show();
                    }
                }
            });
        });
    });
});
