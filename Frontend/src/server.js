import { createServer, Model, Response } from "miragejs";
import { nanoid } from "nanoid"; // for generating unique IDs

createServer({
    models: {
        reservation: Model,
        facility: Model,
        user: Model
    },

    seeds(server) {
        // Creating some initial facilities
        server.create("facility", { id: "1", name: "Auditorium", capacity: 200, hasProjector: true });
        server.create("facility", { id: "2", name: "Conference Room", capacity: 50, hasProjector: true });
        server.create("facility", { id: "3", name: "Outdoor Field", capacity: 500, hasProjector: false });

        // Creating some initial reservations
        server.create("reservation", {
            id: "3mFBDqlGGpWTKjodhWGSJ",
            date: "2024-06-01",
            time: "10:00",
            motive: "Tech Talk",
            club: "IEEE",
            facilityId: "1",
            state: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        server.create("reservation", {
            id: "E8eKXvVCXUKct77lgnsml",
            date: "2024-06-01",
            time: "10:00",
            motive: "Tech Talk",
            club: "IEEE",
            facilityId: "2",
            state: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        server.create("reservation", {
            id: nanoid(),
            date: "2024-06-05",
            time: "14:00",
            motive: "Workshop",
            club: "ACM",
            facilityId: "3",
            state: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        // Creating users
        server.create("user", { id: "123", email: "admin@uni.com", password: "admin123", role: "admin" });
        server.create("user", { id: "124", email: "user@uni.com", password: "user123", role: "user" });
    },

    routes() {
        this.namespace = "api";
        this.logging = false;
        this.timing = 1000;

        // Get all reservations
        this.get("/reservations", (schema, request) => {
            return schema.reservations.all();
        });

        // Get reservation by ID
        this.get("/reservations/:id", (schema, request) => {
            const id = request.params.id;
            return schema.reservations.find(id);
        });

        // Update reservation state
        this.put("/reservations/:id", (schema, request) => {
            const id = request.params.id;
            const newAttrs = JSON.parse(request.requestBody);
            const reservation = schema.reservations.find(id);

            console.log(newAttrs); // Vérifiez que les nouvelles attributs sont correctement reçues
            
            if (!reservation) {
                // If reservation with the given ID is not found, return a 404 response
                return new Response(404, {}, { message: "Reservation not found" });
            }
        
            // Update the reservation attributes
            reservation.update({
                ...newAttrs,
                updatedAt: new Date().toISOString()
            });
        
            // Return the updated reservation
            return reservation;
        });
        
        // Login route
        /*this.post("/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody);
            const foundUser = schema.users.findBy({ email, password });

            if (!foundUser) {
                return new Response(401, {}, { message: "No user with those credentials found!" });
            }

            foundUser.password = undefined;
            return {
                user: foundUser,
                token: "mock-token"
            };
        });*/
    }
});
