import { componentFactoryName } from "@angular/compiler";
import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent", () => {

    let mockHeroService = jasmine.createSpyObj(["getHeroes", "deleteHero", "addHero"]);
    let mockHeroes;
    let component;
    beforeEach(() => {
        mockHeroes = [
            { id: 1, name: "Ironman", strength: 10 },
            { id: 2, name: "Hulk", strength: 20 },
            { id: 3, name: "Thor", strength: 15 }
        ]
        component = new HeroesComponent(mockHeroService);
    });

    it("should delete the given hero", () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        component.heroes = mockHeroes;

        component.delete(mockHeroes[2]);

        expect(component.heroes.length).toEqual(2);
    });

    it("should call deleteHero from service", () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        component.heroes = mockHeroes;

        component.delete(mockHeroes[2]);

        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(mockHeroes[2]);
    });

    it("should get heroes", () => {
        const spy = spyOn(component, "getHeroes").and.callThrough();
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));

        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
        expect(component.heroes.length).toEqual(3);
    });
});