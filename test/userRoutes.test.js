const request = require("supertest");
const app = require("../src/app"); // Update the correct path to your app.js file

describe("Employee API Endpoints", () => {
    it("should return paginated employees", async () => {
        const res = await request(app).get("/employees?page=1&limit=2");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
