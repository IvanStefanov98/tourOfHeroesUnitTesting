import { Location } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

const mockActivatedRoute = {
    snapshot: {
        paramMap: {
            get: () => {
                return "1";
            }
        }
    }
};

describe("HeroDetailComponent", () => {
    let component: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockService = jasmine.createSpyObj(["getHero", "updateHero", "getHeroes", "searchHeroes"]);
    let mockLocation = jasmine.createSpyObj(["back"]);
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
                HeroDetailComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Location, useValue: mockLocation }
            ],
            imports: [
                FormsModule
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        mockService.getHero.and.returnValue(of(mockHeroes[0]));
        fixture.detectChanges();
    });

    it("should get hero by id", () => {
        fixture.detectChanges();
        const h2 = fixture.nativeElement.querySelector("h2").textContent;
        expect(component.hero).toEqual(mockHeroes[0]);
        expect(h2).toContain(mockHeroes[0].name.toUpperCase());
    });

    it("should update hero", () => {
        component.hero.strength = 100;
        mockService.updateHero.and.returnValue(of(true));
        component.save();
        expect(mockLocation.back).toHaveBeenCalled();
    });
});