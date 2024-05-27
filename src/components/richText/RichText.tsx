import { EditorProvider } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React from "react";

interface InputRichTextProps {
	value?: string;
}

export function RichText({ value }: InputRichTextProps) {
	return (
		<EditorProvider
			extensions={[StarterKit]}
			content={value && JSON.parse(value)}
			editable={false}
		/>
	);
}
