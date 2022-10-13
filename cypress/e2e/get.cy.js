/// <reference types="Cypress" />

describe('GET /characters', () => {

    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['x-men', 'illuminatis'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['novos vingadores'],
            active: true
        }
    ]

    before(() => {
        cy.back2ThePast()
        cy.setToken()
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', () => {
        cy.getCharacters().then((response) => {
            expect(response.status).be.eql(200)
            expect(response.body).to.have.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it.only('deve buscar personagem por nome', () => {
        cy.searchCharacters(characters[1].name).then((response) => {
            expect(response.body[0].name).to.eql(characters[1].name)
            expect(response.body[0].alias).to.eql(characters[1].alias)
            expect(response.body[0].team).to.eql(characters[1].team)
        })
    })
})