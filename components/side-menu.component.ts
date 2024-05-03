import { Page } from "playwright";

export class SideMenuComponent {
	constructor(private page: Page) {}

	paymentButton = this.page.getByRole("link", { name: "płatności" });
}
