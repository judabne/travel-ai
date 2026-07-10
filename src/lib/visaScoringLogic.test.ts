import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  averageVisaScoreForDestination,
  formatVisaRequirementText,
  scoreRequirement,
} from "@/lib/visaScoringLogic";

describe("scoreRequirement", () => {
  it("maps named requirements to scores", () => {
    assert.equal(scoreRequirement("visa free", 10), 100);
    assert.equal(scoreRequirement("visa required", 10), 75);
    assert.equal(scoreRequirement("no admission", 10), 20);
  });

  it("scores numeric visa-free days against trip duration", () => {
    assert.equal(scoreRequirement("90", 10), 100);
    assert.equal(scoreRequirement("15", 10), 100);
    assert.equal(scoreRequirement("10", 10), 100);
    assert.equal(scoreRequirement("9", 10), 85);
    assert.equal(scoreRequirement("-1", 10), 100);
  });

  it("returns 50 for missing or unknown requirements", () => {
    assert.equal(scoreRequirement(undefined, 10), 50);
    assert.equal(scoreRequirement("covid ban", 10), 50);
  });
});

describe("formatVisaRequirementText", () => {
  it("describes visa required destinations", () => {
    assert.equal(
      formatVisaRequirementText("Lebanon", "visa required"),
      "Visa required in advance for Lebanon nationals."
    );
  });

  it("describes numeric visa-free allowances", () => {
    assert.equal(
      formatVisaRequirementText("United States", "90"),
      "Visa-free for United States nationals for up to 90 days."
    );
  });

  it("describes entry restrictions between countries", () => {
    assert.equal(
      formatVisaRequirementText("Armenia", "no admission"),
      "Entry restricted for Armenia nationals."
    );
  });
});

describe("averageVisaScoreForDestination", () => {
  it("scores visa required entry for a destination", () => {
    const lookup = {
      "Lebanon|Portugal": "visa required",
    };

    assert.equal(averageVisaScoreForDestination(lookup, "Portugal", 10), 75);
  });

  it("scores visa-free entry for a destination", () => {
    const lookup = {
      "Germany|Portugal": "visa free",
    };

    assert.equal(averageVisaScoreForDestination(lookup, "Portugal", 10), 100);
  });

  it("scores no admission between countries that cannot visit each other", () => {
    const lookup = {
      "Armenia|Azerbaijan": "no admission",
    };

    assert.equal(averageVisaScoreForDestination(lookup, "Azerbaijan", 10), 20);
    assert.equal(scoreRequirement("no admission", 10), 20);
  });

  it("returns 50 when no pairs exist", () => {
    assert.equal(averageVisaScoreForDestination({}, "Portugal", 10), 50);
  });
});
