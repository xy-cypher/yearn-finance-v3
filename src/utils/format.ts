import BigNumber from 'bignumber.js';

import { formatUnits, BigNumber as EthersBN } from '@frameworks/ethers';

BigNumber.set({ EXPONENTIAL_AT: 50 });

export const USDC_DECIMALS = 6;
export const COLLATERAL_FACTOR_DECIMALS = 18;
export const GWEI = 9;

const format = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

export const toBN = (amount?: string | number) => {
  if (!amount || amount === '') {
    amount = '0';
  }
  return new BigNumber(amount);
};

export const formatAmount = (amount: string, decimals: number) => {
  return new BigNumber(amount).toFormat(decimals, BigNumber.ROUND_FLOOR, format);
};

export const weiToUnits = (amount: string, decimals: number) => formatUnits(EthersBN.from(amount), decimals);

export const normalizeAmount = (amount: string | undefined, decimals: number) => {
  if (!amount || amount === '') {
    amount = '0';
  }
  const ONE_UNIT = new BigNumber(10).pow(decimals);
  return new BigNumber(amount).div(ONE_UNIT).toString();
};

export const formatPercent = (amount: string, decimals: number) => {
  return new BigNumber(amount).times(100).toFormat(decimals, { ...format, suffix: '%' });
};

export const normalizePercent = (amount: string, decimals: number) => {
  return formatPercent(new BigNumber(amount).div(10 ** 4).toString(), decimals);
};

export const humanizeAmount = (amount: string | undefined, tokenDecimals: number, wantedDecimals: number) => {
  if (!amount || !tokenDecimals) {
    return '0';
  }
  const units = weiToUnits(amount, tokenDecimals);
  return formatAmount(units, wantedDecimals);
};

export const formatUsd = (amount?: string, decimals = 2) => {
  if (!amount || amount === '') {
    amount = '0';
  }
  return new BigNumber(amount ?? '0').toFormat(decimals, { ...format, prefix: '$ ' });
};

export const normalizeUsdc = (amount?: string, decimals = 2) => {
  if (!amount || amount === '') {
    amount = '0';
  }
  const units = weiToUnits(amount, USDC_DECIMALS);
  return formatUsd(units, decimals);
};

export const toWei = (amount: string, decimals: number) => {
  const ONE_UNIT = new BigNumber(10).pow(decimals);
  return new BigNumber(amount).times(ONE_UNIT).toFixed(0);
};

export const formatApy = (apyData: string, apyType: string) => {
  if (apyType === 'new') return 'NEW ✨';
  if (apyType === 'n/a') return 'N/A';

  return formatPercent(apyData, 2);
};
