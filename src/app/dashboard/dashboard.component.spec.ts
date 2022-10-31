import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Observable, of, Subject } from "rxjs";
import { Hero } from "../hero";
import { HeroSearchComponent } from "../hero-search/hero-search.component";
import { HeroService } from "../hero.service";
import { StrengthPipe } from "../strength/strength.pipe";
import { DashboardComponent } from "./dashboard.component";

// @Component({
//     selector: 'app-hero-search',
//     template: '<div></div>',
// })
// class FakeHeroSearchComponent {
//     heroes$: Observable<Hero[]>;
//     searchTerms = new Subject<string>();
// }

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

describe("DashboardComponent", () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let mockService = jasmine.createSpyObj(["getHeroes", "searchHeroes"]);
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
                DashboardComponent,
                StrengthPipe,
                RouterLinkDirectiveStub,
                HeroSearchComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockService }
            ]
        });
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        mockService.getHeroes.and.returnValue(of(mockHeroes));
        fixture.detectChanges();
    });

    it("should call getHeroes and show only 4 records", () => {
        mockService.getHeroes.and.returnValue(of(mockHeroes));
        component.getHeroes();
        expect(component.heroes.length).toEqual(4);
    });

    it("should have the correct route for the 1st displayed hero", () => {
        const anchorDE = fixture.debugElement.queryAll(By.css("a"));
        const routerLink = anchorDE[0].injector.get(RouterLinkDirectiveStub);
        anchorDE[0].triggerEventHandler("click", null);
        expect(routerLink.navigatedTo).toEqual("/detail/2");
    });

    it("should test template for number of displayed heros", () => {
        const heroAchorDE = fixture.debugElement.queryAll(By.css("a"));
        mockService.getHeroes.and.returnValue(of(mockHeroes));
        component.getHeroes();
        expect(heroAchorDE.length).toBe(4);
        expect(heroAchorDE[0].nativeElement.textContent).toContain("Captain America");
    });

    it("should deep test HeroSearchComponent and seach for a hero", () => {
        const heroSearchComponent = fixture.debugElement.queryAll(By.directive(HeroSearchComponent))[0].componentInstance;
        const spy = spyOn(heroSearchComponent.searchTerms, "next");
        heroSearchComponent.search("cap");
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith("cap");
    });
});