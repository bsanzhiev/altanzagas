import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../theme";
import '@mantine/notifications/styles.css';

// import { FirebaseAppProvider } from "reactfire";

export const metadata = {
	title: "Altanzagas Training Camp",
	description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/fish.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				{/* <FirebaseAppProvider firebaseApp={app}>
					<MantineProvider theme={theme}>{children}</MantineProvider>
				</FirebaseAppProvider> */}

				<MantineProvider theme={theme}>
					<Notifications />
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
