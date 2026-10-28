export {};

type Assertion = {
  toBe: (expect: unknown) => void;
};

declare global {
  var expect: (actual: unknown) => Assertion;
  var test: (testName: string, callback: () => void) => void;
}

globalThis.test = function test(testName, callback) {
  try {
    callback();
  } catch (error) {
    console.log(`${testName} has been failed`);
  }
};

globalThis.expect = function expect(actual) {
  return {
    toBe(expect) {
      if (expect !== actual) throw new Error("ERROR");
    },
  };
};
