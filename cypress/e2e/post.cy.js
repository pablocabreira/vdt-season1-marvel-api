/// <reference types="Cypress" />

describe('POST /characters', () => {

    before(() => {
        cy.back2ThePast()
        cy.setToken()
    })


    it('Deve cadastrar um personagem', () => {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.api({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then((response) => {
            expect(response.status).to.eql(201)
        })

    })
})