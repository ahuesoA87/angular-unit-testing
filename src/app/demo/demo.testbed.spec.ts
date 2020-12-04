import { TestBed } from "@angular/core/testing";
import { MasterService, ValueService } from "./demo";

let service: ValueService;

describe("demo (with TestBed)", () => {
  ///// Service Tests /////

  describe("ValueService", () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [ValueService] });
      service = TestBed.inject(ValueService);
    });

    it("should use ValueService", () => {
      expect(service.getValue()).toBe("real value");
    });
  });

  describe("MasterService", () => {
    let masterService: MasterService;
    let valueServiceSpy: jasmine.SpyObj<ValueService>;

    beforeEach(() => {
      const spy = jasmine.createSpyObj("ValueService", ["getValue"]);

      TestBed.configureTestingModule({
        // Proveemos ambos, el servicio a testear y su dependencia (spy)
        providers: [MasterService, { provide: ValueService, useValue: spy }]
      });
      // Injectamos ambos, el servicio a testear y su dependencia (spy)
      masterService = TestBed.inject(MasterService);
      valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<
        ValueService
      >;
    });

    it("#getValue should return stubbed value from a spy", () => {
      const stubValue = "stub value";
      valueServiceSpy.getValue.and.returnValue(stubValue);

      expect(masterService.getValue()).toBe(
        stubValue,
        "service return stub value"
      );
      expect(valueServiceSpy.getValue.calls.count()).toBe(
        1,
        "spy method was called once"
      );
      expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(
        stubValue
      );
    });
  });
});
