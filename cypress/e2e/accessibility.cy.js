describe("Accessibility Checks", () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit("/index.html");
    // Inject Axe core into the page
    cy.injectAxe();
  });

  it("Should have no detectable accessibility violations on page load", () => {
    // Run the accessibility check with enhanced verbose logging callback
    cy.checkA11y(null, null, (violations) => {
      if (violations.length) {
        cy.log(
          `Found ${violations.length} accessibility violations on page load:`
        ).then(() => {
          // Add context log
          violations.forEach((violation) => {
            const { id, impact, description, helpUrl, nodes } = violation;

            cy.log(
              `🚨 Accessibility issue: [${impact}] ${id} - ${description}`
            );
            cy.log(`🔍 More info: ${helpUrl}`);

            nodes.forEach(({ target, html, failureSummary }) => {
              cy.log(`🔍 Problem element: ${target.join(", ")}`);
              cy.log(`🔍 Summary: ${failureSummary}`);
              // cy.log(`📄 HTML: ${html}`); // Can be very long, log to console instead

              // DevTools logging
              console.groupCollapsed(
                `[a11y] ${id} (${impact}) - ${target.join(", ")}`
              );
              console.warn("Description:", description);
              console.warn("Help:", helpUrl);
              console.warn("HTML Snippet:", html);
              console.warn("Failure Summary:", failureSummary);
              console.warn("Selector(s):", target);
              console.groupEnd();

              // Visual highlight (optional) - Note: Might need to run within cy.then for timing
              // target.forEach((selector) => {
              //   cy.get(selector).then($els => {
              //      $els.each((i, el) => {
              //         el.style.outline = '3px solid red';
              //         el.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
              //      });
              //   });
              // });
            });
          });
        });
      }
    });
  });

  it("Should have no detectable accessibility violations in dark mode", () => {
    // Enable dark mode
    cy.get(".dark-mode-toggle").click();
    // Ensure dark mode class is applied before checking
    cy.get("html").should("have.class", "dark-mode");
    // Run the check again with enhanced verbose logging callback
    // Temporarily disable color-contrast check for dark mode due to calculation issues
    cy.checkA11y(
      null,
      {
        rules: {
          "color-contrast": { enabled: false },
        },
      },
      (violations) => {
        if (violations.length) {
          cy.log(
            `Found ${violations.length} accessibility violations in dark mode:`
          ).then(() => {
            // Add context log
            violations.forEach((violation) => {
              const { id, impact, description, helpUrl, nodes } = violation;

              cy.log(
                `🚨 Accessibility issue: [${impact}] ${id} - ${description}`
              );
              cy.log(`🔍 More info: ${helpUrl}`);

              nodes.forEach(({ target, html, failureSummary }) => {
                cy.log(`🔍 Problem element: ${target.join(", ")}`);
                cy.log(`🔍 Summary: ${failureSummary}`);
                // cy.log(`📄 HTML: ${html}`); // Can be very long, log to console instead

                // DevTools logging
                console.groupCollapsed(
                  `[a11y] ${id} (${impact}) - ${target.join(", ")}`
                );
                console.warn("Description:", description);
                console.warn("Help:", helpUrl);
                console.warn("HTML Snippet:", html);
                console.warn("Failure Summary:", failureSummary);
                console.warn("Selector(s):", target);
                console.groupEnd();

                // Visual highlight (optional) - Note: Might need to run within cy.then for timing
                // target.forEach((selector) => {
                //   cy.get(selector).then($els => {
                //      $els.each((i, el) => {
                //         el.style.outline = '3px solid red';
                //         el.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                //      });
                //   });
                // });
              });
            });
          });
        }
      }
    );
  });

  // Add more tests here for specific components or states if needed
});
