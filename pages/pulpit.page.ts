import { Page } from "playwright";
import { SideMenuComponent } from "../components/side-menu.component";

export class PulpitPage {
	constructor(private page: Page) {}

	sideMenu = new SideMenuComponent(this.page);

	transferReceiverSelector = this.page.locator("#widget_1_transfer_receiver");
	transferAmountInput = this.page.locator("#widget_1_transfer_amount");
	transferTitleInput = this.page.locator("#widget_1_transfer_title");
	executeButton = this.page.getByRole("button", { name: "wykonaj" });

	dialogContent = this.page.locator(
		".hide.ui-dialog-content.ui-widget-content p"
	);
	closeButton = this.page.getByTestId("close-button");
	messageText = this.page.getByTestId("message-text");

	topupReceiverSelect = this.page.locator("#widget_1_topup_receiver");
	topUpAmountInput = this.page.locator("#widget_1_topup_amount");
	topUpAgreementButton = this.page.locator("input#widget_1_topup_agreement");
	topUpAccountButton = this.page.getByRole("button", {
		name: "doładuj telefon",
	});

	moneyValueText = this.page.locator("#money_value");

	async executePayment(
		receiverId: string,
		transferAmount: string,
		transferTitle: string
	): Promise<void> {
		await this.transferReceiverSelector.selectOption(receiverId);
		await this.transferAmountInput.fill(transferAmount);
		await this.transferTitleInput.fill(transferTitle);
		await this.executeButton.click();
	}

	async executeQuickPayment(
		phoneNumber: string,
		amount: string
	): Promise<void> {
		await this.topupReceiverSelect.selectOption(phoneNumber);
		await this.topUpAmountInput.fill(amount);
		await this.topUpAgreementButton.click();
		await this.topUpAccountButton.click();
		await this.closeButton.click();
	}
}
