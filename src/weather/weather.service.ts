import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);


  // Cron job that runs every minute
  @Cron('*/1 * * * * *') 
  async fetchWeatherData() {
    this.logger.debug('Fetching weather data...');

    try {
      let a = Math.floor(Math.random()*90)
      console.log(a)
      let url = `https://api.open-meteo.com/v1/forecast?latitude=${a}.7128&longitude=-74.0060&current_weather=true`
      const response = await axios.get(url);

      const weatherData = response.data;
      this.logger.log(`Temperature in New York: ${weatherData.current_weather.temperature}°C`);
    } catch (error) {
      this.logger.error(`Error fetching weather data: ${error.message}`);
    }
  }

}
