import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("HeroService", () => {
    let service: HeroService;
    let controller: HttpTestingController
    let mockMessageService = jasmine.createSpyObj(["add", "clear"]);
    let mockHeroes = [
        {
            id: 1, name: "Ironman", strength: 7
        },
        {
            id: 2, name: "Captain America", strength: 8
        },
        {
            id: 3, name: "Thor", strength: 10
        },
        {
            id: 4, name: "Hulk", strength: 10
        },
        {
            id: 5, name: "Hawkeye", strength: 4
        },
        {
            id: 6, name: "Black Widow", strength: 5
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ],
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(HeroService);
        controller = TestBed.inject(HttpTestingController);
    });

    it("should test getHero", () => {
        service.getHero(1).subscribe(hero => {
            expect(hero.id).toBe(1);
        });
        const request = controller.expectOne("api/heroes/1");
        request.flush(mockHeroes[0]);
        controller.verify();
        expect(request.request.method).toBe("GET");
    });

    it("should test getHeroes", () => {
        service.getHeroes().subscribe(heroes => {
            expect(heroes.length).toBe(6);
        });
        const request = controller.expectOne("api/heroes");
        request.flush(mockHeroes);
        controller.verify();
        expect(request.request.method).toBe("GET");
    });

    it("should test getHeroNo404", () => {
        service.getHeroNo404(3).subscribe();
        const request = controller.expectOne("api/heroes/?id=3");
        request.flush(mockHeroes[2]);
        controller.verify();
        expect(request.request.method).toBe("GET");
    });

    it("should test searchHeroes", () => {
        service.searchHeroes("iron").subscribe();
        const request = controller.expectOne("api/heroes/?name=iron");
        request.flush(mockHeroes[0]);
        controller.verify();
        expect(request.request.method).toBe("GET");
    });

    it("should test searchHeroes with an empty search term", () => {
        service.searchHeroes("").subscribe(hero => {
            expect(hero).toEqual([]);
        });
    });

    it("should test addHero", () => {
        const newHero = { id: 7, name: "Spiderman", strength: 5 };
        service.addHero(newHero).subscribe();
        const request = controller.expectOne("api/heroes");
        request.flush(true);
        controller.verify();
        expect(request.request.method).toBe("POST");
    });

    it("should test deleteHero with id", () => {
        service.deleteHero(1).subscribe();
        const request = controller.expectOne("api/heroes/1");
        request.flush(true);
        controller.verify();
        expect(request.request.method).toBe("DELETE");
    });

    it("should test deleteHero with hero", () => {
        service.deleteHero(mockHeroes[0]).subscribe();
        const request = controller.expectOne("api/heroes/1");
        request.flush(true);
        controller.verify();
        expect(request.request.method).toBe("DELETE");
    });

    it("should test updateHero", () => {
        service.updateHero({ id: 1, name: "Iron Man", strength: 100 }).subscribe();
        const request = controller.expectOne("api/heroes");
        request.flush({ id: 1, name: "Iron Man", strength: 100 });
        controller.verify();
        expect(request.request.method).toBe("PUT");
    });
});

describe("HeroService vol.2", () => {
    let mockMessageService = jasmine.createSpyObj(["add", "clear"]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ],
            imports: [
                HttpClientTestingModule
            ]
        });
    });

    it("should test getHero with the correct url", inject(
        [HeroService, HttpTestingController],
        (service: HeroService, controller: HttpTestingController) => {
            service.getHero(1).subscribe(hero => {
                expect(hero.id).toBe(1);
            });
            const request = controller.expectOne("api/heroes/1");
            request.flush({ id: 1, name: "Ironman", strength: 7 });
            controller.verify();
            expect(request.request.method).toBe("GET");
        }));

});