import { TestBed } from "@angular/core/testing";
import { ValueService } from "./demo";

let service: ValueService;

describe("demo (with TestBed)", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService] });
  });

  it("should use ValueService", () => {
    service = TestBed.inject(ValueService);
    expect(service.getValue()).toBe("real value");
  });
});
