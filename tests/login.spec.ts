import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("User login to Demobank", () => {
	let loginPage: LoginPage;
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		loginPage = new LoginPage(page);
	});

	test("successful login with correct credentials @login", async ({
		page,
	}) => {
		// Arrange
		const userId = loginData.userId;
		const userPassword = loginData.userPassword;
		const expectedUserName = "Jan Demobankowy";

		//Act
		await loginPage.login(userId, userPassword);

		// Assert
		await expect(page.getByTestId("user-name")).toHaveText(
			expectedUserName
		);
	});

	test("unsuccessful login with too short username @login", async ({
		page,
	}) => {
		// Arrange
		const incorrectUserId = "Test10";
		const expectedErrorMessage = "identyfikator ma min. 8 znaków";

		//Act
		await loginPage.loginInput.fill(incorrectUserId);
		await loginPage.passwordInput.click();

		// Assert
		await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
	});

	test("unsuccessful login with too short password @login", async ({
		page,
	}) => {
		// Arrange
		const userId = loginData.userId;
		const incorrectUserPassword = "123";
		const expectedErrorMessage = "hasło ma min. 8 znaków";

		//Act
		await loginPage.loginInput.fill(userId);
		await loginPage.passwordInput.fill(incorrectUserPassword);
		await loginPage.passwordInput.blur();

		// Assert
		await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
	});
});
