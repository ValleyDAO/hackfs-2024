import React from "react";

export interface InputLabelProps {
	label: string;
	className?: string;
}

export function InputLabel({ label }: InputLabelProps) {
	return (
		<label className="font-medium text-gray-600 text-xs block mb-1.5">
			{label}
		</label>
	);
}
