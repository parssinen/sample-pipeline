import { Selector } from "testcafe";

fixture`Sample Pipeline frontpage`.page`http://localhost:3001`;

test("Register a testuser", async t => {
    await t
        .click(Selector("a").withAttribute("data", "register"))
        .typeText(Selector('input').withAttribute('data', 'username'), 'Testuser')
        .typeText(Selector('input').withAttribute('data', 'email'), 'test@tes.ti')
        .typeText(Selector('input').withAttribute('data', 'password'), 'Testpassword')
        .click(Selector('button').withAttribute('data', 'submit'))
});

test('Login as Testuser', async t => {
    await t
        .click(Selector("a").withAttribute("data", "login"))
        .typeText(Selector('input').withAttribute('data', 'username-login'), 'Testuser')
        .typeText(Selector('input').withAttribute('data', 'password-login'), 'Testpassword')
        .click(Selector("button").withAttribute("data", "submit"))
        .expect(Selector("a").withAttribute("data", "logout")).ok()
})