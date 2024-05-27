import { EditorProvider } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React from "react";

interface InputRichTextProps {
	value?: string;
}

export function RichText({ value }: InputRichTextProps) {
	let content;
	try {
		content = value && JSON.parse(value);
	} catch (e) {}
	return (
		<EditorProvider
			extensions={[StarterKit]}
			content={content}
			editable={false}
		/>
	);
}
