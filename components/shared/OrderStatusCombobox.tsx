"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "../ui/use-toast";

const orderStatus = [
	{
		value: "pending",
		label: "Pending",
	},
	{
		value: "completed",
		label: "Completed",
	},
	{
		value: "cancelled",
		label: "Cancelled",
	},
];

function OrderStatusCombobox({ orderId }: { orderId?: string }) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(orderStatus[0].value);

	const { toast } = useToast();
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? orderStatus.find((order) => order.value === value)
								?.label
						: "Select order status..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[150px] p-0">
				<Command>
					<CommandInput placeholder="Search Order Status..." />
					<CommandEmpty>No Status found.</CommandEmpty>
					<CommandList>
						{orderStatus.map((order) => (
							<CommandItem
								key={order.value}
								value={order.value}
								onSelect={async (currentValue) => {
									setValue(
										currentValue === value
											? ""
											: currentValue
									);
									const response = await fetch(
										"/api/orders/update",
										{
											method: "POST",
											body: JSON.stringify({
												orderId: orderId,
												updates: {
													status: currentValue,
												},
											}),
										}
									);
									const data = await response.json();
									if (response.status === 200) {
										toast({
											title: "Order status updated successfully!",
										});
									} else {
										toast({
											title: "Sorry, something went wrong.",
											description: "Please try again!",
											variant: "destructive",
										});
									}
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === order.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{order.label}
							</CommandItem>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default OrderStatusCombobox;
