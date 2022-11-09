import { StrengthPipe } from "./strength.pipe";

describe("StrengthPipe", () => {
    it("should return weak if strength is lower than 10", () => {
        let pipe = new StrengthPipe();

        let value = pipe.transform(5);

        expect(value).toEqual("5 (weak)");
    });

    it("should return weak if strength is lower than 10", () => {
        let pipe = new StrengthPipe();

        let value = pipe.transform(15);

        expect(value).toEqual("15 (strong)");
    });
});