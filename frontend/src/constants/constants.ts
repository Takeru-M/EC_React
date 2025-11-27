// const API_URL = import.meta.env.VITE_APP_API_URL;
const API_URL = 'http://localhost:8001/api/v1';
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;
const TAX_RATE = 0.1;
const DEFUALT_SHIPPING_COST = 0;
const ORDER_STATUS = {
  PAID: 1,
  SHIPPED: 2,
  DELIVERED: 3,
  CANCELLED: 4,
};

export {
  API_URL,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE,
  TAX_RATE,
  DEFUALT_SHIPPING_COST,
  ORDER_STATUS,
};
