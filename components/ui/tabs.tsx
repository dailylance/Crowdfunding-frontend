"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface TabsContextType {
	value: string;
	onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

const Tabs = ({
	defaultValue,
	value,
	onValueChange,
	className,
	children,
	...props
}: {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	className?: string;
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
	const [internalValue, setInternalValue] = React.useState(defaultValue || "");

	const currentValue = value !== undefined ? value : internalValue;
	const handleValueChange = onValueChange || setInternalValue;

	return (
		<TabsContext.Provider
			value={{ value: currentValue, onValueChange: handleValueChange }}>
			<div className={cn("w-full", className)} {...props}>
				{children}
			</div>
		</TabsContext.Provider>
	);
};

const TabsList = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
			className
		)}
		{...props}
	/>
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		value: string;
	}
>(({ className, value, children, ...props }, ref) => {
	const context = React.useContext(TabsContext);
	if (!context) throw new Error("TabsTrigger must be used within Tabs");

	const isActive = context.value === value;

	return (
		<button
			ref={ref}
			type='button'
			onClick={() => context.onValueChange(value)}
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
				isActive
					? "bg-background text-foreground shadow-sm"
					: "hover:bg-muted/50",
				className
			)}
			{...props}>
			{children}
		</button>
	);
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		value: string;
	}
>(({ className, value, children, ...props }, ref) => {
	const context = React.useContext(TabsContext);
	if (!context) throw new Error("TabsContent must be used within Tabs");

	if (context.value !== value) return null;

	return (
		<div
			ref={ref}
			className={cn(
				"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className
			)}
			{...props}>
			{children}
		</div>
	);
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
