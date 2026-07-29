import { Currency } from '../types';

const RATES: Record<Currency, { rate: number; symbol: string }> = {
  GBP: { rate: 1.0, symbol: '£' },
  USD: { rate: 1.3, symbol: '$' },
  EUR: { rate: 1.18, symbol: '€' }
};

export function formatPrice(priceGBP: number, currency: Currency = 'USD'): string {
  const config = RATES[currency] || RATES.USD;
  const converted = Math.round(priceGBP * config.rate);
  return `${config.symbol}${converted}`;
}

export function getCurrencySymbol(currency: Currency = 'USD'): string {
  return RATES[currency]?.symbol || '$';
}
