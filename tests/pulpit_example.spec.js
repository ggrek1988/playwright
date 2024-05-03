import { test, expect } from "@playwright/test";

test.describe("pulpit tests --another example", () => {
	test.skip("correct transfer to Michael Scott", async ({ page }) => {
		// Login
		await page.goto("https://demo-bank.vercel.app/");
		await page.getByTestId("login-input").fill("sgfbrghs");
		await page.getByTestId("password-input").fill("sergsger");
		await page.getByTestId("login-button").click();
		// Transfer Person preparation
		await page.locator("#widget_1_transfer_receiver").selectOption("3");
		// solution 1: good:
		await expect
			.soft(page.locator("#widget_1_transfer_receiver"))
			.toContainText("Michael Scott");
		// solution 2: good:
		await expect
			.soft(
				page.locator(
					"#uniform-widget_1_transfer_receiver > span:nth-child(1)"
				)
			)
			.toHaveText("Michael Scott");
		// solution 3: good:
		await expect
			.soft(
				page.locator(
					"#widget_1_transfer_receiver > option:nth-child(4)"
				)
			)
			.toHaveText("Michael Scott");
		// solution 4: not good - we skip auto-wait mechanism built in construction 'await expect(locator)':
		const options = page.locator("#widget_1_transfer_receiver > option");
		const elementNumber3 = options.nth(3);
		console.log("elementNumber3:", elementNumber3); // returns: Locator@#widget_1_transfer_receiver > option >> nth=3
		const elementNumber3Text = await elementNumber3.innerText();
		console.log("elementNumber3Text:", elementNumber3Text); // returns: Michael Scott
		// but we can write it also like this in assertion (but it may be hard to debug!)
		expect.soft(await options.nth(3).innerText()).toEqual("Michael Scott");
		// ---------------------------------------------------------------------------
		const element = page.locator("#widget_1_transfer_receiver");
		console.log("element:", element);
		console.log(await element.textContent()); // returns all the text from the element
		const element0 = page.locator("#widget_1_transfer_receiver")[0];
		console.log("element0:", element0); // returns undefined!
		const arrayOfLocators = page.locator("#widget_1_transfer_receiver");
		const elementsCount = await arrayOfLocators.count();
		console.log("elementsCount:", elementsCount); // returns 1 - because there is only one element of that type!
		// but:
		const arrayOfLocatorsReal = page.locator(
			"#widget_1_transfer_receiver > option"
		);
		const arrayOfLocatorsRealElementsCount =
			await arrayOfLocatorsReal.count();
		console.log(
			"arrayOfLocatorsRealElementsCount:",
			arrayOfLocatorsRealElementsCount
		); // returns 4 - because there are 4 options in the select!
		// other option is to use nth-child:
		const optionWithMichaelScott = page.locator(
			"#widget_1_transfer_receiver > option:nth-child(4)"
		);
		// why 4rth? because it's the 4th option in the select:
		// wybierz odbiorcę przelewu
		// Jan Demobankowy
		// Chuck Demobankowy
		// Michael Scott
		console.log(
			"optionWithMichaelScott textContent:",
			await optionWithMichaelScott.textContent()
		); // returns Michael Scott
		console.log(
			"optionWithMichaelScott innerText:",
			optionWithMichaelScott.innerText
		); // return [AsyncFunction: innerText]
		// ---------------------------------------------------------------------------
		// Amount entering
		await page.locator("#widget_1_transfer_amount").fill("111");
		// Transfer title
		await page.locator("#widget_1_transfer_title").fill("account transfer");
		// Confirmation button
		await page.getByRole("button", { name: "wykonaj" }).click();
		// Messages
		await expect(page.locator("#show_messages")).toHaveText(
			"Przelew wykonany! Michael Scott - 111,00PLN - account transfer"
		);
		// Close the pop-up
		await page.getByTestId("close-button").click();
	});
});
