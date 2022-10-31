import { StrengthPipe } from "./strength.pipe";

describe("StrengthPipe", () => {
    let pipe: StrengthPipe;
    beforeEach(() => {
        pipe = new StrengthPipe();
    });

    it("should return (weak)", () => {
        const action = pipe.transform(5);
        expect(action).toEqual("5 (weak)");
    });

    it("should return (strong)", () => {
        const action = pipe.transform(12);
        expect(action).toEqual("12 (strong)");
    });

    it("should return (strong)", () => {
        const action = pipe.transform(100);
        expect(action).toEqual("100 (unbelievable)");
    });
});