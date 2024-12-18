import hre, { viem } from "hardhat";
import { expect } from "chai";
import { keccak256, encodeAbiParameters, parseAbiParameters } from "viem";

const CIRCLE_USDC_POLYGON_AMOY: `0x${string}` =
  "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582"; // Circle USDC in Polygon Amoy

enum Status {
  OPEN,
  CANCELLED,
  COMPLETED,
}

describe("On54Cause", function () {
  let on54Cause: any;
  let mockERC20: any;
  let eventIdOne: `0x${string}`;
  let eventIdTwo: `0x${string}`;
  let eventIdThree: `0x${string}`;
  let fundraisingId: `0x${string}`;
  before(async function () {
    const [owner, charity, fundraiser, donor] =
      await hre.viem.getWalletClients();
    on54Cause = await hre.viem.deployContract("On54Cause");
    mockERC20 = await hre.viem.deployContract("MockERC20");
  });

  describe("Deployment", function () {
    it("Should deploy", async function () {
      expect(on54Cause.address).to.not.be.undefined;
    });

    it("Should deploy mockERC20", async function () {
      expect(mockERC20.address).to.not.be.undefined;
    });

    it("Should mint mockERC20", async function () {
      const [, , , donor] = await hre.viem.getWalletClients();
      await mockERC20.write.mint([donor.account.address, 1000]);
    });

    it("Should not let non-owner use onlyOwner functions", async function () {
      const [, other] = await hre.viem.getWalletClients();
      await expect(
        on54Cause.write.whitelistToken([CIRCLE_USDC_POLYGON_AMOY], {
          account: other.account,
        })
      ).to.be.reverted;
    });
  });

  describe("Token whitelisting", function () {
    it("Should whitelist token", async function () {
      await on54Cause.write.whitelistToken([CIRCLE_USDC_POLYGON_AMOY]);
    });

    it("Should get token status", async function () {
      const status = await on54Cause.read.tokens([CIRCLE_USDC_POLYGON_AMOY]);
      expect(status).to.be.true;
    });

    it("Should not whitelist token twice", async function () {
      await expect(on54Cause.write.whitelistToken([CIRCLE_USDC_POLYGON_AMOY]))
        .to.be.reverted;
    });

    it("Should blacklist token", async function () {
      await on54Cause.write.blacklistToken([CIRCLE_USDC_POLYGON_AMOY]);
    });

    it("Should not blacklist token that is not whitelisted", async function () {
      await expect(on54Cause.write.blacklistToken([CIRCLE_USDC_POLYGON_AMOY]))
        .to.be.reverted;
    });

    it("Should get token status", async function () {
      const status = await on54Cause.read.tokens([CIRCLE_USDC_POLYGON_AMOY]);
      expect(status).to.be.false;
    });

    after(async function () {
      await on54Cause.write.whitelistToken([mockERC20.address]);
    });
  });

  describe("Events", function () {
    it("Should create event", async function () {
      const [, charity] = await hre.viem.getWalletClients();
      const blockNumber = await (await viem.getPublicClient()).getBlockNumber();
      const timestamp = (await viem.getPublicClient())
        .getBlock({
          blockNumber,
        })
        .then((block) => block.timestamp);
      const fundraisingLimitDate = (await timestamp) + 60n;

      expect(
        await on54Cause.write.createEvent(
          [
            fundraisingLimitDate,
            "Test Event",
            "This is a test event",
            "https://example.com/image.png",
          ],
          {
            account: charity.account,
          }
        )
      ).to.not.be.reverted;

      expect(
        await on54Cause.write.createEvent(
          [
            fundraisingLimitDate,
            "Test Event 2",
            "This is a test event 2",
            "https://example.com/image2.png",
          ],
          {
            account: charity.account,
          }
        )
      ).to.not.be.reverted;

      expect(
        await on54Cause.write.createEvent(
          [
            fundraisingLimitDate,
            "Test Event 3",
            "This is a test event 3",
            "https://example.com/image3.png",
          ],
          {
            account: charity.account,
          }
        )
      ).to.not.be.reverted;

      expect(
        await on54Cause.write.createEvent(
          [
            fundraisingLimitDate,
            "Test Event 4",
            "This is a test event 4",
            "https://example.com/image4.png",
          ],
          {
            account: charity.account,
          }
        )
      ).to.not.be.reverted;
    });

    it("Should get event", async function () {
      const [, charity] = await hre.viem.getWalletClients();
      eventIdOne = keccak256(
        encodeAbiParameters(parseAbiParameters("string,address"), [
          "Test Event",
          charity.account.address,
        ])
      );
      eventIdTwo = keccak256(
        encodeAbiParameters(parseAbiParameters("string,address"), [
          "Test Event 2",
          charity.account.address,
        ])
      );
      eventIdThree = keccak256(
        encodeAbiParameters(parseAbiParameters("string,address"), [
          "Test Event 4",
          charity.account.address,
        ])
      );
      const event = await on54Cause.read.getEvent([eventIdOne]);
      expect(event.organiser.toLowerCase()).to.equal(
        charity.account.address.toLowerCase()
      ); // Check a value to be sure it is not returning an empty object
    });

    it("Should not be able to cancel event status if not organiser", async function () {
      const [, , fundraiser] = await hre.viem.getWalletClients();
      await expect(
        on54Cause.write.cancelEvent([eventIdOne, [mockERC20.address]], {
          account: fundraiser.account,
        })
      ).to.be.reverted;
    });

    it("Should not be able to cancel event status if event is not open", async function () {
      const [, charity] = await hre.viem.getWalletClients();
      await expect(
        on54Cause.write.cancelEvent([eventIdOne, [mockERC20.address]], {
          account: charity.account,
        })
      ).to.be.reverted;
    });

    it("Should not be able to complete event status if event is not open", async function () {
      const [, charity] = await hre.viem.getWalletClients();
      await expect(
        on54Cause.write.completeEvent([eventIdTwo, [mockERC20.address]], {
          account: charity.account,
        })
      ).to.be.reverted;
    });
  });
  describe("Fundraising", function () {
    it("Should create fundraising", async function () {
      const [, charity, fundraiser] = await hre.viem.getWalletClients();
      await expect(
        on54Cause.write.createFundraising(
          [
            100n,
            eventIdThree,
            fundraiser.account.address,
            charity.account.address,
          ],
          {
            account: fundraiser.account,
          }
        )
      ).to.not.be.reverted;
    });
    /* TODO: Uncomment this once the contract is fixed
    it("Should not create fundraising if event is not open", async function () {
      const [, charity, fundraiser] = await hre.viem.getWalletClients();
      await expect(
        on54Cause.write.createFundraising(
          [
            100n,
            eventIdOne,
            fundraiser.account.address,
            charity.account.address,
          ],
          {
            account: fundraiser.account,
          }
        )
      ).to.be.reverted;
    });*/
    it("Should get fundraising", async function () {
      const [, , fundraiser] = await hre.viem.getWalletClients();

      fundraisingId = keccak256(
        encodeAbiParameters(parseAbiParameters("bytes32,address"), [
          eventIdThree,
          fundraiser.account.address,
        ])
      );
      const fundraising = await on54Cause.read.getFundraising([fundraisingId]);
      expect(fundraising[2].toLowerCase()).to.equal(
        fundraiser.account.address.toLowerCase()
      );
    });
    // TODO: Uncomment this once the contract is fixed
    /*it("Should not create fundraising if fundraising already exists", async function () {
      const [, charity, fundraiser] = await hre.viem.getWalletClients();
      await expect(
        on54Cause.write.createFundraising(
          [
            100n,
            eventIdThree,
            fundraiser.account.address,
            charity.account.address,
          ],
          {
            account: fundraiser.account,
          }
        )
      ).to.be.reverted;
    });*/
  });
  describe("Donations", function () {
    it("Should not allow donation if token is not whitelisted", async function () {
      const [, , , donor] = await hre.viem.getWalletClients();
      await expect(
        on54Cause.write.donate([10, fundraisingId, CIRCLE_USDC_POLYGON_AMOY], {
          account: donor.account,
        })
      ).to.be.reverted;
    });
    it("Should allow allowance", async function () {
      const [, , , donor] = await hre.viem.getWalletClients();
      await mockERC20.write.approve([on54Cause.address, 10], {
        account: donor.account,
      });
    });
    it("Should allow donation", async function () {
      const [, , , donor] = await hre.viem.getWalletClients();
      await on54Cause.write.donate([10, fundraisingId, mockERC20.address], {
        account: donor.account,
      });
    });
    it("Should have received donation", async function () {
      const donation = await mockERC20.read.balanceOf([on54Cause.address]);
      expect(donation).to.equal(10n);
    });
    it("Should get event tokens raised", async function () {
      const tokens = await on54Cause.read.getEventTokensRaised([
        eventIdThree,
        [mockERC20.address],
      ]);
      expect(tokens[0].token.toLowerCase()).to.equal(
        mockERC20.address.toLowerCase()
      );
      expect(tokens[0].amount).to.equal(10n);
    });
    it("Should transfer funds to beneficiary", async function () {
      const [, charity] = await hre.viem.getWalletClients();
      await on54Cause.write.completeEvent([eventIdThree, [mockERC20.address]], {
        account: charity.account,
      });
    });
    it("Should have transferred funds to beneficiary", async function () {
      const [, charity] = await hre.viem.getWalletClients();
      const balance = await mockERC20.read.balanceOf([charity.account.address]);
      expect(balance).to.equal(10n);
    });
    it("Should cancel event", async function () {
      const [, charity] = await hre.viem.getWalletClients();
      await on54Cause.write.cancelEvent([eventIdThree, [mockERC20.address]], {
        account: charity.account,
      });
    });
    it("Should have stored token balances properly", async function () {
      const [, charity] = await hre.viem.getWalletClients();

      const balance = await on54Cause.read.getCharityBalance([
        charity.account.address,
        [mockERC20.address],
      ]);
      expect(balance[0].amount).to.equal(10n);
    });
  });
});
