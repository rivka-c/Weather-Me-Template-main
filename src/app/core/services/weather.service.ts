import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  isMetric = true;
  private temperatureUnitChangedSubject = new BehaviorSubject<boolean>(this.isMetric);
  temperatureUnitChanged = this.temperatureUnitChangedSubject.asObservable();


  constructor(private httpClient: HttpClient) { }
  setTemperatureUnit() {
    this.temperatureUnitChangedSubject.next(this.isMetric);
  }
  getForecast(locationKey: string): Observable<Forecast> {
    // const isMetric = this.isMetric ? 'true' : 'false';

    // let params: HttpParams = new HttpParams();
    // params = params.append('apikey', environment.apiKey);
    // params = params.append('metric', isMetric);

    // return this.httpClient.get<Forecast>(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, { params });
    const defaultForecast: Forecast =
    {
      Headline: {
        EffectiveDate: "2023-10-10T08:00:00+03:00",
        EffectiveEpochDate: 1696917600,
        Severity: 4,
        Text: "Sunny and pleasant",
        Category: "clear",
        EndDate: null,
        EndEpochDate: null,
        MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854",
        Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854"
      },
      DailyForecasts: [
        {
          Date: "2023-10-10T07:00:00+03:00",
          EpochDate: 1696914000,
          Temperature: {
            Minimum: {
              Value: 20.0,
              Unit: "C",
              UnitType: 17
            },
            Maximum: {
              Value: 28.0,
              Unit: "C",
              UnitType: 17
            }
          },
          Day: {
            Icon: 1,
            IconPhrase: "Sunny",
            HasPrecipitation: false
          },
          Night: {
            Icon: 33,
            IconPhrase: "Clear",
            HasPrecipitation: false
          },
          Sources: ["AccuWeather"],
          MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1"
        },
        {
          Date: "2023-10-11T07:00:00+03:00",
          EpochDate: 1697000400,
          Temperature: {
            Minimum: {
              Value: 21.0,
              Unit: "C",
              UnitType: 17
            },
            Maximum: {
              Value: 29.0,
              Unit: "C",
              UnitType: 17
            }
          },
          Day: {
            Icon: 2,
            IconPhrase: "Partly sunny",
            HasPrecipitation: false
          },
          Night: {
            Icon: 34,
            IconPhrase: "Mostly clear",
            HasPrecipitation: false
          },
          Sources: ["AccuWeather"],
          MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2"
        },
        {
          Date: "2023-10-10T07:00:00+03:00",
          EpochDate: 1696914000,
          Temperature: {
            Minimum: {
              Value: 20.0,
              Unit: "C",
              UnitType: 17
            },
            Maximum: {
              Value: 28.0,
              Unit: "C",
              UnitType: 17
            }
          },
          Day: {
            Icon: 1,
            IconPhrase: "Sunny",
            HasPrecipitation: false
          },
          Night: {
            Icon: 33,
            IconPhrase: "Clear",
            HasPrecipitation: false
          },
          Sources: ["AccuWeather"],
          MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1"
        },
        {
          Date: "2023-10-10T07:00:00+03:00",
          EpochDate: 1696914000,
          Temperature: {
            Minimum: {
              Value: 20.0,
              Unit: "C",
              UnitType: 17
            },
            Maximum: {
              Value: 28.0,
              Unit: "C",
              UnitType: 17
            }
          },
          Day: {
            Icon: 1,
            IconPhrase: "Sunny",
            HasPrecipitation: false
          },
          Night: {
            Icon: 33,
            IconPhrase: "Clear",
            HasPrecipitation: false
          },
          Sources: ["AccuWeather"],
          MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1"
        },
        {
          Date: "2023-10-10T07:00:00+03:00",
          EpochDate: 1696914000,
          Temperature: {
            Minimum: {
              Value: 20.0,
              Unit: "C",
              UnitType: 17
            },
            Maximum: {
              Value: 28.0,
              Unit: "C",
              UnitType: 17
            }
          },
          Day: {
            Icon: 1,
            IconPhrase: "Sunny",
            HasPrecipitation: false
          },
          Night: {
            Icon: 33,
            IconPhrase: "Clear",
            HasPrecipitation: false
          },
          Sources: ["AccuWeather"],
          MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1",
          Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1"
        }
        // Add more default days if needed
      ]

    }
    return of(defaultForecast);
  }


  getCurrentWeather(locationKey: string): Observable<CurrentWeather[]> {
    // let params: HttpParams = new HttpParams();
    // params = params.append('apikey', environment.apiKey);

    // return this.httpClient.get<CurrentWeather[]>(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, { params });

    const defaultCurrentWeather: CurrentWeather[] = [{
      LocalObservationDateTime: "2023-10-10T10:00:00+03:00",
      EpochTime: 1696924800,
      WeatherText: "Sunny",
      WeatherIcon: 1,
      HasPrecipitation: false,
      PrecipitationType: null,
      IsDayTime: true,
      Temperature: {
        Metric: {
          Value: 25.0,
          Unit: "C",
          UnitType: 17
        },
        Imperial: {
          Value: 77.0,
          Unit: "F",
          UnitType: 18
        }
      },
      MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854"
    }];

    return of(defaultCurrentWeather);
  }

  getIconUrl(iconId: Number): string {
    return `https://developer.accuweather.com/sites/default/files/${iconId.toString().padStart(2, '0')}-s.png`;
  }
}
