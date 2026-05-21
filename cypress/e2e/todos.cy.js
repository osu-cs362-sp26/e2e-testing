it("creates a todo", function () {
    cy.visit("/")
    cy.findByPlaceholderText("Enter a To-Do")
        .type("Add a new todo")
    cy.findByRole("button", { name: "Add To-Do" }).click()
    cy.findByText("Add a new todo").should("exist")
})

it("completes a todo", function () {
    cy.visit("/")
    cy.addTodo("Add a todo with custom text")
    cy.toggleTodoCompleted("Add a todo with custom text")
    cy.findByTestId("completed-todos")
        .should("contain", "Add a todo with custom text")
    cy.findByTestId("incomplete-todos")
        .should("not.contain", "Add a todo with custom text")
})

it("deletes a todo", function () {
    cy.visit("/")
    cy.addTodo("Delete this todo")
    cy.toggleTodoCompleted("Delete this todo")
    cy.archiveCompletedTodo("Delete this todo")
    cy.findByRole("link", { name: "Archive" }).click()
    cy.deleteArchivedTodo("Delete this todo")
    cy.document().its("body").should("not.contain", "Delete this todo")
    cy.findByRole("link", { name: "Home" }).click()
    cy.document().its("body").should("not.contain", "Delete this todo")
})
