describe('api mocking', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*', {
            statusCode: 200,
            body:
                {
                    id: 25,
                    name: 'pikachu',
                    sprites: {
                        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
                    },
                    base_experience: 142,
                    height: 10,
                    weight: 120
                },
        });
    })

    it('should display details and close after click', () => {
        cy.get('[data-cy="search-input"]')
            .type('25')
            .type('{enter}')
        cy.get('[data-cy="details"]')
        cy.get('[data-cy="details-title"]')
            .should('contain', 'pikachu')
        cy.get('[data-cy="c-details__media"]')
            .should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png')
        cy.get('[data-cy="c-details__body"]')
            .should('contain', 'Erfahrung: 142 Punkte')
            .and('contain', 'Größe: 10 cm')
            .and('contain', 'Gewicht: 120 g')
        cy.get('[data-cy="details-btn"]')
            .click()
        cy.get('[data-cy="details-close"]')
            .click()
        cy.get('[data-cy="watchlist-icon"]')
            .click()
        cy.get('[data-cy="watchlist-item"]')
            .should('contain', 'pikachu')
            .find('img').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png')
            .click()
        cy.get('[data-cy="details"]')
        cy.get('[data-cy="details-title"]')
            .should('contain', 'pikachu')
        cy.get('[data-cy="c-details__media"]')
            .should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png')
        cy.get('[data-cy="c-details__body"]')
            .should('contain', 'Erfahrung: 142 Punkte')
            .and('contain', 'Größe: 10 cm')
            .and('contain', 'Gewicht: 120 g')
        cy.get('[data-cy="details-close"]')
            .click()
        cy.get('[data-cy="watchlist-item-close"]')
            .click()
        !cy.get('[data-cy="watchlist"]')
    });
});
