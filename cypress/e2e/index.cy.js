it('baselayout is correct', () => {
    const page = cy.visit("/");
    page.get('title').should('have.text', 'Astro')
  });