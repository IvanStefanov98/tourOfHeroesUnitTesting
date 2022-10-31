import { Directive, EventEmitter, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroService } from "../hero.service";
import { HeroComponent } from "./hero.component";

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

describe("HeroComponent", () => {
    let component: HeroComponent;
    let fixture: ComponentFixture<HeroComponent>;
    let mockService = jasmine.createSpyObj(["getHeroes"]);
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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockService }
            ],
        });
        fixture = TestBed.createComponent(HeroComponent);
        component = fixture.componentInstance;
        component.hero = mockHeroes[0];
        fixture.detectChanges();
    });

    it("should test onDeleteClick and call EventEmitter", () => {
        component.delete = new EventEmitter();
        const spy = spyOn(component.delete, "next");
        const evt = jasmine.createSpyObj(["stopPropagation"]);
        component.onDeleteClick(evt);
        expect(spy).toHaveBeenCalled();
    });

    it("should test the url of a hero", () => {
        const anchorDE = fixture.debugElement.queryAll(By.css("a"));
        const routerLink = anchorDE[0].injector.get(RouterLinkDirectiveStub);
        anchorDE[0].triggerEventHandler("click", null);
        expect(routerLink.navigatedTo).toEqual("/detail/1");
    });

    it("should test the button in the template and call onDeleteClick", () => {
        const spy = spyOn(component, "onDeleteClick");
        const button = fixture.debugElement.query(By.css("button"));
        button.triggerEventHandler("click", null);
        expect(spy).toHaveBeenCalled();
    });
});