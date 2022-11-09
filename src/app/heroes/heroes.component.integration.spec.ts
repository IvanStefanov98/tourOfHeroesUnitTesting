import { componentFactoryName } from "@angular/compiler";
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

@Component({
    selector: 'app-hero',
    template: '<div></div>'
})
class FakeHeroComponent {
    @Input() hero: Hero;
    @Output() delete = new EventEmitter();
}

describe("HeroesComponent (integration)", () => {


    let mockHeroService = jasmine.createSpyObj(["getHeroes", "deleteHero", "addHero"]);
    let mockHeroes;
    let fixture: ComponentFixture<HeroesComponent>;
    let component: HeroesComponent;
    beforeEach(() => {
        mockHeroes = [
            { id: 1, name: "Ironman", strength: 10 },
            { id: 2, name: "Hulk", strength: 20 },
            { id: 3, name: "Thor", strength: 15 }
        ];
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
        fixture.detectChanges();
    });

    it("should get heroes", () => {
        expect(component.heroes.length).toEqual(3);
    });

    it("should render all heroes", () => {
        let deLi = fixture.debugElement.queryAll(By.css("li"));

        expect(deLi.length).toEqual(component.heroes.length);
    });
});