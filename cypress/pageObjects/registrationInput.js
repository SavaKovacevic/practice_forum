class registration {
    checkAllFields() {
        return cy
          .get('input.ember-text-field')
          .each($el => {
            cy.wrap($el);
            cy.get($el).invoke('val').should('not.be.empty');
          });
      }
  }
  
  export default registration;
  