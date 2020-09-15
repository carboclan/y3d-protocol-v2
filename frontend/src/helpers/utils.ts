import { formatUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';

export function shorten(str = '') {
  if (!str) return '';
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

/**
 * Get the timestamp of deadline required by Uniswap
 * @param minutes How many minutes from now on as deadline.
 * Default is 20 minutes
 */
export function getDeadlineFromNow(minutes: number = 20) {
  const now = new Date().getTime();
  const offset = 1000 * 60 * minutes;
  const deadline = now + offset;
  // to int
  return Math.floor(deadline / 1000);
}

/**
 * Format BigNumber Balance
 * @param balance
 * @param decimals
 */
export function balanceFormat(balance: number, decimals: number = 18) {
  return formatUnits(balance, decimals);
}

export function priceCalculator(
  priceA: string | number, priceB: string | number,
  tokenADecimals: string | number, tokenBDecimals: string | number,
) {
  const [A, B] = [priceA, priceB].map((p) => BigNumber.from(p));
  const [aD, bD] = [tokenADecimals, tokenBDecimals].map((d) => Number(d));
  const digitsDiff = Math.abs(aD - bD);
  if (digitsDiff > 0) {
    const aDiff = aD - bD;
    const bDiff = bD - aD;
    // A = A.times(10 ** aDiff);
    // B = B.times(10 ** bDiff);
  }
  return { A, B };
}
/**
 *
 * @param time sleep time ms
 */
export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
