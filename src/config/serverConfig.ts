import Config from 'react-native-config';

interface ConfigVariables {
  BASE_URL: string;
}

export const ServerConfig: ConfigVariables = {
  BASE_URL: Config.BASE_URL ?? 'https://sea-backend-8j8g.onrender.com',
};
