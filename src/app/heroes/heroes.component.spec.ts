import { Directive, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

@Directive({
    selector: "[routerLink]",
    host: { "(click)": "onClick()" }
})
export class RouterLinkDirectiveStub {
    @Input("routerLink") routerLinkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.routerLinkParams;
    }
}

describe("HeroesComponent", () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let component: HeroesComponent;
    let mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"]);
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
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
        fixture.detectChanges();
    });

    it("should get heroes", () => {
        expect(component.heroes).toEqual(mockHeroes);
    });

    it("should return undefined", () => {
        const inputDE = fixture.debugElement.query(By.css("input")).nativeElement;
        const buttonDE = fixture.debugElement.query(By.css("button"));
        inputDE.value = " ";
        buttonDE.triggerEventHandler("click", inputDE.value);
        expect(component.add(" ")).toBeUndefined();
    });

    it("should delete the given hero", () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        component.delete(mockHeroes[5]);
        expect(component.heroes.length).toEqual(5);
    });

    it("should delete the first hero", () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        const heroComponent = fixture.debugElement.query(By.directive(HeroComponent));
        const deleteEvent = jasmine.createSpyObj(["stopPropagation"]);
        heroComponent.componentInstance.onDeleteClick(deleteEvent);
        expect(component.heroes.length).toEqual(5);
    });

    it("should click X button in child component and delete the selected hero", () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponent[1].query(By.css("button")).triggerEventHandler("click", { stopPropagation: () => { } });
        expect(component.heroes.length).toEqual(5);
    });

    it("should test the url of a hero", () => {
        const anchorDE = fixture.debugElement.queryAll(By.css("a"));
        const routerLink = anchorDE[0].injector.get(RouterLinkDirectiveStub);
        anchorDE[0].triggerEventHandler("click", null);
        expect(routerLink.navigatedTo).toEqual("/detail/1");
    });
});

describe("HeroesComponent addHero", () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let component: HeroesComponent;
    let mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"]);
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
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
        fixture.detectChanges();
    });

    it("should add new hero", () => {
        const newHero = { id: 7, name: "Spiderman", strength: 11 };
        const inputDE = fixture.debugElement.query(By.css("input")).nativeElement;
        const buttonDE = fixture.debugElement.query(By.css("button"));
        inputDE.value = "Spiderman";
        mockHeroService.addHero.and.returnValue(of(newHero));
        buttonDE.triggerEventHandler("click", inputDE.value);
        expect(component.heroes[6].name).toEqual("Spiderman");
        expect(component.heroes.length).toEqual(7);
    });
});
