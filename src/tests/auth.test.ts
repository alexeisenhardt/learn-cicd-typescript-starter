import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  test("returns null when no authorization header is provided", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null for malformed header without ApiKey prefix", () => {
    expect(getAPIKey({ authorization: "Bearer token123" })).toBeNull();
  });

  test("returns null when ApiKey prefix is present but no key follows", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  test("returns the api key for a valid ApiKey header", () => {
    expect(getAPIKey({ authorization: "ApiKey my-secret-key" })).toBe(
      "my-secret-key",
    );
  });
});
