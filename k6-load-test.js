import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "30s", target: 20 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.1"],
  },
};

const BASE_URL = "http://localhost:8080";

export function setup() {
  const res = http.post(
    `${BASE_URL}/api/auth/login`,
    JSON.stringify({ username: "admin", password: "admin123" }),
    { headers: { "Content-Type": "application/json" } },
  );
  return { token: res.json("token") };
}

export default function (data) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
    "Content-Type": "application/json",
  };

  // Test 1 - Health check
  const health = http.get(`${BASE_URL}/actuator/health`);
  check(health, { "health status 200": (r) => r.status === 200 });

  // Test 2 - Listar spots
  const spots = http.get(`${BASE_URL}/api/spots`, { headers });
  check(spots, {
    "spots status 200": (r) => r.status === 200,
    "spots tiempo < 2s": (r) => r.timings.duration < 2000,
  });

  // Test 3 - Login bajo carga
  const login = http.post(
    `${BASE_URL}/api/auth/login`,
    JSON.stringify({ username: "admin", password: "admin123" }),
    { headers: { "Content-Type": "application/json" } },
  );
  check(login, { "login bajo carga 200": (r) => r.status === 200 });

  sleep(1);
}
