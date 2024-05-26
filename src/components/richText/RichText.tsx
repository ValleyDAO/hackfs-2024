"use client";

import { BoldExtension } from "@remirror/extension-bold";
import { BulletListExtension } from "@remirror/extension-list";
import { TextHighlightExtension } from "@remirror/extension-text-highlight";
import { Remirror, useRemirror } from "@remirror/react";
import React, { useEffect } from "react";

interface InputRichTextProps {
	value?: string;
}

export function RichText({ value }: InputRichTextProps) {
	const { manager, state } = useRemirror({
		extensions: () => [
			new BoldExtension({}),
			new BulletListExtension({}),
			new TextHighlightExtension({}),
		],
		content: value && JSON.parse(value),
	});

	return (
		<Remirror
			classNames={["input--rich-text"]}
			manager={manager}
			editable={false}
			initialContent={state}
		/>
	);
}
