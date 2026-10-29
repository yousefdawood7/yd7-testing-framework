export {};

type Assertion = {
  toBe: (expect: unknown) => void;
  rejects: {
    toThrow: (errorMsg?: string) => Promise<void>;
  };
};

declare global {
  var expect: (actual: unknown) => Assertion;
  var test: (testName: string, callback: () => void) => void;
  var beforeAll: (callback: () => void) => void;
  var afterAll: (callback: () => void) => void;
  var describe: (descName: string, callback: () => void) => void;
}

globalThis.beforeAll = function (callback) {
  callback();
};

globalThis.afterAll = function (callback) {
  process.on("beforeExit", callback);
};

globalThis.describe = function (descName, callback) {
  callback();
};

globalThis.test = async function test(testName, callback) {
  try {
    await callback();
    console.log(testName + "  Succeeded");
  } catch (error) {
    console.log(testName + "  Failed");
    console.log(error);
  }
};

globalThis.expect = function expect(actual) {
  return {
    toBe(expect) {
      if (expect !== actual) throw new Error(`ERROR ==> ${expect}  ${actual}`);
    },

    rejects: {
      async toThrow(errorMsg) {
        if (!(actual instanceof Promise)) throw new Error("IT'S NOT A PROMISE");

        try {
          await actual;
          throw new Error("I Didn't Throw ");
        } catch (err) {
          if (!errorMsg) return;

          if (err instanceof Error && err.message !== errorMsg)
            throw new Error("STRING NOT MATCHED");
        }
      },
    },
  };
};
