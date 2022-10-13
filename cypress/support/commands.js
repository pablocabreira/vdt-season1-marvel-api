/// <reference types="Cypress" />

Cypress.Commands.add('back2ThePast', () => {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/6346c5ba39fde300169bd8a4',
        failOnStatusCode: false
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
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    })
})


Cypress.Commands.add('postCharacter', (playLoad) => {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: playLoad,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('getCharacters', () => {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('searchCharacters', (characterName) => {
    cy.api({
        method: 'GET',
        url: '/characters',
        qs: {name: characterName},
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('populateCharacters', (characters) => {
    characters.forEach((i) => {
        cy.postCharacter(i)
    })
})