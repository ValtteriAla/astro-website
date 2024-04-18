it("logo is correct", () => {
  const page = cy.visit("/");
  page
    .get("header nav a img")
    .should("have.attr", "src", "blog-placeholder-about.jpg");
});

it("click all links", () => {
  const page = cy.visit("/");

  const pages = ["/", "/blog", "/about", "/frameworks"];

  for (let url of pages) {
    page.get(`header nav .internal-links a[href="${url}"]`).click();
    console.log(cy.url())
    cy.url().should("have.string", url);
  }
});
