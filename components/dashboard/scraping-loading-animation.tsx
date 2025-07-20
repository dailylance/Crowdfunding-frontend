"use client";

import React, { useEffect, useState } from "react";
import {
	Database,
	Search,
	Globe,
	Eye,
	CheckCircle,
	ArrowRight,
} from "lucide-react";

interface ScrapingLoadingProps {
	platform?: string;
	keyword?: string;
	isPolling?: boolean;
	pollCount?: number;
}

export function ScrapingLoadingAnimation({
	platform,
	keyword,
	isPolling,
	pollCount,
}: ScrapingLoadingProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [progressPercent, setProgressPercent] = useState(0);

	const steps = [
		{
			icon: Globe,
			title: "Connecting",
			desc: "Accessing platform",
			color: "blue",
		},
		{
			icon: Search,
			title: "Searching",
			desc: "Finding projects",
			color: "indigo",
		},
		{ icon: Eye, title: "Processing", desc: "Analyzing data", color: "purple" },
		{
			icon: Database,
			title: "Completing",
			desc: "Preparing results",
			color: "green",
		},
	];

	useEffect(() => {
		// Smooth step progression
		const stepInterval = setInterval(() => {
			setCurrentStep((prev) => (prev + 1) % steps.length);
		}, 4000);

		// Realistic progress simulation
		const progressInterval = setInterval(() => {
			setProgressPercent((prev) => {
				if (prev >= 95) return 15; // Reset cycle
				return prev + Math.random() * 8 + 3;
			});
		}, 800);

		return () => {
			clearInterval(stepInterval);
			clearInterval(progressInterval);
		};
	}, [steps.length]);

	return (
		<div className='fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center'>
			{/* Clean minimal overlay */}
			<div className='max-w-md w-full mx-4'>
				{/* Professional loading card */}
				<div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
					{/* Elegant header */}
					<div className='text-center mb-8'>
						{/* Subtle animated logo */}
						<div className='relative mb-6'>
							<div className='w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg'>
								<Search
									className='w-8 h-8 text-white'
									style={{
										transform: "rotate(0deg)",
										animation: "spin 8s linear infinite",
									}}
								/>
							</div>
							{/* Minimal pulse indicator */}
							<div className='absolute inset-0 w-16 h-16 mx-auto border-2 border-blue-200 rounded-xl animate-ping opacity-20'></div>
						</div>

						<h3 className='text-xl font-semibold text-gray-800 mb-2'>
							{isPolling ? "Backend Processing..." : "Analyzing Projects"}
						</h3>
						<p className='text-gray-500 text-sm'>
							{isPolling ? (
								<>
									<span className='text-amber-600 font-medium'>
										⏳ Long search in progress...
									</span>
									<br />
									<span className='text-xs text-gray-400'>
										Checking status ({pollCount}/10)
									</span>
								</>
							) : (
								<>
									Searching for{" "}
									<span className='font-medium text-gray-700'>
										&ldquo;{keyword}&rdquo;
									</span>{" "}
									on{" "}
									<span className='font-medium text-gray-700 capitalize'>
										{platform}
									</span>
								</>
							)}
						</p>
					</div>

					{/* Clean progress steps */}
					<div className='space-y-4 mb-8'>
						{steps.map((step, index) => {
							const StepIcon = step.icon;
							const isActive = index === currentStep;
							const isCompleted = index < currentStep;

							return (
								<div key={index} className='flex items-center space-x-4'>
									{/* Step indicator */}
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
											isCompleted
												? "bg-green-100 text-green-600"
												: isActive
												? `bg-${step.color}-100 text-${step.color}-600`
												: "bg-gray-100 text-gray-400"
										}`}>
										{isCompleted ? (
											<CheckCircle className='w-5 h-5' />
										) : (
											<StepIcon
												className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`}
											/>
										)}
									</div>

									{/* Step content */}
									<div className='flex-1'>
										<h4
											className={`font-medium transition-colors duration-300 ${
												isActive
													? "text-gray-800"
													: isCompleted
													? "text-gray-600"
													: "text-gray-400"
											}`}>
											{step.title}
										</h4>
										<p
											className={`text-sm transition-colors duration-300 ${
												isActive ? "text-gray-500" : "text-gray-400"
											}`}>
											{step.desc}
										</p>
									</div>

									{/* Status indicator */}
									{isActive && (
										<div className='flex space-x-1'>
											<div className='w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce'></div>
											<div
												className='w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce'
												style={{ animationDelay: "0.1s" }}></div>
											<div
												className='w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce'
												style={{ animationDelay: "0.2s" }}></div>
										</div>
									)}
									{isCompleted && (
										<ArrowRight className='w-4 h-4 text-green-500' />
									)}
								</div>
							);
						})}
					</div>

					{/* Minimal progress bar */}
					<div className='mb-6'>
						<div className='flex justify-between text-sm text-gray-500 mb-2'>
							<span>Progress</span>
							<span>{Math.min(progressPercent, 100).toFixed(0)}%</span>
						</div>
						<div className='w-full bg-gray-100 rounded-full h-2'>
							<div
								className='h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out'
								style={{ width: `${Math.min(progressPercent, 100)}%` }}
							/>
						</div>
					</div>

					{/* Professional footer */}
					<div className='text-center'>
						<div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
							<p className='text-gray-600 text-sm'>
								<span className='font-medium'>AI-Enhanced Analysis</span> in
								progress...
							</p>
							<p className='text-gray-400 text-xs mt-1'>
								Using advanced OCR and data processing
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
