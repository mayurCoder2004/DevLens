const analysisQueue = require("./queues/analysis.queue");

async function testQueue() {
  console.log("Adding test job...");

  const job = await analysisQueue.add("analyze-repository", {
    repositoryId: "cmqfi2elj0011uzf4acrjvfyf",
  });

  console.log("Job added successfully!");
  console.log("Job ID:", job.id);

  process.exit(0);
}

testQueue().catch(console.error);
