/// <reference types="Cypress" />

Cypress.Commands.add('back2ThePast', () => {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/6346c5ba39fde300169bd8a4'
    }).then((response) => {
        expect(response.status).to.eql(200)
    })
})

Cypress.Commands.add('setToken', () => {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'cabreir@gmail.com',
            password: 'shazam'
        }
    }).then((response) => {
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    })
})