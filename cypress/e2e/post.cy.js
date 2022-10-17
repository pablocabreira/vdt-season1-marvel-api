/// <reference types="Cypress" />

describe('POST /characters', () => {

    it('deve cadastrar um personagem', () => {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character).then((response) => {
            expect(response.status).to.eql(201)
            expect(response.body.character_id.length).to.eql(24)
        })
    })

    context('quando o personagem já existe', () => {
        const character = {
            name: 'T\'Challa',
            alias: 'Pantera Negra',
            team: ['vingadores'],
            active: true
        }

        beforeEach(() => {
            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(201)
                })
        })

        it('então não deve cadastrar duplicado', () => {
            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        })
    })
})