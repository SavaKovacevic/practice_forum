describe('Send and receive private message', () => {
//CAN BE PREFORMED EVERY 3 MINUTES BECAUSE OF STARTING CONVERSATION LIMITATION
  it('Start conversation', () => {
    cy.intercept('POST', 'https://forum.benchmark.rs/conversations/add',).as('addConversation');

    //NAVIGATE TO PRIVATE MESSAGES
    cy.login('Machinery349', 'test1234!')
    cy.get('.p-navgroup-link--conversations').eq(0).click()
    cy.get('.menu--right .menu-footer-main .listInline a').contains('Prikazati sve').click({force:true})
    
    //START CONVERSATION
    cy.get('span').contains('Započnite prepisku').click()
    cy.get('input.select2-search__field').type('Machinery348')
    cy.get('.select2-results__option > strong').contains('Machinery348').click()
    cy.get('input.input--title').type('Test message', {delay: 0})
    cy.get('.fr-element').click().type('Test')
    cy.get('span.button-text').contains('Započnite prepisku').click()
    cy.wait('@addConversation').then((response) => {
        const { statusCode, body } = response.response
        expect(statusCode).equal(200)
      })
    cy.get('.p-body-header > div > h1').should('be.visible').and('contain', 'Test message')
  })

  it('Confirm that message is received', () => {
    cy.login('Machinery348', 'test1234!').should(() => {
        expect(localStorage.getItem('xf___crossTab')).to.contain('"conversations_unread":"1"');
        expect(localStorage.getItem('xf___crossTab')).to.contain('"total_unread":"1"');
        });
    cy.get('.p-navgroup-link--conversations').eq(0).click()
    cy.get('.menu--right .menu-footer-main .listInline a').contains('Prikazati sve').click({force:true})
    cy.get('.structItem--conversation').should('have.length', 1)
    cy.get('.structItem-title').eq(0).should('contain', 'Test message')

    //CLEAR CONVERSATION
    cy.get('.structItemContainer .structItem .structItem-cell:nth-child(2) a').contains('Test message').click()
    cy.get('span').contains('Napustite').click()
    cy.get('.overlay-content form .block-container .formSubmitRow .formSubmitRow-main .formSubmitRow-controls button').contains('Napustite').click()
    cy.get('.structItem--conversation').should('not.exist')
  })
})