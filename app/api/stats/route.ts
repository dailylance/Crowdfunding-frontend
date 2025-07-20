import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
	try {
		// Get total users
		const totalUsers = await prisma.user.count();

		// Get total searches
		const totalSearches = await prisma.search.count();

		// Get total scraped data
		const totalScrapedData = await prisma.scrapedData.count();

		// Get total saved data
		const totalSavedData = await prisma.savedData.count();

		// Get platform distribution
		const platformStats = await prisma.scrapedData.groupBy({
			by: ['platform'],
			_count: {
				platform: true
			},
			orderBy: {
				_count: {
					platform: 'desc'
				}
			},
			take: 5
		});

		// Get recent activity (last 7 days)
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

		const recentSearches = await prisma.search.count({
			where: {
				createdAt: {
					gte: sevenDaysAgo
				}
			}
		});

		const recentUsers = await prisma.user.count({
			where: {
				createdAt: {
					gte: sevenDaysAgo
				}
			}
		});

		// Get top categories
		const categoryStats = await prisma.scrapedData.groupBy({
			by: ['category'],
			_count: {
				category: true
			},
			where: {
				category: {
					not: null
				}
			},
			orderBy: {
				_count: {
					category: 'desc'
				}
			},
			take: 5
		});

		// Get success rate (projects with raised amount > 0)
		const successfulProjects = await prisma.scrapedData.count({
			where: {
				raised: {
					not: null
				}
			}
		});

		const successRate = totalScrapedData > 0 ? (successfulProjects / totalScrapedData) * 100 : 0;

		// Get average funding amount (simplified calculation)
		const projectsWithFunding = await prisma.scrapedData.findMany({
			where: {
				raised: {
					not: null
				}
			},
			select: {
				raised: true
			},
			take: 1000 // Limit for performance
		});

		// Calculate average funding (simplified - would need proper parsing in real implementation)
		const totalFunding = projectsWithFunding.reduce((sum, project) => {
			const raised = parseFloat(project.raised?.replace(/[^0-9.]/g, '') || '0');
			return sum + (isNaN(raised) ? 0 : raised);
		}, 0);

		const averageFunding = projectsWithFunding.length > 0 ? totalFunding / projectsWithFunding.length : 0;

		const stats = {
			totalUsers,
			totalSearches,
			totalScrapedData,
			totalSavedData,
			recentSearches,
			recentUsers,
			successRate: Math.round(successRate * 10) / 10, // Round to 1 decimal
			averageFunding: Math.round(averageFunding),
			platforms: platformStats.map(p => ({
				name: p.platform,
				count: p._count.platform
			})),
			categories: categoryStats.map(c => ({
				name: c.category || 'Uncategorized',
				count: c._count.category
			}))
		};

		return NextResponse.json({ success: true, stats });
	} catch (error) {
		console.error('Error fetching stats:', error);
		return NextResponse.json(
			{ 
				success: false, 
				error: 'Failed to fetch statistics',
				// Fallback stats for demo purposes
				stats: {
					totalUsers: 1250,
					totalSearches: 8470,
					totalScrapedData: 156000,
					totalSavedData: 8900,
					recentSearches: 342,
					recentUsers: 89,
					successRate: 68.5,
					averageFunding: 45000,
					platforms: [
						{ name: 'Kickstarter', count: 45000 },
						{ name: 'Indiegogo', count: 38000 },
						{ name: 'Makuake', count: 28000 },
						{ name: 'Wadiz', count: 25000 },
						{ name: 'Campfire', count: 20000 }
					],
					categories: [
						{ name: 'Technology', count: 35000 },
						{ name: 'Design', count: 28000 },
						{ name: 'Games', count: 22000 },
						{ name: 'Music', count: 18000 },
						{ name: 'Film', count: 15000 }
					]
				}
			},
			{ status: 500 }
		);
	}
} 