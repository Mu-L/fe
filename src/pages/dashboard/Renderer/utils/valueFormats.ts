import _ from 'lodash';
import { ValueFormatter } from './symbolFormatters';

export type DecimalCount = number | null | undefined;

export interface FormattedValue {
  text: string;
  prefix?: string;
  suffix?: string;
}

export function toFixed(value: number, decimals?: DecimalCount): string {
  if (value === null) {
    return '';
  }

  if (value === Number.NEGATIVE_INFINITY || value === Number.POSITIVE_INFINITY) {
    return value.toLocaleString();
  }

  if (decimals === null || decimals === undefined) {
    decimals = getDecimalsForValue(value);
  }

  if (value === 0) {
    return value.toFixed(decimals);
  }

  const factor = decimals ? Math.pow(10, Math.max(0, decimals)) : 1;
  const formatted = String(Math.round(value * factor) / factor);

  // if exponent return directly
  if (formatted.indexOf('e') !== -1 || value === 0) {
    return formatted;
  }

  const decimalPos = formatted.indexOf('.');
  const precision = decimalPos === -1 ? 0 : formatted.length - decimalPos - 1;
  if (precision < decimals) {
    return (precision ? formatted : formatted + '.') + String(factor).slice(1, decimals - precision + 1);
  }

  return formatted;
}

function getDecimalsForValue(value: number): number {
  const absValue = Math.abs(value);
  const log10 = Math.floor(Math.log(absValue) / Math.LN10);
  let dec = -log10 + 1;
  const magn = Math.pow(10, -dec);
  const norm = absValue / magn; // norm is between 1.0 and 10.0

  // special case for 2.5, requires an extra decimal
  if (norm > 2.25) {
    ++dec;
  }

  if (value % 1 === 0) {
    dec = 0;
  }

  const decimals = Math.max(0, dec);
  return decimals;
}

export function toFixedScaled(value: number, decimals: DecimalCount, ext?: string): FormattedValue {
  return {
    text: toFixed(value, decimals),
    suffix: appendPluralIf(ext, Math.abs(value) > 1),
  };
}

function appendPluralIf(ext: string | undefined, condition: boolean): string | undefined {
  if (!condition) {
    return ext;
  }

  switch (ext) {
    case ' min':
    case ' hour':
    case ' day':
    case ' week':
    case ' year':
      return `${ext}s`;
    default:
      return ext;
  }
}

const logb = (b: number, x: number) => Math.log10(x) / Math.log10(b);

export function scaledUnits(factor: number, extArray: string[], offset = 0): ValueFormatter {
  return (size: number, decimals: number) => {
    if (size === null || size === undefined) {
      return { text: '' };
    }

    if (size === Number.NEGATIVE_INFINITY || size === Number.POSITIVE_INFINITY || isNaN(size)) {
      return { text: size.toLocaleString() };
    }

    const siIndex = size === 0 ? 0 : Math.floor(logb(factor, Math.abs(size)));
    const suffix = extArray[_.clamp(offset + siIndex, 0, extArray.length - 1)];

    return {
      text: _.toString(_.round(size / factor ** _.clamp(siIndex, -offset, extArray.length - offset - 1), decimals)),
      suffix,
    };
  };
}

export function toFixedUnit(unit: string, asPrefix?: boolean): ValueFormatter {
  return (size: number, decimals: number) => {
    if (size === null) {
      return { text: '' };
    }
    const text = _.toString(_.round(size, decimals));
    if (unit) {
      if (asPrefix) {
        return { text, prefix: unit };
      }
      return { text, suffix: ' ' + unit };
    }
    return { text };
  };
}
