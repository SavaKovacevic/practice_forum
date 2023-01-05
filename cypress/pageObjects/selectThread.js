class threadSelection {
    selectForum(selector) {
        return cy.get(selector).click()
    }

    //GET NUMBER OF POSTS
    getPostsNumber(index) {
        return cy.get('.pairs').eq(index).children('dd')
    }

    //SELECT YHREAD
    selectThread(index) {
        cy.get('.structItem-title > a').eq(index).click()
    }
  }
  
  export default threadSelection;
  