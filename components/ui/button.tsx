import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
	{
		variants: {
			variant: {
				default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1",
				destructive:
					"bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:-translate-y-1",
				outline:
					"border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm hover:shadow-md transform hover:-translate-y-1",
				secondary:
					"bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 shadow-sm hover:shadow-md hover:from-slate-200 hover:to-slate-300 transform hover:-translate-y-1",
				ghost: "hover:bg-slate-100 hover:text-slate-900 transition-colors",
				link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
				gradient: "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105",
				success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transform hover:-translate-y-1",
				warning: "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transform hover:-translate-y-1",
				glass: "bg-white/80 backdrop-blur-md border border-blue-200/50 text-blue-700 shadow-lg hover:shadow-xl hover:bg-white/90 transform hover:-translate-y-1",
			},
			size: {
				default: "h-11 px-6 py-3",
				sm: "h-9 rounded-lg px-4 py-2 text-xs",
				lg: "h-12 rounded-xl px-8 py-4 text-base",
				xl: "h-14 rounded-2xl px-10 py-5 text-lg",
				icon: "h-11 w-11 rounded-xl",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{/* Shimmer effect for gradient buttons */}
				{variant === "gradient" && (
					<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
				)}
				{props.children}
			</Comp>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
