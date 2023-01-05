import threadSelection from '../pageObjects/selectThread';

describe('Following threads', () => {

//DAY IN YEAR
  beforeEach(() => {
    cy.login('Machinery349', 'test1234!')
  })

  it('Follow and unfollow thread and check if it is properly saved', () => {
    const thread = new threadSelection();
    
    //VISIT FORUM
    thread.selectForum('a[href*="/forums/mobilni-telefoni.180/"]')
    thread.selectForum('a[href*="/forums/apple.181/"]')

    //VISIT THREAD 1
    thread.selectThread(2)
    //first thread page 1
    cy.get('.pageNav-main').first().children('.pageNav-page:first-child').click()

    //FOLLOW THREAD 1
    cy.url().then(link => {
        cy.intercept('POST', link + '/watch',).as('threadFirst');
        cy.contains('Pratite').click()
        cy.get('.formSubmitRow-controls button span').contains('Pratite').click()
        cy.wait('@threadFirst').then((response) => {
            const { body } = response.response
            expect(body.status).equal('ok')
            expect(body.message).equal('Vaše izmene su sačuvane.')
        })
    })

    cy.go('back')

    //VISIT THREAD 1
    thread.selectThread(3)
    //visit thread page 1
    cy.get('.pageNav-main').first().children('.pageNav-page:first-child').click()

    //FOLLOW THREAD 2
    cy.url().then(link => {
        cy.intercept('POST', link + '/watch',).as('threadSecond');
        cy.contains('Pratite').click()
        cy.get('.formSubmitRow-controls button span').contains('Pratite').click()
        cy.wait('@threadSecond').then((response) => {
            const { body } = response.response
            expect(body.status).equal('ok')
            expect(body.message).equal('Vaše izmene su sačuvane.')
        })
    })

    //VISIT FOLLOWED THREADS PAGE AND CONFIRM THREAD ARE ADDED TO FOLLOWED
    cy.contains('Praćene teme').click()
    cy.get('.structItem--thread').should('have.length', 2)

    //REMOVE FOLLOWED THREADS AND CONFIRM THERE ARE NO FOLLOWED THREADS
    cy.get('span').contains('Uređivanje praćenih tema').click()
    cy.get('a').contains('Prekinite praćenje teme').click()
    cy.get('form .formSubmitRow-controls button[type="submit"] span.button-text').contains('Nastavite').click()

    cy.get('.structItem--thread').should('not.exist')
    cy.get('.blockMessage > p').should('be.visible').and('contain', 'Vi ne pratite nijednu temu.')
  })
})