import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MockERC20Module = buildModule("MockERC20Module", (m) => {
  const mockERC20 = m.contract("MockERC20");

  return { mockERC20 };
});

export default MockERC20Module;
