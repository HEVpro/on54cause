import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const On54CauseModule = buildModule("On54CauseModule", (m) => {
  const on54Cause = m.contract("On54Cause");

  return { on54Cause };
});

export default On54CauseModule;
