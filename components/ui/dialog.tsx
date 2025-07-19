"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Dialog = ({
	children,
	open,
	onOpenChange,
}: {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) => {
	const [isOpen, setIsOpen] = React.useState(open || false);

	React.useEffect(() => {
		if (open !== undefined) {
			setIsOpen(open);
		}
	}, [open]);

	const handleOpenChange = (newOpen: boolean) => {
		setIsOpen(newOpen);
		onOpenChange?.(newOpen);
	};

	return (
		<>
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(
							child as React.ReactElement<{
								open?: boolean;
								onOpenChange?: (open: boolean) => void;
							}>,
							{ open: isOpen, onOpenChange: handleOpenChange }
					  )
					: child
			)}
		</>
	);
};

const DialogContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	}
>(({ className, children, open, onOpenChange, ...props }, ref) => {
	if (!open) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div
				className='fixed inset-0 bg-black/50'
				onClick={() => onOpenChange?.(false)}
			/>
			<div
				ref={ref}
				className={cn(
					"relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
					className
				)}
				{...props}>
				{children}
				<button
					className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
					onClick={() => onOpenChange?.(false)}>
					<svg
						width='15'
						height='15'
						viewBox='0 0 15 15'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='h-4 w-4'>
						<path
							d='m11.7816 4.03157c.0312-.03125.0312-.08215 0-.11339-.0312-.03125-.0821-.03125-.1134 0L7.5 8.15179 3.33238 4.03157c-.03125-.03125-.08215-.03125-.11339 0-.03125.03124-.03125.08214 0 .11339L7.38661 8.30178 3.21822 12.4696c-.03125.0312-.03125.0821 0 .1134.03124.0312.08214.0312.11339 0L7.5 8.44821l4.1676 4.12077c.0312.0312.0821.0312.1134 0 .0312-.0313.0312-.0822 0-.1134L7.61339 8.30178 11.7816 4.15357c.0312-.03125.0312-.08215 0-.11339z'
							fill='currentColor'
							fillRule='evenodd'
							clipRule='evenodd'
						/>
					</svg>
					<span className='sr-only'>Close</span>
				</button>
			</div>
		</div>
	);
});
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col space-y-1.5 text-center sm:text-left",
			className
		)}
		{...props}
	/>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			className
		)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className
		)}
		{...props}
	/>
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
DialogDescription.displayName = "DialogDescription";

export {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
};
