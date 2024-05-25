import { BoldOutlined } from "@/components/icons/BoldOutlined";
import { UnOrderedListOutlined } from "@/components/icons/UnOrderedListOutlined";
import { BoldExtension } from "@remirror/extension-bold";
import { BulletListExtension } from "@remirror/extension-list";
import {
	OnChangeJSON,
	PlaceholderExtension,
	Remirror,
	useRemirror,
} from "@remirror/react";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RemirrorJSON } from "remirror";

interface InputRichTextProps {
	minRows?: number;
	maxRows?: number;
	label?: string;
	placeholder?: string;
	value?: string; // External state for content
	onChange: (newContent: string) => void; // Function to update external state
}

export function InputRichText({
	value,
	onChange,
	label,
	placeholder,
	minRows = 0,
	maxRows,
}: InputRichTextProps) {
	const [isFocused, setIsFocused] = React.useState(false);
	const { manager } = useRemirror({
		extensions: () => [
			new BoldExtension({}),
			new BulletListExtension({}),
			new PlaceholderExtension({
				placeholder,
			}),
		],
	});

	const [textAreaHeight, setTextAreaHeight] = useState("auto");
	const textAreaRef = useRef<HTMLDivElement>(null);

	function calculateTextAreaHeight(
		newHeight: number,
		minRows: number,
		maxRows?: number,
	) {
		let height = newHeight;
		const rowHeight = 50; // Adjust based on your CSS

		if (minRows) {
			const minHeight = rowHeight * minRows;
			height = Math.max(height, minHeight);
		}
		if (maxRows) {
			const maxHeight = rowHeight * maxRows;
			height = Math.min(height, maxHeight);
		}
		return height;
	}

	const calculateHeight = useCallback(() => {
		if (textAreaRef.current) {
			// Temporarily shrink to get the correct scrollHeight for the content
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.height = `${calculateTextAreaHeight(
				textAreaRef.current.scrollHeight,
				minRows,
				maxRows,
			)}px`;
		}
	}, [minRows, maxRows]);

	useEffect(() => {
		calculateHeight();
		window.addEventListener("resize", calculateHeight);
		return () => {
			window.removeEventListener("resize", calculateHeight);
		};
	}, [calculateHeight]);

	useEffect(() => {
		calculateHeight();
	}, []);

	useEffect(() => {
		if (!value || value === "") {
			setTextAreaHeight("auto");
		}
	}, [value]);

	const handleChange = (value: RemirrorJSON) => {
		onChange(JSON.stringify(value));
		calculateHeight();
	};

	let content;
	try {
		content = value && JSON.parse(value);
	} catch (e) {}

	return (
		<>
			{label && (
				<label className="font-semibold mb-1.5 text-gray-600 text-sm block">
					{label}
				</label>
			)}
			<div
				ref={textAreaRef}
				onFocus={() => !isFocused && setIsFocused(true)}
				onBlur={() => isFocused && setIsFocused(false)}
				className={clsx(
					"m-0 w-full resize-none text-sm rounded border shadow-none outline-none transition-all duration-300 border-gray-200 bg-white p-3",
					isFocused && "!border-blue-300 !shadow-blue-300",
					"input--rich-text",
				)}
				style={{ height: textAreaHeight }}
			>
				<div className="mb-2 border-b pb-2 border-gray-100 horizontal space-x-2">
					<div
						onClick={() => {
							manager.store.commands.toggleBold();
						}}
						className={clsx(
							"px-1.5 py-1 hover:bg-gray-50 rounded cursor-pointer",
							manager.mounted && manager.store.active.bold?.()
								? "bg-blue-50 text-blue-800"
								: "text-gray-600",
						)}
					>
						<BoldOutlined className=" text-base" />
					</div>
					<div
						onClick={() => {
							manager.store.commands.toggleBulletList();
						}}
						className={clsx(
							"px-1.5 py-1 hover:bg-gray-50 rounded cursor-pointer",
							manager.mounted && manager.store.active.bulletList?.()
								? "bg-blue-50 text-blue-800"
								: "text-gray-600",
						)}
					>
						<UnOrderedListOutlined className=" text-base" />
					</div>
				</div>
				<Remirror
					manager={manager}
					autoRender
					initialContent={content}
					classNames={["focus:outline-none !h-full !w-full"]}
				>
					<OnChangeJSON onChange={handleChange} />
				</Remirror>
			</div>
		</>
	);
}
