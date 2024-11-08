const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server.js"); // Adjust the path to your server file
const TrekCollection = require("../../models/trekschema");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /api/treks/name/:name", () => {
    it("should return treks based on name", async () => {
        const response = await request(app)
            .get("/api/treks/name/Bera Rajasthan");
        
        expect(response.status).toBe(200); // Expect status 200
        expect(response.body).toBeDefined(); // Expect response body to be defined
        // Add more assertions based on the actual response structure
    });
});

describe("GET /api/treks/location/:location", () => {
    it("should return treks based on location", async () => {
        const response = await request(app)
            .get("/api/treks/location/Rajasthan");
        
        expect(response.status).toBe(200); // Expect status 200
        expect(response.body).toBeDefined(); // Expect response body to be defined
        // Add more assertions based on the actual response structure
    });
});

describe("GET /api/treks/type/:type", () => {
    it("should return treks based on type", async () => {
        const response = await request(app)
            .get("/api/treks/type/Village");
        
        expect(response.status).toBe(200); // Expect status 200
        expect(response.body).toBeDefined(); // Expect response body to be defined
        // Add more assertions based on the actual response structure
    });
});

describe("GET /api/treks/:name/:location/:type/:id", () => {
    it("should return 404 for invalid trek ID", async () => {
        const response = await request(app)
            .get("/api/treks/Bera Rajasthan/Rajasthan/Village/9999"); // Assuming 9999 is an invalid ID
        
        expect(response.status).toBe(404); // Expect status 404
        expect(response.body).toBeDefined(); // Expect response body to be defined
        // Add more assertions based on the actual response structure
    });
});

describe("GET /api/treks/random", () => {
    it("should return a random sample of treks", async () => {
        const response = await request(app)
            .get("/api/treks/random");
        
        expect(response.status).toBe(200); // Expect status 200
        expect(response.body).toBeDefined(); // Expect response body to be defined
        // Add more assertions based on the actual response structure
    });
});

describe("GET /api/treks/top-rated", () => {
    it("should return top-rated treks", async () => {
        const response = await request(app)
            .get("/api/treks/top-rated");
        
        expect(response.status).toBe(200); // Expect status 200
        expect(response.body).toBeDefined(); // Expect response body to be defined
        // Add more assertions based on the actual response structure
    });
});

describe("GET /api/treks/high-low", () => {
    it("should return treks sorted by rating (high to low)", async () => {
        const response = await request(app)
            .get("/api/treks/high-low");
        
        expect(response.status).toBe(200); // Expect status 200
        expect(response.body).toBeDefined(); // Expect response body to be defined
        // Add more assertions based on the actual response structure
    });
});

describe("GET /api/treks/low-high", () => {
    it("should return treks sorted by rating (low to high)", async () => {
        const response = await request(app)
            .get("/api/treks/low-high");
        
        expect(response.status).toBe(200); // Expect status 200
        expect(response.body).toBeDefined(); // Expect response body to be defined
        // Add more assertions based on the actual response structure
    });
});


describe("GET /api/treks/:name/:location/:type/:id", () => {
    it("should return treks based on search criteria for all dataset entries", async () => {
        const treks = await TrekCollection.find(); // Fetch all entries from the dataset

        for (const trek of treks) {
            const response = await request(app)
                .get(`/api/treks/${trek.name}/${trek.location}/${trek.type}/${trek.id}`);
            
            expect(response.status).toBe(200); // Expect status 200
            expect(response.body).toBeDefined(); // Expect response body to be defined
            // Add more assertions based on the actual response structure
        }
    }, 30000); // Increase the timeout to 30 seconds
});
