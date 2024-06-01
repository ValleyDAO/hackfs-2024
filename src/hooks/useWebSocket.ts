// src/hooks/useWebSocket.ts
import { useEffect, useRef } from "react";

const useWebSocket = (url: string) => {
	const socketRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		socketRef.current = new WebSocket(url);

		const onOpen = () => console.log("Connected to WebSocket");
		const onClose = () => console.log("Disconnected from WebSocket");

		socketRef.current.addEventListener("open", onOpen);
		socketRef.current.addEventListener("close", onClose);

		return () => {
			socketRef.current?.removeEventListener("open", onOpen);
			socketRef.current?.removeEventListener("close", onClose);
			socketRef.current?.close();
		};
	}, [url]);

	const sendMessage = (message: string): Promise<string> => {
		return new Promise((resolve, reject) => {
			if (!socketRef.current) {
				reject("WebSocket not connected");
				return;
			}

			const onMessage = (event: MessageEvent) => {
				resolve(event.data);
			};

			socketRef.current.addEventListener("message", onMessage, { once: true });

			socketRef.current.send(message);
		});
	};

	return { sendMessage };
};

export default useWebSocket;
