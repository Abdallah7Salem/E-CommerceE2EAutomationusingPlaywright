const {test, expect} = require ("@playwright/test");

test('E-Commerce Web App Registration', async ({browser}) => {

    // Open a new browser
    const context = await browser.newContext();
    // Open a new page
    const page = await context.newPage();

    // Navigate to the e-commerce website
    await page.goto("https://rahulshettyacademy.com/client/");

    // Locate the "Register here" link
    const registerHere = page.locator(".text-reset");
    // Click the register here link
    await registerHere.click();

    // Locate the first name textbox
    const firstName = page.locator("#firstName");
    await firstName.fill("Abdallah");

    // Locate the last name textbox
    const lastName = page.locator("#lastName");
    await lastName.fill("Kandil");

    // Locate the email textbox
    const email = page.locator("#userEmail");
    await email.fill("kofade6219@decodewp.com");

    // Locate the phone number textbox
    const phoneNumber = page.locator("#userMobile");
    await phoneNumber.fill("1112223334");

    // Locate the occupation dropdown
    const occupationDropdown = page.locator(".custom-select");
    await occupationDropdown.selectOption("Engineer");

    // Locate the gender radio button (male)
    const maleRadioBtn = page.getByRole('radio', { name: 'Male' }).first();
    await maleRadioBtn.check();

    // Locate the password textbox
    const password = page.locator("#userPassword");
    await password.fill("Manual&AutomationTest5");

    // Locate the confirm password textbox
    const confirmPassword = page.locator("#confirmPassword");
    await confirmPassword.fill("Manual&AutomationTest5");

    // Locate the 18 years checkbox 
    const ageCheckbox = page.getByRole('checkbox');
    await ageCheckbox.check();

    // Locate the register button
    const registerBtn = page.locator("#login");
    await registerBtn.click();

});

test.only('E2E Scenario for Purchasing an Item', async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the login page
    await page.goto("https://rahulshettyacademy.com/client/");

    // Locate the email textbox
    const email = page.locator("#userEmail");
    await email.fill("kofade6219@decodewp.com");

    // Locate the password textbox
    const password = page.locator("#userPassword");
    await password.fill("Manual&AutomationTest5");

    // Locate the login button
    const loginBtn = page.locator("#login");
    await loginBtn.click();

    // Add IPHONE 13 PRO to Cart
    const iphoneAddToCartBtn = page.locator('.card-body', {hasText: 'IPHONE 13 PRO'}).getByText(" Add To Cart");
    await iphoneAddToCartBtn.click();

    // Click the cart 
    const cartBtn = page.locator("//button[@routerlink = '/dashboard/cart']");
    await cartBtn.click();

    // Verify the product is in the cart
    await expect(page.getByText('IPHONE 13 PRO')).toBeVisible();

    // Click the checkout button
    const checkoutBtn = page.getByRole('button', { name: /Checkout/i });
    await checkoutBtn.click();

    // Verify the product name and quantity in the checkout page
    await expect(page.getByText('IPHONE 13 PRO')).toBeVisible();
    await expect(page.getByText('Quantity: 1')).toBeVisible();

    // Enter Payment Details
    const cardNumber = page.locator("input.input.txt.text-validated").nth(0);
    await cardNumber.fill("4542 9931 9292 2293");

    const shippingEmailInfo = page.locator("input.input.txt.text-validated").nth(1);
    await shippingEmailInfo.fill("kofade6219@decodewp.com");

    const expirtyMonth = page.locator('.input.ddl').nth(0);
    await expirtyMonth.selectOption("07");

    const expiryYear = page.locator('.input.ddl').nth(1);
    await expiryYear.selectOption("29");

    const cvvCode = page.locator("input.input.txt").nth(1);
    await cvvCode.fill("354");

    const nameOnCard = page.locator("input.input.txt").nth(2);
    await nameOnCard.fill("Abdallah Kandil");

    const applyCouponTextBox = page.locator("input[name='coupon']");
    await applyCouponTextBox.fill("rahulshettyacademy");

    const applyCouponBtn = page.locator('[type="submit"]');
    await applyCouponBtn.click();

    const selectCountry = page.locator("input[placeholder='Select Country']");
    await selectCountry.fill("Egypt");
    await selectCountry.press('Backspace');

    const suggestedCountry = page.getByText('Egypt');
    await suggestedCountry.waitFor();
    await suggestedCountry.click();

    // Verify that Coupon has been Applied
    await expect(page.getByText('* Coupon Applied')).toBeVisible();

    // Click Place Order Button
    const placeOrderBtn = page.locator(".btnn.action__submit.ng-star-inserted");
    await placeOrderBtn.click();

    // Verify the thanks message
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();

    // Capture the order ID into a variable
    var orderID = await page.locator("label.ng-star-inserted").textContent();
    orderID = orderID.slice(2, -2).trim();
    console.log(orderID);

    // Go to orders history page
    const ordersHistoryPage = page.locator("label[routerlink='/dashboard/myorders']");
    await ordersHistoryPage.click();

    // Verify that orderID is in the orders history page
    await expect(page.getByText(orderID)).toBeVisible();

    // Click view button for the order
    const orderRow = page.locator('tr', {hasText: orderID});
    await orderRow.getByRole('button', {name: 'View'}).click();

    // Verify Order Name and OrderID are in the view page
    await expect(page.getByText('IPHONE 13 PRO')).toBeVisible();
    await expect(page.getByText(orderID)).toBeVisible();

});