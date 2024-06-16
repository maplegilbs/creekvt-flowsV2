//Components
import Loader from "./loader"
//Hooks
import { useState, useEffect } from "react"
//Styles
import styles from "./forecastsQPF.module.scss"
import { formatDateTime } from "../utils/formatDateTime"

const forecastPlaceHolder = {
    "lat": 43.9951,
    "lon": -72.8708,
    "timezone": "America/New_York",
    "timezone_offset": -14400,
    "current": {
        "dt": 1718543018,
        "sunrise": 1718528888,
        "sunset": 1718584592,
        "temp": 56.35,
        "feels_like": 54.93,
        "pressure": 1025,
        "humidity": 69,
        "dew_point": 46.33,
        "uvi": 3.2,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 2.37,
        "wind_deg": 280,
        "wind_gust": 2.24,
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ]
    },
    "minutely": [
        {
            "dt": 1718543040,
            "precipitation": 0
        },
        {
            "dt": 1718543100,
            "precipitation": 0
        },
        {
            "dt": 1718543160,
            "precipitation": 0
        },
        {
            "dt": 1718543220,
            "precipitation": 0
        },
        {
            "dt": 1718543280,
            "precipitation": 0
        },
        {
            "dt": 1718543340,
            "precipitation": 0
        },
        {
            "dt": 1718543400,
            "precipitation": 0
        },
        {
            "dt": 1718543460,
            "precipitation": 0
        },
        {
            "dt": 1718543520,
            "precipitation": 0
        },
        {
            "dt": 1718543580,
            "precipitation": 0
        },
        {
            "dt": 1718543640,
            "precipitation": 0
        },
        {
            "dt": 1718543700,
            "precipitation": 0
        },
        {
            "dt": 1718543760,
            "precipitation": 0
        },
        {
            "dt": 1718543820,
            "precipitation": 0
        },
        {
            "dt": 1718543880,
            "precipitation": 0
        },
        {
            "dt": 1718543940,
            "precipitation": 0
        },
        {
            "dt": 1718544000,
            "precipitation": 0
        },
        {
            "dt": 1718544060,
            "precipitation": 0
        },
        {
            "dt": 1718544120,
            "precipitation": 0
        },
        {
            "dt": 1718544180,
            "precipitation": 0
        },
        {
            "dt": 1718544240,
            "precipitation": 0
        },
        {
            "dt": 1718544300,
            "precipitation": 0
        },
        {
            "dt": 1718544360,
            "precipitation": 0
        },
        {
            "dt": 1718544420,
            "precipitation": 0
        },
        {
            "dt": 1718544480,
            "precipitation": 0
        },
        {
            "dt": 1718544540,
            "precipitation": 0
        },
        {
            "dt": 1718544600,
            "precipitation": 0
        },
        {
            "dt": 1718544660,
            "precipitation": 0
        },
        {
            "dt": 1718544720,
            "precipitation": 0
        },
        {
            "dt": 1718544780,
            "precipitation": 0
        },
        {
            "dt": 1718544840,
            "precipitation": 0
        },
        {
            "dt": 1718544900,
            "precipitation": 0
        },
        {
            "dt": 1718544960,
            "precipitation": 0
        },
        {
            "dt": 1718545020,
            "precipitation": 0
        },
        {
            "dt": 1718545080,
            "precipitation": 0
        },
        {
            "dt": 1718545140,
            "precipitation": 0
        },
        {
            "dt": 1718545200,
            "precipitation": 0
        },
        {
            "dt": 1718545260,
            "precipitation": 0
        },
        {
            "dt": 1718545320,
            "precipitation": 0
        },
        {
            "dt": 1718545380,
            "precipitation": 0
        },
        {
            "dt": 1718545440,
            "precipitation": 0
        },
        {
            "dt": 1718545500,
            "precipitation": 0
        },
        {
            "dt": 1718545560,
            "precipitation": 0
        },
        {
            "dt": 1718545620,
            "precipitation": 0
        },
        {
            "dt": 1718545680,
            "precipitation": 0
        },
        {
            "dt": 1718545740,
            "precipitation": 0
        },
        {
            "dt": 1718545800,
            "precipitation": 0
        },
        {
            "dt": 1718545860,
            "precipitation": 0
        },
        {
            "dt": 1718545920,
            "precipitation": 0
        },
        {
            "dt": 1718545980,
            "precipitation": 0
        },
        {
            "dt": 1718546040,
            "precipitation": 0
        },
        {
            "dt": 1718546100,
            "precipitation": 0
        },
        {
            "dt": 1718546160,
            "precipitation": 0
        },
        {
            "dt": 1718546220,
            "precipitation": 0
        },
        {
            "dt": 1718546280,
            "precipitation": 0
        },
        {
            "dt": 1718546340,
            "precipitation": 0
        },
        {
            "dt": 1718546400,
            "precipitation": 0
        },
        {
            "dt": 1718546460,
            "precipitation": 0
        },
        {
            "dt": 1718546520,
            "precipitation": 0
        },
        {
            "dt": 1718546580,
            "precipitation": 0
        }
    ],
    "hourly": [
        {
            "dt": 1718542800,
            "temp": 56.35,
            "feels_like": 54.93,
            "pressure": 1025,
            "humidity": 69,
            "dew_point": 46.33,
            "uvi": 3.2,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 2.37,
            "wind_deg": 280,
            "wind_gust": 2.24,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718546400,
            "temp": 57.72,
            "feels_like": 56.16,
            "pressure": 1025,
            "humidity": 63,
            "dew_point": 45.23,
            "uvi": 4.85,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 2.42,
            "wind_deg": 276,
            "wind_gust": 2.19,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718550000,
            "temp": 60.31,
            "feels_like": 58.62,
            "pressure": 1025,
            "humidity": 55,
            "dew_point": 44.1,
            "uvi": 6.13,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 2.04,
            "wind_deg": 301,
            "wind_gust": 2.77,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718553600,
            "temp": 63.45,
            "feels_like": 61.7,
            "pressure": 1024,
            "humidity": 47,
            "dew_point": 42.89,
            "uvi": 7.88,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 1.9,
            "wind_deg": 287,
            "wind_gust": 2.62,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718557200,
            "temp": 67.64,
            "feels_like": 65.89,
            "pressure": 1023,
            "humidity": 38,
            "dew_point": 41.16,
            "uvi": 8.45,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 2.3,
            "wind_deg": 248,
            "wind_gust": 2.71,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718560800,
            "temp": 71.1,
            "feels_like": 69.31,
            "pressure": 1022,
            "humidity": 30,
            "dew_point": 37.65,
            "uvi": 6.69,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 3.8,
            "wind_deg": 250,
            "wind_gust": 4.03,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718564400,
            "temp": 70.93,
            "feels_like": 69.1,
            "pressure": 1022,
            "humidity": 29,
            "dew_point": 37.02,
            "uvi": 5.47,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 5.08,
            "wind_deg": 253,
            "wind_gust": 4.29,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718568000,
            "temp": 70.16,
            "feels_like": 68.23,
            "pressure": 1022,
            "humidity": 29,
            "dew_point": 36.61,
            "uvi": 3.8,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 5.32,
            "wind_deg": 255,
            "wind_gust": 3.78,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718571600,
            "temp": 68.76,
            "feels_like": 66.79,
            "pressure": 1022,
            "humidity": 31,
            "dew_point": 37.06,
            "uvi": 2.48,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 5.08,
            "wind_deg": 243,
            "wind_gust": 3.31,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718575200,
            "temp": 66.65,
            "feels_like": 65.08,
            "pressure": 1021,
            "humidity": 44,
            "dew_point": 43.92,
            "uvi": 1.22,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 3.71,
            "wind_deg": 228,
            "wind_gust": 5.08,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718578800,
            "temp": 63.3,
            "feels_like": 62.06,
            "pressure": 1021,
            "humidity": 58,
            "dew_point": 48.22,
            "uvi": 0.44,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 3.06,
            "wind_deg": 190,
            "wind_gust": 3.69,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718582400,
            "temp": 57.85,
            "feels_like": 56.34,
            "pressure": 1022,
            "humidity": 64,
            "dew_point": 45.3,
            "uvi": 0,
            "clouds": 88,
            "visibility": 10000,
            "wind_speed": 2.82,
            "wind_deg": 191,
            "wind_gust": 3.02,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718586000,
            "temp": 55.76,
            "feels_like": 53.71,
            "pressure": 1022,
            "humidity": 57,
            "dew_point": 40.35,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 2.84,
            "wind_deg": 165,
            "wind_gust": 3.36,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718589600,
            "temp": 55.06,
            "feels_like": 52.81,
            "pressure": 1022,
            "humidity": 54,
            "dew_point": 38.23,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 3.44,
            "wind_deg": 167,
            "wind_gust": 3.67,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718593200,
            "temp": 56.12,
            "feels_like": 53.74,
            "pressure": 1022,
            "humidity": 49,
            "dew_point": 36.82,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 3.4,
            "wind_deg": 162,
            "wind_gust": 4.54,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718596800,
            "temp": 57.04,
            "feels_like": 54.64,
            "pressure": 1021,
            "humidity": 47,
            "dew_point": 36.46,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 3.4,
            "wind_deg": 172,
            "wind_gust": 4.36,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718600400,
            "temp": 58.15,
            "feels_like": 55.83,
            "pressure": 1021,
            "humidity": 46,
            "dew_point": 37.08,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 3.47,
            "wind_deg": 177,
            "wind_gust": 3.91,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718604000,
            "temp": 59.16,
            "feels_like": 56.95,
            "pressure": 1021,
            "humidity": 46,
            "dew_point": 38.28,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 4.27,
            "wind_deg": 179,
            "wind_gust": 7.47,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718607600,
            "temp": 58.01,
            "feels_like": 55.96,
            "pressure": 1021,
            "humidity": 52,
            "dew_point": 40.1,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 4.21,
            "wind_deg": 193,
            "wind_gust": 7.14,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718611200,
            "temp": 57.42,
            "feels_like": 55.49,
            "pressure": 1021,
            "humidity": 56,
            "dew_point": 41.59,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 4.36,
            "wind_deg": 179,
            "wind_gust": 8.46,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718614800,
            "temp": 55.56,
            "feels_like": 53.73,
            "pressure": 1021,
            "humidity": 62,
            "dew_point": 42.37,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 4.52,
            "wind_deg": 178,
            "wind_gust": 9.57,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718618400,
            "temp": 56.07,
            "feels_like": 54.52,
            "pressure": 1021,
            "humidity": 67,
            "dew_point": 44.6,
            "uvi": 0.09,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 4.43,
            "wind_deg": 181,
            "wind_gust": 9.95,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718622000,
            "temp": 58.23,
            "feels_like": 56.95,
            "pressure": 1021,
            "humidity": 68,
            "dew_point": 47.28,
            "uvi": 0.46,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 5.1,
            "wind_deg": 178,
            "wind_gust": 12.59,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718625600,
            "temp": 61.97,
            "feels_like": 60.87,
            "pressure": 1021,
            "humidity": 64,
            "dew_point": 48.99,
            "uvi": 0.68,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 5.93,
            "wind_deg": 186,
            "wind_gust": 13.65,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718629200,
            "temp": 64.49,
            "feels_like": 63.64,
            "pressure": 1020,
            "humidity": 64,
            "dew_point": 51.66,
            "uvi": 2.24,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 6.4,
            "wind_deg": 200,
            "wind_gust": 15.82,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718632800,
            "temp": 68.25,
            "feels_like": 67.69,
            "pressure": 1020,
            "humidity": 62,
            "dew_point": 54.27,
            "uvi": 4.75,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 7.11,
            "wind_deg": 207,
            "wind_gust": 18.37,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718636400,
            "temp": 65.59,
            "feels_like": 65.28,
            "pressure": 1020,
            "humidity": 73,
            "dew_point": 56.5,
            "uvi": 7.3,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 4.85,
            "wind_deg": 218,
            "wind_gust": 15.43,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718640000,
            "temp": 68.02,
            "feels_like": 67.77,
            "pressure": 1020,
            "humidity": 69,
            "dew_point": 56.97,
            "uvi": 8.92,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 6.15,
            "wind_deg": 220,
            "wind_gust": 15.84,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718643600,
            "temp": 74.73,
            "feels_like": 74.62,
            "pressure": 1019,
            "humidity": 58,
            "dew_point": 58.77,
            "uvi": 9.54,
            "clouds": 92,
            "visibility": 10000,
            "wind_speed": 8.39,
            "wind_deg": 230,
            "wind_gust": 13.04,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718647200,
            "temp": 76.5,
            "feels_like": 76.48,
            "pressure": 1018,
            "humidity": 56,
            "dew_point": 59.13,
            "uvi": 8.85,
            "clouds": 80,
            "visibility": 10000,
            "wind_speed": 8.79,
            "wind_deg": 233,
            "wind_gust": 12.8,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718650800,
            "temp": 79,
            "feels_like": 79,
            "pressure": 1018,
            "humidity": 51,
            "dew_point": 59.27,
            "uvi": 7.16,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 8.68,
            "wind_deg": 226,
            "wind_gust": 13.42,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718654400,
            "temp": 80.76,
            "feels_like": 81.39,
            "pressure": 1017,
            "humidity": 49,
            "dew_point": 59.79,
            "uvi": 5.03,
            "clouds": 12,
            "visibility": 10000,
            "wind_speed": 9.62,
            "wind_deg": 219,
            "wind_gust": 14.9,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718658000,
            "temp": 79.99,
            "feels_like": 79.99,
            "pressure": 1018,
            "humidity": 52,
            "dew_point": 60.6,
            "uvi": 2.97,
            "clouds": 29,
            "visibility": 10000,
            "wind_speed": 9.06,
            "wind_deg": 215,
            "wind_gust": 13.69,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718661600,
            "temp": 77.81,
            "feels_like": 78.15,
            "pressure": 1018,
            "humidity": 61,
            "dew_point": 62.85,
            "uvi": 1.12,
            "clouds": 43,
            "visibility": 10000,
            "wind_speed": 6.91,
            "wind_deg": 210,
            "wind_gust": 14.72,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718665200,
            "temp": 76.37,
            "feels_like": 76.71,
            "pressure": 1018,
            "humidity": 64,
            "dew_point": 62.98,
            "uvi": 0.21,
            "clouds": 51,
            "visibility": 10000,
            "wind_speed": 6.78,
            "wind_deg": 205,
            "wind_gust": 19.6,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718668800,
            "temp": 74.44,
            "feels_like": 74.64,
            "pressure": 1019,
            "humidity": 65,
            "dew_point": 61.68,
            "uvi": 0,
            "clouds": 60,
            "visibility": 10000,
            "wind_speed": 6.06,
            "wind_deg": 203,
            "wind_gust": 20.51,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718672400,
            "temp": 69.17,
            "feels_like": 69.37,
            "pressure": 1019,
            "humidity": 76,
            "dew_point": 60.93,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 4.18,
            "wind_deg": 209,
            "wind_gust": 6.96,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718676000,
            "temp": 68.27,
            "feels_like": 68.56,
            "pressure": 1020,
            "humidity": 80,
            "dew_point": 61.38,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.69,
            "wind_deg": 212,
            "wind_gust": 5.64,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718679600,
            "temp": 67.8,
            "feels_like": 68.14,
            "pressure": 1020,
            "humidity": 82,
            "dew_point": 61.79,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 3.31,
            "wind_deg": 222,
            "wind_gust": 3.67,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718683200,
            "temp": 66.6,
            "feels_like": 66.99,
            "pressure": 1020,
            "humidity": 86,
            "dew_point": 61.99,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 2.66,
            "wind_deg": 200,
            "wind_gust": 3.67,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718686800,
            "temp": 66.27,
            "feels_like": 66.74,
            "pressure": 1020,
            "humidity": 88,
            "dew_point": 62.13,
            "uvi": 0,
            "clouds": 20,
            "visibility": 10000,
            "wind_speed": 3.24,
            "wind_deg": 209,
            "wind_gust": 4.41,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718690400,
            "temp": 65.59,
            "feels_like": 66.07,
            "pressure": 1021,
            "humidity": 90,
            "dew_point": 62.15,
            "uvi": 0,
            "clouds": 24,
            "visibility": 10000,
            "wind_speed": 3.11,
            "wind_deg": 213,
            "wind_gust": 4.99,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718694000,
            "temp": 65.21,
            "feels_like": 65.75,
            "pressure": 1022,
            "humidity": 92,
            "dew_point": 62.17,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 3.29,
            "wind_deg": 217,
            "wind_gust": 6.06,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718697600,
            "temp": 64.67,
            "feels_like": 65.21,
            "pressure": 1021,
            "humidity": 93,
            "dew_point": 62.06,
            "uvi": 0,
            "clouds": 65,
            "visibility": 10000,
            "wind_speed": 3.31,
            "wind_deg": 206,
            "wind_gust": 4.94,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718701200,
            "temp": 64.11,
            "feels_like": 64.63,
            "pressure": 1022,
            "humidity": 94,
            "dew_point": 61.77,
            "uvi": 0,
            "clouds": 76,
            "visibility": 10000,
            "wind_speed": 2.91,
            "wind_deg": 199,
            "wind_gust": 4.09,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718704800,
            "temp": 65.21,
            "feels_like": 65.75,
            "pressure": 1022,
            "humidity": 92,
            "dew_point": 62.2,
            "uvi": 0.17,
            "clouds": 82,
            "visibility": 10000,
            "wind_speed": 3.58,
            "wind_deg": 194,
            "wind_gust": 5.3,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718708400,
            "temp": 69.37,
            "feels_like": 69.94,
            "pressure": 1023,
            "humidity": 84,
            "dew_point": 63.91,
            "uvi": 0.67,
            "clouds": 86,
            "visibility": 10000,
            "wind_speed": 3.22,
            "wind_deg": 209,
            "wind_gust": 5.75,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1718712000,
            "temp": 73.71,
            "feels_like": 74.25,
            "pressure": 1022,
            "humidity": 74,
            "dew_point": 64.47,
            "uvi": 1.75,
            "clouds": 88,
            "visibility": 10000,
            "wind_speed": 4.05,
            "wind_deg": 197,
            "wind_gust": 6.11,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        }
    ],
    "daily": [
        {
            "dt": 1718553600,
            "sunrise": 1718528888,
            "sunset": 1718584592,
            "moonrise": 1718565540,
            "moonset": 1718516820,
            "moon_phase": 0.32,
            "summary": "There will be clear sky until morning, then partly cloudy",
            "temp": {
                "day": 63.45,
                "min": 43.2,
                "max": 71.1,
                "night": 56.12,
                "eve": 66.65,
                "morn": 50.02
            },
            "feels_like": {
                "day": 61.7,
                "night": 53.74,
                "eve": 65.08,
                "morn": 48.06
            },
            "pressure": 1024,
            "humidity": 47,
            "dew_point": 42.89,
            "wind_speed": 5.32,
            "wind_deg": 255,
            "wind_gust": 5.08,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 100,
            "pop": 0,
            "uvi": 8.45
        },
        {
            "dt": 1718640000,
            "sunrise": 1718615291,
            "sunset": 1718671012,
            "moonrise": 1718655900,
            "moonset": 1718604300,
            "moon_phase": 0.36,
            "summary": "Expect a day of partly cloudy with clear spells",
            "temp": {
                "day": 68.02,
                "min": 55.56,
                "max": 80.76,
                "night": 67.8,
                "eve": 77.81,
                "morn": 56.07
            },
            "feels_like": {
                "day": 67.77,
                "night": 68.14,
                "eve": 78.15,
                "morn": 54.52
            },
            "pressure": 1020,
            "humidity": 69,
            "dew_point": 56.97,
            "wind_speed": 9.62,
            "wind_deg": 219,
            "wind_gust": 20.51,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 100,
            "pop": 0,
            "uvi": 9.54
        },
        {
            "dt": 1718726400,
            "sunrise": 1718701697,
            "sunset": 1718757431,
            "moonrise": 1718746440,
            "moonset": 1718691960,
            "moon_phase": 0.39,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 85.91,
                "min": 64.11,
                "max": 89.58,
                "night": 70.92,
                "eve": 85.37,
                "morn": 65.21
            },
            "feels_like": {
                "day": 87.76,
                "night": 71.89,
                "eve": 88.36,
                "morn": 65.75
            },
            "pressure": 1022,
            "humidity": 50,
            "dew_point": 64.67,
            "wind_speed": 8.21,
            "wind_deg": 257,
            "wind_gust": 13.85,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 69,
            "pop": 0.24,
            "rain": 0.18,
            "uvi": 9.78
        },
        {
            "dt": 1718812800,
            "sunrise": 1718788105,
            "sunset": 1718843848,
            "moonrise": 1718837100,
            "moonset": 1718779920,
            "moon_phase": 0.42,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 86.36,
                "min": 67.5,
                "max": 89.44,
                "night": 76.46,
                "eve": 89.28,
                "morn": 68.13
            },
            "feels_like": {
                "day": 88.74,
                "night": 77.47,
                "eve": 91.31,
                "morn": 69.01
            },
            "pressure": 1025,
            "humidity": 51,
            "dew_point": 65.98,
            "wind_speed": 8.03,
            "wind_deg": 239,
            "wind_gust": 11.74,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 67,
            "pop": 0.58,
            "rain": 0.57,
            "uvi": 8.75
        },
        {
            "dt": 1718899200,
            "sunrise": 1718874515,
            "sunset": 1718930262,
            "moonrise": 1718927700,
            "moonset": 1718868360,
            "moon_phase": 0.45,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 84.85,
                "min": 68.04,
                "max": 88.29,
                "night": 68.04,
                "eve": 88.29,
                "morn": 68.94
            },
            "feels_like": {
                "day": 87.53,
                "night": 69.04,
                "eve": 89.78,
                "morn": 70
            },
            "pressure": 1024,
            "humidity": 55,
            "dew_point": 66.58,
            "wind_speed": 6.4,
            "wind_deg": 290,
            "wind_gust": 13.67,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 1,
            "rain": 4.19,
            "uvi": 0.92
        },
        {
            "dt": 1718985600,
            "sunrise": 1718960927,
            "sunset": 1719016674,
            "moonrise": 1719018000,
            "moonset": 1718957340,
            "moon_phase": 0.5,
            "summary": "You can expect rain in the morning, with partly cloudy in the afternoon",
            "temp": {
                "day": 73.09,
                "min": 61.83,
                "max": 77.41,
                "night": 61.83,
                "eve": 75.11,
                "morn": 66.81
            },
            "feels_like": {
                "day": 74.37,
                "night": 62.13,
                "eve": 75.85,
                "morn": 67.8
            },
            "pressure": 1022,
            "humidity": 91,
            "dew_point": 69.73,
            "wind_speed": 5.28,
            "wind_deg": 343,
            "wind_gust": 6.87,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 1,
            "rain": 7.14,
            "uvi": 1
        },
        {
            "dt": 1719072000,
            "sunrise": 1719047341,
            "sunset": 1719103084,
            "moonrise": 1719107700,
            "moonset": 1719047160,
            "moon_phase": 0.52,
            "summary": "The day will start with partly cloudy through the late morning hours, transitioning to rain",
            "temp": {
                "day": 74.64,
                "min": 58.77,
                "max": 74.64,
                "night": 58.77,
                "eve": 72.7,
                "morn": 62.62
            },
            "feels_like": {
                "day": 74.68,
                "night": 59,
                "eve": 73.94,
                "morn": 61.68
            },
            "pressure": 1018,
            "humidity": 61,
            "dew_point": 60.1,
            "wind_speed": 4.5,
            "wind_deg": 17,
            "wind_gust": 10,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 77,
            "pop": 1,
            "rain": 4.53,
            "uvi": 1
        },
        {
            "dt": 1719158400,
            "sunrise": 1719133758,
            "sunset": 1719189492,
            "moonrise": 1719196740,
            "moonset": 1719137700,
            "moon_phase": 0.56,
            "summary": "Expect a day of partly cloudy with rain",
            "temp": {
                "day": 57.81,
                "min": 57.22,
                "max": 67.68,
                "night": 60.78,
                "eve": 67.68,
                "morn": 57.22
            },
            "feels_like": {
                "day": 57.94,
                "night": 61.03,
                "eve": 67.62,
                "morn": 57.15
            },
            "pressure": 1019,
            "humidity": 99,
            "dew_point": 57.09,
            "wind_speed": 5.64,
            "wind_deg": 124,
            "wind_gust": 15.17,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 1,
            "rain": 2.58,
            "uvi": 1
        }
    ]
}

export default function ForecastText() {
    const [status, setStatus] = useState('success') //pending, success, failure
    const [forecastData, setForecastData] = useState(forecastPlaceHolder);
    const [selectedLocation, setSelectedLocation] = useState(null);

    console.log(forecastData, status);

    useEffect(() => {
        let latitude = 43.989191392924575;
        let longitude = -72.86118841260061;
        async function getForecastData() {
            try {
                let forecastResponse = await fetch(`${process.env.REACT_APP_SERVER}/weather/forecast?source=openWeather&lat=43.9951&long=-72.8708`);
                let forecastJSON = await forecastResponse.json();
                setForecastData(forecastJSON)
                setStatus('success')
            } catch (error) {
                console.error(error)
                setStatus('failure')
            }
        }
        // setTimeout(()=>getForecastData(), 750);
    }, [selectedLocation])

    return (
        <div className={`${styles["component__container"]}`}>
            <div className={`${styles["inner__container"]}`}>
                <h2 className={`${styles["section__header"]}`}>Weather</h2>
                <hr />
                {status === 'pending' &&
                <Loader bottom_text={"Getting forecast data"} type={"spinner"}/>
                }
                {status === 'success' &&
                    <div className={`${styles["current-weather__container"]}`}>
                        <p>{`Current Weather for ${formatDateTime(new Date(forecastData.current.dt * 1000)).dow} ${formatDateTime(new Date(forecastData.current.dt * 1000)).fullDate} @ ${formatDateTime(new Date(forecastData.current.dt * 1000)).time} ${formatDateTime(new Date(forecastData.current.dt * 1000)).amPm}`}</p>
                        <p>Location: {forecastData.lat}, {forecastData.lon}</p>
                        <img src={`https://openweathermap.org/img/wn/${forecastData.current.weather[0].icon}@2x.png`}/>
                        <p className={`${styles["weather-details"]}`}>{`${forecastData.current.weather[0].description[0].toUpperCase()}${forecastData.current.weather[0].description.slice(1)}`}</p>
                        <p>Temperature: {Math.round(Number(forecastData.current.temp))}&deg; F / {Math.round((Number(forecastData.current.temp)-32) * 5/9)}&deg; C </p>
                    </div>
                }
                {status === 'failure' &&
                    <div>Error</div>
                }
            </div>
        </div>
    )
}