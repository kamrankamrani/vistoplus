export interface UselessFactResponse {
  text: string;
  id: string;
  source?: string;
  source_url?: string;
  permalink?: string;
  language?: string;
}

export interface TranslateResponse {
  responseData?: {
    translatedText?: string;
  };
}

export interface GeoCodingResponse {
  name: string;
  local_names: { [k: string]: string };
  lat: string;
  lon: string;
  country: string;
}

export interface CurrentWeatherResponse {
  coord: { lon: string; lat: string };
  weather: { id: string; main: string; description: string; icon: string };
  base: string;
  main: {
    temp: string;
    feels_like: string;
    pressure: string;
    humidity: string;
    temp_min: string;
    temp_max: string;
    sea_level: string;
    grnd_level: string;
  };
  visibility: string;
  wind: {
    speed: string;
    deg: string;
    gust: string;
  };
  clouds: { all: string };
  dt: string;
  sys: {
    type: string;
    id: string;
    message: string;
    country: string;
    sunrise: string;
    sunset: string;
  };
  timezone: string;
  id: string;
  name: string;
  cod: string;
}

export interface DailyForeCastResponse {
  city: {
    id: string;
    name: string;
    coord: { lan: string; lon: string };
    country: string;
    population: string;
    timezone: string;
    sunrise: string;
    sunset: string;
  };
  cod: string;
  message: string;
  cnt: string;
  list: {
    dt: string;
    main: {
      temp: string;
      feels_like: string;
      temp_min: string;
      temp_max: string;
      pressure: string;
      sea_level: string;
      grnd_level: string;
      humidity: string;
      temp_kf: string;
    };
    weather: {
      id: string;
      main: string;
      description: string;
      icon: string;
    };
    clouds: {
      all: string;
    };
    wind: {
      speed: string;
      deg: string;
      gust: string;
    };
    visibility: string;
    pop: string;
    sys: {
      pod: string;
    };
    dt_text: string;
  }[];
}
