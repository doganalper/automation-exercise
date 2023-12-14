describe("Signup", () => {
  const mockName = "Mock Name";

  before(() => {
    cy.clearCookies();
    cy.visit("/");
    cy.get('a[href="/login"]').click();

    cy.contains("New User Signup!").should("be.visible");
  });

  context("Register User", { testIsolation: false }, () => {
    context("first phase", () => {
      it("should pass to second phase", () => {
        const rand = crypto.randomUUID();
        cy.get("input[data-qa='signup-name']").type(mockName);

        cy.get("input[data-qa='signup-email']").type(`mock_${rand}@mail.com`);

        cy.get("button[data-qa='signup-button']").click();

        cy.contains("New User Signup!").should("not.exist");
      });
    });

    context("second phase", () => {
      context("account information", () => {
        it("should set non-checked inputs", () => {
          // Password
          cy.get("input[data-qa='password']").type("Mock_password1");

          // Day
          cy.get("select[data-qa='days']").select("15");

          // Month
          cy.get("select[data-qa='months']").select("April");

          // Year
          cy.get("select[data-qa='years']").select("1997");
        });

        it("should set gender", () => {
          cy.get("input[value='Mr']").click().should("be.checked");
          cy.get("input[value='Mrs']").should("not.be.checked");
        });

        it("should have same name as previously entered name", () => {
          cy.get("input[data-qa='name']").should("have.value", mockName);
        });

        it("should not have same name after changing", () => {
          const newName = "Changed Name";
          cy.get("input[data-qa='name']").clear().type(newName);
          cy.get("input[data-qa='name']").should("not.have.value", mockName);
        });
      });

      context("address information", () => {
        it("should set non-checked inputs", () => {
          // First Name
          cy.get("input[data-qa='first_name']").type("Changed");

          // Last Name
          cy.get("input[data-qa='last_name']").type("Name");

          // Address
          cy.get("input[data-qa='address']").type("Mock Address 123");

          // Country
          cy.get("select[data-qa='country']").select("Canada");

          // State
          cy.get("input[data-qa='state']").type("Quebec");

          // City
          cy.get("input[data-qa='city']").type("Quebec");

          // Zipcode
          cy.get("input[data-qa='zipcode']").type("141414");

          // Mobile Number
          cy.get("input[data-qa='mobile_number']").type("250-555-0199");
        });

        it("should create user", () => {
          cy.get("button[data-qa='create-account']")
            .click()
            .get("[data-qa='account-created']")
            .should("exist");
        });
      });
    });
  });
});
