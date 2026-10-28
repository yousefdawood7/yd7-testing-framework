import { greet } from "../src/utils";

test("first", () => expect(greet("Yousef")).toBe("Hi Yousef"));
test("second", () => expect(greet("Yousef")).toBe("Hi Yousef"));
