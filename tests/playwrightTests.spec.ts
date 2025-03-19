import { test, expect } from '@playwright/test';

test.describe('Saucedemo Playwright Testing', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/')
    })
});



// Cypress:
// describe("Test Case 1", () => {
//     const users = [
//       { username: "standard_user", password: "secret_sauce", shouldLogin: true },
//       { username: "locked_out_user", password: "secret_sauce", shouldLogin: false, error: "Sorry, this user has been locked out." },
//       { username: "problem_user", password: "secret_sauce", shouldLogin: true },
//       { username: "performance_glitch_user", password: "secret_sauce", shouldLogin: true },
//       { username: "error_user", password: "secret_sauce", shouldLogin: true },
//       { username: "visual_user", password: "secret_sauce", shouldLogin: true }
//     ];
  
//     users.forEach(user => {
//       it(`Login  ${user.username}`, () => {
//         cy.login(user.username, user.password);
//         if (user.shouldLogin) {
//           cy.url().should("include", "/inventory.html");
//         } else {
//           cy.get("[data-test='error']").should("contain", user.error);
//         }
//       });
//     });
  
//     it("Empty username and correct password", () => {
//       cy.visit("https://www.saucedemo.com/");
//       cy.get('[data-test="password"]').type('secret_sauce');
//       cy.get('[data-test="login-button"]').click();
//       cy.get('[data-test="title"]').should('be.visible');
//     });
  
//     it("Correct username and empty password", () => {
//       cy.visit("https://www.saucedemo.com/");
//       cy.get('[data-test="username"]').type('standart_user');
//       cy.get('[data-test="login-button"]').click();
//       cy.get('[data-test="title"]').should('be.visible');
//     });
  
//     it("Empty username and password", () => {
//       cy.visit("https://www.saucedemo.com/");
//       cy.get('[data-test="login-button"]').click();
//       cy.get('[data-test="title"]').should('be.visible');
//     });
//   });




  
  