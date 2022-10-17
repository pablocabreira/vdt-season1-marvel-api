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
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', () => {
        cy.getCharacters().then((response) => {
            expect(response.status).be.eql(200)
            expect(response.body).to.have.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve buscar personagem por nome', () => {
        cy.searchCharacters(characters[1].name).then((response) => {
            expect(response.body[0].name).to.eql(characters[1].name)
            expect(response.body[0].alias).to.eql(characters[1].alias)
            expect(response.body[0].team).to.eql(characters[1].team)
        })
    })
})

describe('GET /characters/id', () => {
    const tonyStark = {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: ['vingadores'],
        active: true
    }

    context('quando tenho um personagem cadastrado', () => {
        before(() => {
            cy.postCharacter(tonyStark).then((response) => {
                Cypress.env('id', response.body.character_id)
            })
        })

        it('deve buscar pelo id', () => {
            const id = Cypress.env('id')
            cy.getCharactersById(id).then((response) => {
                expect(response.status).be.eql(200)
                expect(response.body.name).be.eql(tonyStark.name)
                expect(response.body.alias).be.eql(tonyStark.alias)
                expect(response.body.team).be.eql(tonyStark.team)
            })
        })
    })

    it('retorna 404 ao buscar id não cadastrado', () => {
        const id = '6348b7796ed2161ccc0a98dc' // https://nddapp.com/object-id-generator.html utilizei este site para gerar o id fictício
        cy.getCharactersById(id).then((response) => {
            expect(response.status).be.eql(404)
        })
    })
})