import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("pulpit tests", () => {
	let loginPage: LoginPage;
	let pulpitPage: PulpitPage;
	test.beforeEach(async ({ page }) => {
		const userId = loginData.userId;
		const userPassword = loginData.userPassword;

		await page.goto("/");
		loginPage = new LoginPage(page);
		pulpitPage = new PulpitPage(page);
		await loginPage.loginInput.fill(userId);
		await loginPage.passwordInput.fill(userPassword);
		await loginPage.loginButton.click();
	});

	test("quick payment with correct data @pulpit", async ({ page }) => {
		// Arrange

		const receiverId = "2";
		const transferAmount = "100";
		const transferTitle = "zwrot";
		const expectedTransferReceiver = "Chuck Demobankowy";

		//Act
		pulpitPage.executePayment(receiverId, transferAmount, transferTitle);

		// Assert
		await expect(pulpitPage.dialogContent).toHaveText(
			` Przelew wykonany!Odbiorca: ${expectedTransferReceiver}Kwota: ${transferAmount},00PLN Nazwa: ${transferTitle}`
		);

		//Act
		await pulpitPage.closeButton.click();

		// Assert
		await expect(pulpitPage.messageText).toHaveText(
			`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
		);
	});

	test("mobile top-up @pulpit", async ({ page }) => {
		// Arrange
		const amount = "30";
		const phoneNumber = "500 xxx xxx";
		const expectedTextMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phoneNumber}`;

		//Act
		await pulpitPage.executeQuickPayment(phoneNumber, amount);

		// Assert
		await expect(pulpitPage.messageText).toHaveText(expectedTextMessage);
	});

	test("correct after successful mobile top-up @pulpit", async ({ page }) => {
		// Arrange
		const amount = "30";
		const phoneNumber = "500 xxx xxx";
		const initialBalance = await pulpitPage.moneyValueText.innerText();

		const expectedBalance = Number(initialBalance) - Number(amount);

		//Act
		await pulpitPage.executeQuickPayment(phoneNumber, amount);

		// Assert
		await expect(pulpitPage.moneyValueText).toHaveText(
			`${expectedBalance}`
		);
	});
});
