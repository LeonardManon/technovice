import { PrismaClient } from '@prisma/client';
import { expect } from 'chai';
import request from 'supertest';
import { createTestCourse } from '../../fixtures.js';

const prisma = new PrismaClient();

describe('GET /api/courses/', () => {
   
    before(async () => {
        await prisma.courses.deleteMany(); // Nettoyer la base de données de test
        await createTestCourse(); // Insérer des données de test 
    });
    it('should succeed if courses is found', async function ()  {
        const response = await request(this.app)
            .get('/api/courses')
            .set('Accept', 'application/json')
            .expect(200);

            // Vérifie que la réponse est un tableau
            expect(response.body).to.be.an('array');

            // Vérifie que le tableau contient au moins un objet
            expect(response.body.length).to.be.greaterThan(0);

        // Vérifie que chaque élément est un objet avec les clés attendues
        response.body.forEach(course => {
        
            expect(course).to.be.an('object').with.all.keys(
                "course_id", "course_title", "course_desc", "course_tags", 
                "course_content", "author_user_id", "creation_date", "update_date"
            );
            expect(course.course_id).not.to.be.null;
            expect(course.course_title).to.be.a("string");
            expect(course.course_desc).to.be.a("string");
            expect(course.course_tags).to.be.an("array").that.has.lengthOf(2);
            expect(course.course_content).to.be.a("string");
            expect(course.author_user_id).to.be.a("number");
            
        });
        
    });
});

