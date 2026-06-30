const analysisQueue = require("./queues/analysis.queue");

async function testQueue() {
  console.log("Adding test job...");

  const job = await analysisQueue.add(
    "analyze-repository",
    {
      repositoryId: "repo-123",
      userId: "user-456",
    }
  );

  console.log("Job added successfully!");
  console.log("Job ID:", job.id);

  process.exit(0);
}

testQueue().catch(console.error);