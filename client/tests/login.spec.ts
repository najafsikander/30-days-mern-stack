import { test, expect } from "playwright-test-coverage";

test("open login page", async ({ page }) => {
    await page.goto("http://localhost:5173/auth/login");
    const loginHeading = page.getByRole("heading", { name: "Login" }).first();

    console.log("Login heading: ", loginHeading);
    expect(loginHeading).toBeTruthy()

    await page.getByPlaceholder("Email").fill("najafsikander23@gmail.com");
    await page.getByPlaceholder("Password").fill("1234567890");

    await page.getByRole("button",{name:"Login"}).click();
    const pageUrl = page.url();
    console.log("Page URL: ", pageUrl);
    await page.waitForURL("http://localhost:5173")
});