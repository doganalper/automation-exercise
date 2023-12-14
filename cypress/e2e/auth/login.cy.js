describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('a[href="/login"]').click();

    cy.contains("Login to your account").should("be.visible");

    cy.fixture("validUser").as("user");
  });

  context("Valid Cases", () => {
    it("should login with valid user", () => {
      cy.get("@user").then((user) => {
        cy.fillLogin({
          email: user.email,
          password: user.password
        })

        cy.contains(`Logged in as ${user.name}`).should("exist");
      });
    });
  });

  context("Invalid Cases", () => {
    it("should show error message on empty email", () => {
      cy.get("@user").then((user) => {
        cy.fillLogin({
          password: user.password
        })

        cy.get("input[data-qa='login-email']").validationControl({
          should: "equal",
          value: "Please fill out this field.",
        });
      });
    });

    it("should show error message on empty password", () => {
      cy.get("@user").then((user) => {
        cy.fillLogin({
          email: user.email
        })

        cy.get("input[data-qa='login-password']").validationControl({
          should: "equal",
          value: "Please fill out this field.",
        });
      });
    });

    it("should show error message on invalid email format", () => {
      cy.get("@user").then((user) => {
        const invalidEmailFormat = "valid-mockatmail.com";
        cy.fillLogin({
          email: invalidEmailFormat,
          password: user.password
        });

        cy.get("input[data-qa='login-email']").validationControl({
          should: "contain",
          value: `'${invalidEmailFormat}' is missing an '@'.`,
        });
      });
    });

    it("should show error message on invalid user email login", () => {
      const invalidEmail = "invalid-mock@mail.com";
      cy.get("@user").then((user) => {
        cy.fillLogin({
          email: invalidEmail,
          password: user.password
        });

        cy.contains("Your email or password is incorrect!").should("exist");
      });
    });

    it("should show error message on invalid user password login", () => {
      const invalidPassword = "invalid-mock-password";
      cy.get("@user").then((user) => {
        cy.fillLogin({
          email: user.email,
          password: invalidPassword
        })

        cy.contains("Your email or password is incorrect!").should("exist");
      });
    });
  });
});
