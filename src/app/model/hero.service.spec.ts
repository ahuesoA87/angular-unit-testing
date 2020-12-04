import { HeroService } from "./hero.service";
import { Hero } from "./hero";
import { asyncData, asyncError } from "../../testing/async-observable-helpers";

describe("HeroService (with spies)", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let heroService: HeroService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    heroService = new HeroService(httpClientSpy as any);
  });

  it("should return expected heroes (HttpClient called once)", () => {
    const expectedHeroes: Hero[] = [{ id: 1, name: "A" }, { id: 2, name: "B" }];

    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

    heroService
      .getHeroes()
      .subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, "expected heroes"),
        fail
      );

    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });
});
