describe("Environment", () => {
  test("should load test environment", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });
});