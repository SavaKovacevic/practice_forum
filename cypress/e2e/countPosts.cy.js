import threadSelection from '../pageObjects/selectThread';

describe('Number of posts', () => {

//DAY IN YEAR
let now = new Date();
let start = new Date(now.getFullYear(), 0, 0);
let diff = now - start;
let oneDay = 1000 * 60 * 60 * 24;
let day = Math.floor(diff / oneDay);

  beforeEach(() => {
    cy.login('Machinery349', 'test1234!')
  })

  it('Check if number of posts is greater current day number', () => {
    const thread = new threadSelection();

    //SELECT FORUM
    thread.selectForum('a[href*="/forums/informacije-o-forumu.95/"]')

    //GET NUMBER OF POSTS
    thread.getPostsNumber(0).then(numberOfPosts => {
      let posts = numberOfPosts.text();
      cy.wrap(posts).as('posts')
    });

    //COMPARE NUMBER OF DAYS AND NUMBER OF POSTS
    cy.get('@posts').then(posts => {
      expect(day).to.be.lessThan(Number(posts))
    });
  })

  it('Count posts and check if number of posts is greater current day number', () => {
    const thread = new threadSelection();

    //SELECT FORUM
    thread.selectForum('a[href*="/forums/informacije-o-forumu.95/"]')

    //GET NUMBER OF POSTS
    thread.getPostsNumber(0).then(numberOfPosts => {
      let posts = numberOfPosts.text();
      cy.wrap(posts).as('posts')
    });

    //SELECT THREAD
    thread.selectThread(0)

    //COUNT POSTS IN THREAD
    let countOfPosts = 0
    cy.get('.pageNav-main:first .pageNav-page').each(($el, index) => {
      cy.get('.pageNav-page').eq(index).click()
      cy.get('.message--post').then($elements => {
        countOfPosts += $elements.length;
        cy.wrap(countOfPosts).as('postsCounted')
      })
    })

    //COMPARE POSTS NUMBER, COUNTED POSTS NUMBER AND DAY
    cy.get('@postsCounted').then(postsCounted => {
        expect(day).to.be.lessThan(Number(postsCounted) - 1)
        cy.get('@posts').then(info => {
            expect(Number(info)).to.eql((Number(postsCounted) - 1))
        })
     })
  })
})