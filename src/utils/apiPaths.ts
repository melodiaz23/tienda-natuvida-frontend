const API_BASE = '/api';
const API_VERSION = '/v1';
const API_BASE_PATH = API_BASE + API_VERSION;

export const ApiPaths = {
  // Base paths
  API_BASE_PATH,

  // Entity endpoints
  USERS: API_BASE_PATH + '/users',
  CUSTOMERS: API_BASE_PATH + '/customers',
  PRODUCTS: API_BASE_PATH + '/products',
  CATEGORIES: API_BASE_PATH + '/categories',
  ORDERS: API_BASE_PATH + '/orders',
  CART: API_BASE_PATH + '/cart',

  // Auth endpoints
  AUTH: `${API_BASE_PATH}/auth`,
  LOGIN: `${API_BASE_PATH}/auth/login`,
  REGISTER: `${API_BASE_PATH}/auth/register`,
  REFRESH_TOKEN: `${API_BASE_PATH}/auth/refresh-token`, // Added this for consistency
  LOGOUT: `${API_BASE_PATH}/auth/logout`, // Added this for clarity

  // OAuth endpoints
  OAUTH2: API_BASE + '/oauth2',
  OAUTH2_SUCCESS: API_BASE + '/oauth2/success',
  OAUTH2_FAILURE: API_BASE + '/oauth2/failure'
};

export default ApiPaths;