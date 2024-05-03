import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Payment tests", () => {
	let loginPage: LoginPage;
	let paymentPage: PaymentPage;
	test.beforeEach(async ({ page }) => {
		const userId = loginData.userId;
		const userPassword = loginData.userPassword;
		loginPage = new LoginPage(page);
		paymentPage = new PaymentPage(page);

		await page.goto("/");
		await loginPage.login(userId, userPassword);
		await paymentPage.sideMenu.paymentButton.click();
	});
	test("simple payment @payment", async ({ page }) => {
		// Arrange
		const transferReceiver = "Jan Nowak";
		const transferAccount = "12 3456 7890 1234 5678 9012 34568";
		const transferAmount = "222";
		const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;
		// Act
		await paymentPage.makeTransfer(
			transferReceiver,
			transferAccount,
			transferAmount
		);
		// Assert
		await expect(paymentPage.showMessages).toHaveText(expectedMessage);
	});
});
