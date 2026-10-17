const test = require("node:test");
const assert = require("node:assert");

const BASE_URL = "http://localhost:5000";

test("Backend server should be running", async () => {
  const response = await fetch(BASE_URL);

  assert.strictEqual(response.status, 200);
});

test("Receipt API should reject request without token", async () => {
  const response = await fetch(
    `${BASE_URL}/api/receipts/all`
  );

  const data = await response.json();

  assert.strictEqual(response.status, 401);
  assert.strictEqual(data.message, "Access token required");
});

test("Admin API should reject request without token", async () => {
  const response = await fetch(
    `${BASE_URL}/api/admin/test`
  );

  const data = await response.json();

  assert.strictEqual(response.status, 401);
  assert.strictEqual(data.message, "Access token required");
});