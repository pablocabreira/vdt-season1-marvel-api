/// <reference types="Cypress" />

describe('DELETE /characters/id', () => {
    const tochaHumana = {
        name: 'Jhonny Storm',
        alias: 'Tocha Humana',
        team: ['quarteto fantástico'],
        active: true
    }

    before(() => {
        cy.back2ThePast()
        cy.setToken()
    })

    context('quando tenho um personagem cadastrado', () => {
        before(() => {
            cy.postCharacter(tochaHumana).then((response) => {
                Cypress.env('id', response.body.character_id)
            })
        })

        it('deve permitir excluir pelo id', () => {
            const id = Cypress.env('id')
            cy.deleteCharactersById(id).then((response) => {
                expect(response.status).be.eql(204)
            })
        })

        after(() => {
            const id = Cypress.env('id')
            cy.deleteCharactersById(id).then((response) => {
                expect(response.status).be.eql(404)
            })
        })
    })

    it('retorna 404 ao excluir id não cadastrado', () => {
        const id = '6348b7796ed2161ccc0a98dc' // https://nddapp.com/object-id-generator.html utilizei este site para gerar o id fictício
        cy.deleteCharactersById(id).then((response) => {
            expect(response.status).be.eql(404)
        })
    })
})