const bun = 'Флюоресцентная булка'
const secondBun = 'Краторная булка'
const host = 'http://localhost:3000/stellar-burgers'

describe('template spec', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(host);
    });

    it('pass open modal', () => {
        cy.contains(bun).click();
    });

    it('pass ingredient-info modal', () => {
        cy.contains(bun).click();
        cy.get('#modal').contains(bun);
    });

    it('pass closing modal', () => {
        cy.contains(bun).click();
        cy.get('#closeBtnModal').click();
    });

    it('pass DnD', () => {
        cy.contains(secondBun).trigger('dragstart');
        cy.contains('Выберите булку')
            .trigger('dragenter')
            .trigger('dragover')
            .trigger('drop');
    });

    it('pass open order modal', () => {
        cy.contains(secondBun).trigger('dragstart');
        cy.contains('Выберите булку')
            .trigger('dragenter')
            .trigger('dragover')
            .trigger('drop');

        cy.contains('Соус Spicy-X').trigger('dragstart');
        cy.get('#ingredientDnD')
            .trigger('dragenter')
            .trigger('dragover')
            .trigger('drop');
        cy.contains('Оформить заказ').click();
        cy.get('input').first().type('marsel_vagizov@bk.ru');
        cy.get('input').last().type('1234567');
        cy.get('button').click();
        cy.contains('Оформить заказ').click();
        cy.contains('идентификатор заказа');
    });
});