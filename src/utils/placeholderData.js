export const forecastPlaceHolder = {
    "current": {
        "station": "Barre / Montpelier, Knapp State Airport",
        "data": {
            "@context": [
                "https://geojson.org/geojson-ld/geojson-context.jsonld",
                {
                    "@version": "1.1",
                    "wx": "https://api.weather.gov/ontology#",
                    "s": "https://schema.org/",
                    "geo": "http://www.opengis.net/ont/geosparql#",
                    "unit": "http://codes.wmo.int/common/unit/",
                    "@vocab": "https://api.weather.gov/ontology#",
                    "geometry": {
                        "@id": "s:GeoCoordinates",
                        "@type": "geo:wktLiteral"
                    },
                    "city": "s:addressLocality",
                    "state": "s:addressRegion",
                    "distance": {
                        "@id": "s:Distance",
                        "@type": "s:QuantitativeValue"
                    },
                    "bearing": {
                        "@type": "s:QuantitativeValue"
                    },
                    "value": {
                        "@id": "s:value"
                    },
                    "unitCode": {
                        "@id": "s:unitCode",
                        "@type": "@id"
                    },
                    "forecastOffice": {
                        "@type": "@id"
                    },
                    "forecastGridData": {
                        "@type": "@id"
                    },
                    "publicZone": {
                        "@type": "@id"
                    },
                    "county": {
                        "@type": "@id"
                    }
                }
            ],
            "id": "https://api.weather.gov/stations/KMPV/observations/2024-06-19T17:51:00+00:00",
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -72.56,
                    44.2
                ]
            },
            "properties": {
                "@id": "https://api.weather.gov/stations/KMPV/observations/2024-06-19T17:51:00+00:00",
                "@type": "wx:ObservationStation",
                "elevation": {
                    "unitCode": "wmoUnit:m",
                    "value": 355
                },
                "station": "https://api.weather.gov/stations/KMPV",
                "timestamp": "2024-06-19T17:51:00+00:00",
                "rawMessage": "KMPV 191751Z AUTO VRB05KT 10SM CLR 33/20 A3030 RMK AO2 LTG DSNT N AND NE SLP254 T03330200 10333 20244 57008",
                "textDescription": "Clear",
                "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                "presentWeather": [],
                "temperature": {
                    "unitCode": "wmoUnit:degC",
                    "value": 33.3,
                    "qualityControl": "V"
                },
                "dewpoint": {
                    "unitCode": "wmoUnit:degC",
                    "value": 20,
                    "qualityControl": "V"
                },
                "windDirection": {
                    "unitCode": "wmoUnit:degree_(angle)",
                    "value": null,
                    "qualityControl": "Z"
                },
                "windSpeed": {
                    "unitCode": "wmoUnit:km_h-1",
                    "value": 9.36,
                    "qualityControl": "V"
                },
                "windGust": {
                    "unitCode": "wmoUnit:km_h-1",
                    "value": null,
                    "qualityControl": "Z"
                },
                "barometricPressure": {
                    "unitCode": "wmoUnit:Pa",
                    "value": null,
                    "qualityControl": "Z"
                },
                "seaLevelPressure": {
                    "unitCode": "wmoUnit:Pa",
                    "value": 102540,
                    "qualityControl": "V"
                },
                "visibility": {
                    "unitCode": "wmoUnit:m",
                    "value": 16090,
                    "qualityControl": "C"
                },
                "maxTemperatureLast24Hours": {
                    "unitCode": "wmoUnit:degC",
                    "value": null
                },
                "minTemperatureLast24Hours": {
                    "unitCode": "wmoUnit:degC",
                    "value": null
                },
                "precipitationLastHour": {
                    "unitCode": "wmoUnit:mm",
                    "value": null,
                    "qualityControl": "Z"
                },
                "precipitationLast3Hours": {
                    "unitCode": "wmoUnit:mm",
                    "value": null,
                    "qualityControl": "Z"
                },
                "precipitationLast6Hours": {
                    "unitCode": "wmoUnit:mm",
                    "value": null,
                    "qualityControl": "Z"
                },
                "relativeHumidity": {
                    "unitCode": "wmoUnit:percent",
                    "value": 45.667749904806,
                    "qualityControl": "V"
                },
                "windChill": {
                    "unitCode": "wmoUnit:degC",
                    "value": null,
                    "qualityControl": "V"
                },
                "heatIndex": {
                    "unitCode": "wmoUnit:degC",
                    "value": 35.66557800073444,
                    "qualityControl": "V"
                },
                "cloudLayers": [
                    {
                        "base": {
                            "unitCode": "wmoUnit:m",
                            "value": null
                        },
                        "amount": "CLR"
                    }
                ]
            }
        }
    },
    "forecast": {
        "@context": [
            "https://geojson.org/geojson-ld/geojson-context.jsonld",
            {
                "@version": "1.1",
                "wx": "https://api.weather.gov/ontology#",
                "geo": "http://www.opengis.net/ont/geosparql#",
                "unit": "http://codes.wmo.int/common/unit/",
                "@vocab": "https://api.weather.gov/ontology#"
            }
        ],
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -72.8670439,
                        44.0024908
                    ],
                    [
                        -72.8719061,
                        43.9812519
                    ],
                    [
                        -72.8423874,
                        43.977751399999995
                    ],
                    [
                        -72.8375189,
                        43.99898999999999
                    ],
                    [
                        -72.8670439,
                        44.0024908
                    ]
                ]
            ]
        },
        "properties": {
            "updated": "2024-06-19T16:47:19+00:00",
            "units": "us",
            "forecastGenerator": "BaselineForecastGenerator",
            "generatedAt": "2024-06-19T18:56:09+00:00",
            "updateTime": "2024-06-19T16:47:19+00:00",
            "validTimes": "2024-06-19T10:00:00+00:00/P7DT15H",
            "elevation": {
                "unitCode": "wmoUnit:m",
                "value": 348.996
            },
            "periods": [
                {
                    "number": 1,
                    "name": "Juneteenth",
                    "startTime": "2024-06-19T14:00:00-04:00",
                    "endTime": "2024-06-19T18:00:00-04:00",
                    "isDaytime": true,
                    "temperature": 91,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 30
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 23.88888888888889
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 70
                    },
                    "windSpeed": "8 mph",
                    "windDirection": "SW",
                    "icon": "https://api.weather.gov/icons/land/day/tsra_hi,30?size=medium",
                    "shortForecast": "Chance Showers And Thunderstorms",
                    "detailedForecast": "A chance of showers and thunderstorms. Mostly sunny, with a high near 91. Heat index values as high as 99. Southwest wind around 8 mph. Chance of precipitation is 30%. New rainfall amounts less than a tenth of an inch possible."
                },
                {
                    "number": 2,
                    "name": "Tonight",
                    "startTime": "2024-06-19T18:00:00-04:00",
                    "endTime": "2024-06-20T06:00:00-04:00",
                    "isDaytime": false,
                    "temperature": 70,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 20
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 23.333333333333332
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 87
                    },
                    "windSpeed": "7 mph",
                    "windDirection": "SW",
                    "icon": "https://api.weather.gov/icons/land/night/tsra_hi,20/sct?size=medium",
                    "shortForecast": "Slight Chance Showers And Thunderstorms then Partly Cloudy",
                    "detailedForecast": "A slight chance of showers and thunderstorms before 8pm. Partly cloudy, with a low around 70. Heat index values as high as 91. Southwest wind around 7 mph. Chance of precipitation is 20%. New rainfall amounts less than a tenth of an inch possible."
                },
                {
                    "number": 3,
                    "name": "Thursday",
                    "startTime": "2024-06-20T06:00:00-04:00",
                    "endTime": "2024-06-20T18:00:00-04:00",
                    "isDaytime": true,
                    "temperature": 90,
                    "temperatureUnit": "F",
                    "temperatureTrend": "falling",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 70
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 23.88888888888889
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 87
                    },
                    "windSpeed": "3 to 7 mph",
                    "windDirection": "W",
                    "icon": "https://api.weather.gov/icons/land/day/tsra_sct,30/tsra_sct,70?size=medium",
                    "shortForecast": "Chance Showers And Thunderstorms",
                    "detailedForecast": "A chance of showers and thunderstorms between 8am and 2pm, then showers and thunderstorms likely. Partly sunny. High near 90, with temperatures falling to around 82 in the afternoon. Heat index values as high as 97. West wind 3 to 7 mph. Chance of precipitation is 70%. New rainfall amounts between a quarter and half of an inch possible."
                },
                {
                    "number": 4,
                    "name": "Thursday Night",
                    "startTime": "2024-06-20T18:00:00-04:00",
                    "endTime": "2024-06-21T06:00:00-04:00",
                    "isDaytime": false,
                    "temperature": 64,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 70
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 22.77777777777778
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 93
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "NW",
                    "icon": "https://api.weather.gov/icons/land/night/tsra_sct,70/tsra_sct,30?size=medium",
                    "shortForecast": "Showers And Thunderstorms Likely then Chance Showers And Thunderstorms",
                    "detailedForecast": "Showers and thunderstorms likely before 8pm, then a chance of showers and thunderstorms between 8pm and 5am, then a chance of showers and thunderstorms. Mostly cloudy, with a low around 64. Northwest wind around 5 mph. Chance of precipitation is 70%. New rainfall amounts between a half and three quarters of an inch possible."
                },
                {
                    "number": 5,
                    "name": "Friday",
                    "startTime": "2024-06-21T06:00:00-04:00",
                    "endTime": "2024-06-21T18:00:00-04:00",
                    "isDaytime": true,
                    "temperature": 76,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 40
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 18.88888888888889
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 93
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "N",
                    "icon": "https://api.weather.gov/icons/land/day/tsra_sct,40?size=medium",
                    "shortForecast": "Chance Showers And Thunderstorms",
                    "detailedForecast": "A chance of showers and thunderstorms. Partly sunny, with a high near 76. North wind around 5 mph. Chance of precipitation is 40%. New rainfall amounts less than a tenth of an inch possible."
                },
                {
                    "number": 6,
                    "name": "Friday Night",
                    "startTime": "2024-06-21T18:00:00-04:00",
                    "endTime": "2024-06-22T06:00:00-04:00",
                    "isDaytime": false,
                    "temperature": 59,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 30
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 17.22222222222222
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 87
                    },
                    "windSpeed": "3 mph",
                    "windDirection": "NE",
                    "icon": "https://api.weather.gov/icons/land/night/rain_showers,30?size=medium",
                    "shortForecast": "Chance Rain Showers",
                    "detailedForecast": "A chance of rain showers. Mostly cloudy, with a low around 59. Northeast wind around 3 mph. Chance of precipitation is 30%. New rainfall amounts less than a tenth of an inch possible."
                },
                {
                    "number": 7,
                    "name": "Saturday",
                    "startTime": "2024-06-22T06:00:00-04:00",
                    "endTime": "2024-06-22T18:00:00-04:00",
                    "isDaytime": true,
                    "temperature": 73,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 60
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 18.333333333333332
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 90
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "SE",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers,30/tsra,60?size=medium",
                    "shortForecast": "Showers And Thunderstorms Likely",
                    "detailedForecast": "A chance of rain showers before 2pm, then showers and thunderstorms likely. Mostly cloudy, with a high near 73. Southeast wind around 5 mph. Chance of precipitation is 60%."
                },
                {
                    "number": 8,
                    "name": "Saturday Night",
                    "startTime": "2024-06-22T18:00:00-04:00",
                    "endTime": "2024-06-23T06:00:00-04:00",
                    "isDaytime": false,
                    "temperature": 61,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 70
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 17.77777777777778
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 93
                    },
                    "windSpeed": "6 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/tsra,60/tsra,70?size=medium",
                    "shortForecast": "Showers And Thunderstorms Likely",
                    "detailedForecast": "Showers and thunderstorms likely. Mostly cloudy, with a low around 61. South wind around 6 mph. Chance of precipitation is 70%."
                },
                {
                    "number": 9,
                    "name": "Sunday",
                    "startTime": "2024-06-23T06:00:00-04:00",
                    "endTime": "2024-06-23T18:00:00-04:00",
                    "isDaytime": true,
                    "temperature": 78,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 70
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 21.666666666666668
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 97
                    },
                    "windSpeed": "9 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers,70/tsra,70?size=medium",
                    "shortForecast": "Rain Showers Likely",
                    "detailedForecast": "Rain showers likely before 2pm, then showers and thunderstorms likely. Mostly cloudy, with a high near 78. South wind around 9 mph. Chance of precipitation is 70%."
                },
                {
                    "number": 10,
                    "name": "Sunday Night",
                    "startTime": "2024-06-23T18:00:00-04:00",
                    "endTime": "2024-06-24T06:00:00-04:00",
                    "isDaytime": false,
                    "temperature": 63,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 70
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 21.11111111111111
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 90
                    },
                    "windSpeed": "13 mph",
                    "windDirection": "SW",
                    "icon": "https://api.weather.gov/icons/land/night/tsra_sct,70?size=medium",
                    "shortForecast": "Showers And Thunderstorms Likely",
                    "detailedForecast": "Showers and thunderstorms likely. Mostly cloudy, with a low around 63. Southwest wind around 13 mph. Chance of precipitation is 70%."
                },
                {
                    "number": 11,
                    "name": "Monday",
                    "startTime": "2024-06-24T06:00:00-04:00",
                    "endTime": "2024-06-24T18:00:00-04:00",
                    "isDaytime": true,
                    "temperature": 74,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 60
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 17.77777777777778
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 90
                    },
                    "windSpeed": "7 to 13 mph",
                    "windDirection": "W",
                    "icon": "https://api.weather.gov/icons/land/day/rain_showers,60/tsra_hi,60?size=medium",
                    "shortForecast": "Rain Showers Likely",
                    "detailedForecast": "Rain showers likely before 2pm, then a chance of showers and thunderstorms. Partly sunny, with a high near 74. West wind 7 to 13 mph. Chance of precipitation is 60%."
                },
                {
                    "number": 12,
                    "name": "Monday Night",
                    "startTime": "2024-06-24T18:00:00-04:00",
                    "endTime": "2024-06-25T06:00:00-04:00",
                    "isDaytime": false,
                    "temperature": 57,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 50
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 16.11111111111111
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 87
                    },
                    "windSpeed": "7 mph",
                    "windDirection": "NW",
                    "icon": "https://api.weather.gov/icons/land/night/tsra_hi,50/sct?size=medium",
                    "shortForecast": "Chance Showers And Thunderstorms then Partly Cloudy",
                    "detailedForecast": "A chance of showers and thunderstorms before 8pm. Partly cloudy, with a low around 57. Northwest wind around 7 mph. Chance of precipitation is 50%."
                },
                {
                    "number": 13,
                    "name": "Tuesday",
                    "startTime": "2024-06-25T06:00:00-04:00",
                    "endTime": "2024-06-25T18:00:00-04:00",
                    "isDaytime": true,
                    "temperature": 79,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 15.555555555555555
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 87
                    },
                    "windSpeed": "3 to 7 mph",
                    "windDirection": "NW",
                    "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny, with a high near 79. Northwest wind 3 to 7 mph."
                },
                {
                    "number": 14,
                    "name": "Tuesday Night",
                    "startTime": "2024-06-25T18:00:00-04:00",
                    "endTime": "2024-06-26T06:00:00-04:00",
                    "isDaytime": false,
                    "temperature": 61,
                    "temperatureUnit": "F",
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": null
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": 15.555555555555555
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 81
                    },
                    "windSpeed": "1 to 5 mph",
                    "windDirection": "SW",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": "Partly cloudy, with a low around 61. Southwest wind 1 to 5 mph."
                }
            ]
        }
    }
}