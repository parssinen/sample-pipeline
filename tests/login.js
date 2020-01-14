import {
    Selector
} from 'testcafe';

fixture `Basic testing`
    .page `http://localhost:3001/login`;

test('Test login', async t => {
    await t
    Selector('div').withAttribute('dataId', 'username').typeText('Testuser')
    Selector('div').withAttribute('dataId', 'password').typeText('Testpassword')
        .click('#login')

    // Use the assertion to check if the actual header text is equal to the expected one
    // .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});