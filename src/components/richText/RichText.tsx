"use client";

import { BoldExtension } from "@remirror/extension-bold";
import { BulletListExtension } from "@remirror/extension-list";
import { Remirror, useRemirror } from "@remirror/react";
import React from "react";

interface InputRichTextProps {
	value?: string;
}

export function RichText({ value }: InputRichTextProps) {
	const { manager, state } = useRemirror({
		extensions: () => [new BoldExtension({}), new BulletListExtension({})],
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
