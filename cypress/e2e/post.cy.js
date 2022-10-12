/// <reference types="Cypress" />

describe('POST /characters', () => {

    before(() => {
        cy.request({
            method: 'POST',
            url: '/sessions',
            body: {
                email: 'cabreir@gmail.com',
                password: 'shazam'
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            cy.log(response.body.token)
            Cypress.env('token', response.body.token)
        })
    })


    it('Deve cadastrar um personagem', () => {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.request({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
        })

    })
})