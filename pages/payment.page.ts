import { Page } from "playwright";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
	constructor(private page: Page) {}

	sideMenu = new SideMenuComponent(this.page);

	transferReceiverInput = this.page.getByTestId("transfer_receiver");
	formAccountToInput = this.page.getByTestId("form_account_to");
	formAmountInput = this.page.getByTestId("form_amount");
	transferButton = this.page.getByRole("button", { name: "wykonaj przelew" });
	closeButton = this.page.getByTestId("close-button");
	showMessages = this.page.locator("#show_messages");

	async makeTransfer(
		transferReceiver: string,
		transferAccount: string,
		transferAmount: string
	): Promise<void> {
		await this.transferReceiverInput.fill(transferReceiver);
		await this.formAccountToInput.fill(transferAccount);
		await this.formAmountInput.fill(transferAmount);
		await this.transferButton.click();
		await this.closeButton.click();
	}
}
