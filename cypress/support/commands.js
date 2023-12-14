Cypress.Commands.add(
  "validationControl",
  { prevSubject: true },
  (subject, options) => {
    const shouldOptions = ["equal", "contain"];
    if (!shouldOptions.includes(options.should)) {
      throw new Error(
        `Invalid should (${
          options.should
        }), must be one of ${shouldOptions.join(", ")}`,
      );
    }

    cy.wrap(subject)
      .invoke("prop", "validationMessage")
      .should(options.should, options.value);
  },
);

Cypress.Commands.add("fillLogin", (options) => {
  const { email, password } = options;

  if (email) {
    cy.get("input[data-qa='login-email']").type(email);
  }

  if (password) {
    cy.get("input[data-qa='login-password']").type(password);
  }

  cy.get("button[data-qa='login-button']").click();
});
