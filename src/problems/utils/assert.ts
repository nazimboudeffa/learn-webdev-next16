const PREFIX = "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:";

const isEqual = (a: any, b: any) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return a === b;
  }
};

export function assertDeepStrictEqual(actual: any, expected: any) {
  if (!isEqual(actual, expected)) {
    throw new Error(PREFIX);
  }
}

export function assertStrictEqual(actual: any, expected: any) {
  if (actual !== expected) {
    throw new Error(PREFIX);
  }
}

export const ASSERTION_PREFIX = PREFIX;
