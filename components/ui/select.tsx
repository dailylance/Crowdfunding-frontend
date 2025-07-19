"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SelectProps {
	value?: string;
	onValueChange?: (value: string) => void;
	children: React.ReactNode;
}

export interface SelectTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	placeholder?: string;
}

export interface SelectContentProps {
	children: React.ReactNode;
}

export interface SelectItemProps {
	value: string;
	children: React.ReactNode;
}

export interface SelectValueProps {
	placeholder?: string;
}

const SelectContext = React.createContext<{
	value?: string;
	onValueChange?: (value: string) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}>({
	open: false,
	setOpen: () => {},
});

const Select = ({ value, onValueChange, children }: SelectProps) => {
	const [open, setOpen] = React.useState(false);

	return (
		<SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
			<div className='relative'>{children}</div>
		</SelectContext.Provider>
	);
};

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
	({ className, children, ...props }, ref) => {
		const { open, setOpen } = React.useContext(SelectContext);

		return (
			<button
				ref={ref}
				type='button'
				role='combobox'
				aria-expanded={open}
				aria-controls='select-content'
				onClick={() => setOpen(!open)}
				className={cn(
					"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				{...props}>
				{children}
				<svg
					width='15'
					height='15'
					viewBox='0 0 15 15'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='h-4 w-4 opacity-50'>
					<path
						d='m4.93179 5.43179c0.20081-0.20081 0.52633-0.20081 0.72714 0l2.34107 2.34107 2.34107-2.34107c0.20081-0.20081 0.52633-0.20081 0.72714 0c0.20081 0.20081 0.20081 0.52633 0 0.72714l-2.70714 2.70714c-0.20081 0.20081-0.52633 0.20081-0.72714 0l-2.70714-2.70714c-0.20081-0.20081-0.20081-0.52633 0-0.72714z'
						fill='currentColor'
						fillRule='evenodd'
						clipRule='evenodd'
					/>
				</svg>
			</button>
		);
	}
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder }: SelectValueProps) => {
	const { value } = React.useContext(SelectContext);

	return <span>{value || placeholder}</span>;
};

const SelectContent = ({ children }: SelectContentProps) => {
	const { open } = React.useContext(SelectContext);

	if (!open) return null;

	return (
		<div className='absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg'>
			<div className='p-1'>{children}</div>
		</div>
	);
};

const SelectItem = ({ value, children }: SelectItemProps) => {
	const { onValueChange, setOpen } = React.useContext(SelectContext);

	return (
		<div
			className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-900 outline-none hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
			onClick={() => {
				onValueChange?.(value);
				setOpen(false);
			}}>
			{children}
		</div>
	);
};

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
