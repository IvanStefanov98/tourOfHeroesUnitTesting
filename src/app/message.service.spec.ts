import { MessageService } from "./message.service";

describe("MessageService", () => {
    let service: MessageService;

    beforeEach(() => {
        service = new MessageService();
        service.messages = ["message 1", "message 2", "message 3"];
    });

    it("should test add", () => {
        service.add("new message");
        expect(service.messages.length).toEqual(4);
        expect(service.messages[3]).toEqual("new message");
    });

    it("should test clear", () => {
        service.clear();
        expect(service.messages.length).toEqual(0);
    })
});