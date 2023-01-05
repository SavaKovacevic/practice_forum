import registration from '../pageObjects/registrationInput';

describe('User registration', () => {
    beforeEach(() => {
        cy.visit('https://www.srbijaforum.com/');
    })

  it('Registration fails', () => {
    const date = new Date();
    let time = date.getTime();

    const input = new registration()

    cy.contains('Registruj se').click();

    //EMAIL FAILS
    cy.get('#account-email-validation').should('not.be.visible')
    cy.get('#username-validation').should('not.be.visible')
    cy.get('#password-validation').should('not.be.visible')
    //email
    cy.get('#new-account-email').type('Machinery349', {delay: 0})
    cy.get('#account-email-validation').should('be.visible').and('contain', 'Molimo vas unesite važeću email adresu.')
    //user name
    cy.get('#new-account-username').type('sava' + time, {delay: 0})
    cy.get('#username-validation').should('be.visible').and('contain', 'Vaše korisničko ime je dostupno.')
    //password
    cy.get('#new-account-password').type('test1234', {delay: 0})
    cy.get('#password-validation').should('be.visible').and('contain', 'Vaša lozinka izgleda dobro.')

    input.checkAllFields();
    cy.contains('Kreiraj novi nalog').click()
    cy.get('#account-email-validation').should('be.visible').and('contain', 'Molimo vas unesite važeću email adresu.')

    //USER NAME FAILS
    //email
    cy.get('#new-account-email').clear().type('sava' + time + '@gmail.com', {delay: 0})
    cy.get('#account-email-validation').should('be.visible').and('contain', ' Poslat ćemo vam email kako biste ga potvrdili.')
    //username
    cy.get('#new-account-username').clear().type('Machinery349', {delay: 0})
    cy.get('#username-validation').should('be.visible').and('contain', 'Not available.')

    input.checkAllFields();
    cy.contains('Kreiraj novi nalog').click()
    cy.get('#username-validation').should('be.visible').and('contain', 'Not available.')

    //PASSWORD FAILS
    //username
    cy.get('#new-account-username').clear().type('sava' + time, {delay: 0})
    cy.get('#username-validation').should('be.visible').and('contain', 'Vaše korisničko ime je dostupno.')
    //password
    cy.get('#new-account-password').clear().type('test', {delay: 0})
    cy.get('#password-validation').should('be.visible').and('contain', ' Vaša lozinka je prekratka.')

    input.checkAllFields();
    cy.contains('Kreiraj novi nalog').click()
    cy.get('#password-validation').should('be.visible').and('contain', ' Vaša lozinka je prekratka.')
  })

  it('Registration successful', () => {
    const date = new Date();
    let time = date.getTime();

    const input = new registration()

    cy.contains('Registruj se').click();

    cy.intercept('GET', 'https://www.srbijaforum.com/u/account-created',).as('accountCreated');

    cy.get('#new-account-email').type('sava' + time + '@gmail.com', {delay: 0})
    cy.get('#account-email-validation').should('be.visible').and('contain', ' Poslat ćemo vam email kako biste ga potvrdili.')

    cy.get('#new-account-username').type('sava' + time, {delay: 0})
    cy.get('#username-validation').should('be.visible').and('contain', 'Vaše korisničko ime je dostupno.')

    cy.get('#new-account-password').type('test1234', {delay: 0})
    cy.get('#password-validation').should('be.visible').and('contain', 'Vaša lozinka izgleda dobro.')

    input.checkAllFields();
    cy.contains('Kreiraj novi nalog').click()

    cy.wait('@accountCreated').then((response) => {
        const { statusCode, body } = response.response
        expect(statusCode).equal(200)
      })

    cy.get('.login-title').should('be.visible').and('contain', 'Dobrodošli na Srbija Forum!')
  })
})