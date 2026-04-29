import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi API Discover Events MERN",
        description: "Lorem ipsum dolor sit amet"
    },
    servers: [
        {
            url: "http://localhost:5000/api",
            description: "Local Server"
        },
        {
            url: "https://discover-events-mern-backend.vercel.app/api",
            description: "Production Server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            LoginRequest: {
                identifier: "admin",
                password: "Admin123"
            }
        }
    }
}

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
