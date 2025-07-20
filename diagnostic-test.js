// Quick diagnostic test for scraping backend timeout issues
const fetch = require("node-fetch");

async function testScrapingBackend() {
	console.log("🔍 Testing Scraping Backend Connectivity...\n");

	// Test 1: Health check
	console.log("1. Health Check Test:");
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

		const response = await fetch("http://localhost:3001/api/platforms", {
			signal: controller.signal,
		});
		clearTimeout(timeoutId);

		if (response.ok) {
			console.log("✅ Health check passed");
		} else {
			console.log("❌ Health check failed:", response.status);
		}
	} catch (error) {
		console.log("❌ Health check error:", error.message);
	}

	// Test 2: Simple search request with timeout
	console.log("\n2. Simple Search Test (30s timeout):");
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

		const startTime = Date.now();
		const response = await fetch("http://localhost:3001/api/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				platform: "kickstarter",
				keyword: "tech",
				language: "en",
				enableOCR: false,
			}),
			signal: controller.signal,
		});
		clearTimeout(timeoutId);

		const endTime = Date.now();
		const duration = endTime - startTime;

		console.log(`⏱️ Request completed in ${duration}ms`);

		if (response.ok) {
			const data = await response.json();
			console.log("✅ Search test passed");
			console.log(`📊 Results: ${data.count || 0} items found`);
		} else {
			console.log("❌ Search test failed:", response.status);
			const errorText = await response.text();
			console.log("Error details:", errorText);
		}
	} catch (error) {
		if (error.name === "AbortError") {
			console.log("❌ Search test timed out after 30 seconds");
		} else {
			console.log("❌ Search test error:", error.message);
		}
	}

	// Test 3: Check if backend is overloaded
	console.log("\n3. Backend Status Check:");
	try {
		const response = await fetch("http://localhost:3001/api/status");
		if (response.ok) {
			const status = await response.json();
			console.log("✅ Backend status:", status);
		} else {
			console.log("⚠️ No status endpoint available");
		}
	} catch (error) {
		console.log("⚠️ Could not check backend status");
	}
}

testScrapingBackend()
	.then(() => {
		console.log("\n🏁 Diagnostic complete");
		process.exit(0);
	})
	.catch((error) => {
		console.error("💥 Diagnostic failed:", error);
		process.exit(1);
	});
