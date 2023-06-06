import request from 'supertest';
import { testServer } from '../utils/testServer.js';

const app = testServer();

describe('Routes', () => {
    describe('GET/employees', async () => {
        const res = await request(app).get('/employees');
        expect(res.statusCode).toBe(200);
    })
})

