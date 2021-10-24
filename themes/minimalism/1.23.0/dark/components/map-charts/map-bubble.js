"use strict";

portal.on('COMPONENT_SEGMENT_LOADED.79814b11-6c66-4d09-a128-f357e16ee208', function (e) {
    $(function () {
        var data = [{
            "code3": "USA",
            "z": 126081,
            "code": "US"
        }, {
            "code3": "MEX",
            "z": 31540,
            "code": "MX"
        }, {
            "code3": "CHN",
            "z": 58128,
            "code": "CN"
        }, {
            "code3": "JPN",
            "z": 12995,
            "code": "JP"
        }, {
            "code3": "AUS",
            "z": 47211,
            "code": "AU"
        }, {
            "code3": "NGA",
            "z": 20990,
            "code": "NG"
        }, {
            "code3": "CIV",
            "z": 6696,
            "code": "CI"
        }, {
            "code3": "GHA",
            "z": 11207,
            "code": "GH"
        }, {
            "code3": "TGO",
            "z": 7606,
            "code": "TG"
        }, {
            "code3": "BFA",
            "z": 13646,
            "code": "BF"
        }];
        if (!window.HighMap) {
            window.HighMap = Highcharts;
            delete window.Highcharts;
        }
        var mapBubble = HighMap.mapChart('map-bubble-chart-container', {
            chart: {
                borderWidth: 0,
                map: 'custom/world',
                margin: 0
            },

            exporting: {
                enabled: false
            },

            title: {
                text: undefined
            },

            subtitle: {
                text: ''
            },

            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            mapNavigation: {
                enabled: false,
                enableMouseWheelZoom: true
            },

            series: [{
                name: 'Countries',
                color: '#E0E0E0',
                nullColor: '#4c4c4c',
                borderColor: '#2c2c2c',
                enableMouseTracking: false
            }, {
                type: 'mapbubble',
                marker: {
                    fillColor: '#d11e23',
                    fillOpacity: 0.45,
                    lineColor: '#d11e23',
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    }
                },
                joinBy: ['iso-a3', 'code3'],
                data: data,
                minSize: 4,
                maxSize: '12%'
            }],
            tooltip: {
                backgroundColor: "#222222",
                borderColor: '#d11e23',
                padding: 16,
                useHTML: true,
                formatter: function formatter() {
                    return "<table>\n                            <thead>\n                                <tr>\n                                    <td>" + this.point.name + "</td>\n                                </tr>\n                            </thead>\n                            <tbody>\n                            <tr>\n                                <td><span style=\"color:#DB3444\">\u25CF</span> Total Detections</td>\n                                <td>" + this.point.z.toLocaleString() + "</td>\n                            </tr>\n                            </tbody>\n                        </table>";
                }
            }
        });
        $('.map-bubble-chart-example .btn-zoom-in').on('click', function () {
            mapBubble.mapZoom(0.5);
        });
        $('.map-bubble-chart-example .btn-zoom-out').on('click', function () {
            mapBubble.mapZoom(2);
        });
    });
});
