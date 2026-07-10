import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "@/test/setupDom";
import { act, renderHook } from "@testing-library/react";

import { useTravelForm } from "@/hooks/useTravelForm";
import { DEFAULT_PREFERENCES } from "@/lib/constants";

describe("useTravelForm nationality", () => {
  it("clears prioritizeVisaFriendlyDestinations when nationality is cleared", () => {
    const { result } = renderHook(() =>
      useTravelForm({
        ...DEFAULT_PREFERENCES,
        nationality: "Germany",
        prioritizeVisaFriendlyDestinations: true,
      })
    );

    assert.equal(result.current.preferences.nationality, "Germany");
    assert.equal(
      result.current.preferences.prioritizeVisaFriendlyDestinations,
      true
    );

    act(() => {
      result.current.setNationality("");
    });

    assert.equal(result.current.preferences.nationality, undefined);
    assert.equal(
      result.current.preferences.prioritizeVisaFriendlyDestinations,
      undefined
    );
  });
});
