const technicalDebtService = require(
  "./src/services/technicalDebt/technicalDebt.service"
);

async function test() {
  const result =
    await technicalDebtService.analyzeTechnicalDebt(
      "mayurCoder2004",
      "chefmate",
      "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"
    );

  console.log(
    JSON.stringify(result, null, 2)
  );
}

test();