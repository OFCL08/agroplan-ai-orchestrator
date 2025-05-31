const API_BASE_URL = 'http://ec2-44-244-36-34.us-west-2.compute.amazonaws.com:8000';

// Request Types
export interface ForecastRequest {
  sensor_id: string;
  latitude: number;
  longitude: number;
}

export interface HistoricalDataRequest {
  latitude: number;
  longitude: number;
  start_date: number;
  end_date: number;
  hourly: string[];
}

// Response Types
export interface SensorData {
  sensor_id: string;
  // Add other fields as they become available
}

export interface ForecastData {
  sensor_id: string;
  // Add other fields as they become available
}

export interface HistoricalData {
  latitude: number;
  longitude: number;
  hourly: {
    temperature_2m: number[];
  };
}

// Error type
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

type QueryParamValue = string | number | string[] | number[];
type QueryParams = { [key: string]: QueryParamValue };

// Helper function to convert object to query string
const objectToQueryString = (obj: QueryParams): string => {
  const params = new URLSearchParams();
  
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle arrays (like hourly parameters)
      value.forEach(item => params.append(key, item.toString()));
    } else if (value !== null && value !== undefined) {
      params.append(key, value.toString());
    }
  });
  
  return params.toString();
};

// Convert HistoricalDataRequest to QueryParams
const toQueryParams = (request: HistoricalDataRequest): QueryParams => ({
  latitude: request.latitude,
  longitude: request.longitude,
  start_date: request.start_date,
  end_date: request.end_date,
  hourly: request.hourly
});

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, `API Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(`Network error: ${error.message}`);
  }
}

// API endpoints
export const api = {
  // Get sensor data
  getSensorData: (sensorId: string) => 
    fetchApi<SensorData>(`/sensor_data?sensor_id=${encodeURIComponent(sensorId)}`),

  // Get forecast data
  getForecastData: (data: ForecastRequest) => 
    fetchApi<ForecastData>('/forecast_data', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get historical data
  getHistoricalData: (data: HistoricalDataRequest) => 
    fetchApi<HistoricalData>('/historical_data', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default api; 