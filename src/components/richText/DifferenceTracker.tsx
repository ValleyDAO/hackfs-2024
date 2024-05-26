"use client";

import { BoldExtension } from "@remirror/extension-bold";
import { DiffExtension } from "@remirror/extension-diff";
import { BulletListExtension } from "@remirror/extension-list";
import { TextHighlightExtension } from "@remirror/extension-text-highlight";
import { Remirror, useRemirror } from "@remirror/react";
import React, { useEffect } from "react";
import { ExtensionPriority } from "remirror";

interface InputRichTextProps {
	value?: string;
	newText?: string;
}

export function DifferenceTracker({ value, newText }: InputRichTextProps) {
	const { manager, state } = useRemirror({
		extensions: () => [
			new BoldExtension({}),
			new BulletListExtension({}),
			new TextHighlightExtension({
				priority: ExtensionPriority.High,
			}),
			new DiffExtension({}),
		],
	});

	useEffect(() => {
		if (!manager?.store?.commands || !manager.mounted || !value || !newText)
			return;

		const diffExtension = manager.getExtension(DiffExtension);

		if (diffExtension.getCommits()?.length > 0) return;

		// Set the initial content to original text
		manager.store.commands.setContent(JSON.parse(value));
		manager.store.commands.commitChange("Initial content");

		// Set the new content
		manager.store.commands.setContent(JSON.parse(newText));

		// Commit the initial content
		manager.store.commands.commitChange("Updated content");

		const commits = diffExtension.getCommits();
		if (commits.length > 0) {
			const lastCommit = commits[commits.length - 1];
			manager.store.commands.highlightCommit(lastCommit);
			diffExtension.highlightCommit(lastCommit);
		}
	}, [manager]);

	return (
		<Remirror
			classNames={["input--rich-text"]}
			manager={manager}
			editable={false}
		/>
	);
}
