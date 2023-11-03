"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
	Anchor,
	Box,
	Button,
	Checkbox,
	Divider,
	Group,
	Paper,
	PaperProps,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Notification,
	rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";
import { IconX, IconCheck } from "@tabler/icons-react";

import styles from "./Login.module.css";

// Firebase stuff
import { auth } from "../../firebase";
import {
	ConfirmationResult,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from "firebase/auth";
import authRoutes from "../../services/index";

auth.useDeviceLanguage();

function Login(props: PaperProps) {
	const router = useRouter();

	const [type, toggle] = useToggle(["login", "register"]);
	const [method, setMethod] = useState("email");
	const [isVerified, setVerified] = useState(true);
	const [appVerifier, setAppVerifier] = useState(null);

	useEffect(() => {
		if (appVerifier) {
			setVerified(false);
		}
	}, [appVerifier]);

	const form = useForm({
		initialValues: {
			first_name: "",
			second_name: "",
			username: "",
			email: "",
			password: "",
			phone: "",
			code: "",
			terms: true,
		},
		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
			password: (val) =>
				val.length <= 6
					? "Password should include at least 6 characters"
					: null,
		},
	});
	const isSubmitDisabled = method === "phone" && form.values.code === "";

	// Notifications ========================================================
	function showSuccessfulNotification() {
		notifications.show({
			message: "Verification successful",
			color: "teal",
			icon: <IconCheck />,
		});
	}

	function showFailedNotification() {
		notifications.show({
			message: "Invalid code",
			color: "red",
			icon: <IconX />,
		});
	}

	// Firebase logic ======================================================
	const phoneNumber = form.values.phone;

	function onCaptchaVerify() {
		// @ts-ignore
		window.recaptchaVerifier = new RecaptchaVerifier(
			auth,
			"recaptcha-container",
			{
				size: "invisible",
			}
		);
		// @ts-ignore
		console.log(window.recaptchaVerifier, "function onCaptchaVerify");
	}

	function loginWithNumber() {
		onCaptchaVerify();
		// @ts-ignore
		const verifier = window.recaptchaVerifier;
		setAppVerifier(verifier);
		console.log("appVerifier", verifier);

		signInWithPhoneNumber(auth, phoneNumber, verifier)
			.then((confirmationResult: ConfirmationResult) => {
				// @ts-ignore
				window.confirmationResult = confirmationResult;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function OTPVerify() {
		const otp = form.values.code;
		// @ts-ignore
		window.confirmationResult
			.confirm(otp)
			.then(async (res: any) => {
				showSuccessfulNotification();
				console.log("CRED", res);
				router.push("/");
			})
			.catch((err: any) => {
				showFailedNotification();
				console.log("Verification error", err);
			});
	}

	const loginData = {
		email: form.values.email,
		password: form.values.password,
	}
	async function loginHandle() {
		authRoutes.login(loginData)
	}

	return (
		<>
			<div id="recaptcha-container"></div>

			<Box className={styles.CenteredBox}>
				<Paper w={420} radius="md" p="xl" withBorder {...props}>
					<Text size="lg" fw={500}>
						Welcome to Altanzagas, {type} with
					</Text>
					<Group grow mb="md" mt="md">
						<GoogleButton radius="xl">Google</GoogleButton>
						<TwitterButton radius="xl">Twitter</TwitterButton>
					</Group>

					<Divider label="Or continue with" labelPosition="center" my="lg" />

					<Group justify="space-evenly" mb={24}>
						<Button radius="xl" onClick={() => setMethod("email")}>
							Email
						</Button>
						<Button radius="xl" onClick={() => setMethod("phone")}>
							Phone Number
						</Button>
					</Group>

					<form onSubmit={form.onSubmit(() => {})}>
						<Stack>
							{type === "register" && (
								<>
									<TextInput
										label="First Name"
										placeholder="Your First Name"
										value={form.values.first_name}
										onChange={(event) =>
											form.setFieldValue(
												"first_name",
												event.currentTarget.value
											)
										}
									/>
									<TextInput
										label="Second Name"
										placeholder="Your Second Name"
										value={form.values.second_name}
										onChange={(event) =>
											form.setFieldValue(
												"second_name",
												event.currentTarget.value
											)
										}
									/>
									<TextInput
										label="username"
										required
										placeholder="Your username/nickname"
										value={form.values.username}
										onChange={(event) =>
											form.setFieldValue("username", event.currentTarget.value)
										}
									/>
								</>
							)}

							{method === "email" ? (
								<>
									<TextInput
										required
										label="Email"
										placeholder="Your email"
										value={form.values.email}
										onChange={(event) =>
											form.setFieldValue("email", event.currentTarget.value)
										}
										error={form.errors.email && "Invalid email"}
										radius="md"
									/>

									<PasswordInput
										required
										label="Password"
										placeholder="Your password"
										value={form.values.password}
										onChange={(event) =>
											form.setFieldValue("password", event.currentTarget.value)
										}
										error={
											form.errors.password &&
											"Password should include at least 6 characters"
										}
										radius="md"
									/>
								</>
							) : (
								<Stack>
									<Group justify="space-between" align="flex-end">
										<TextInput
											required
											label="Phone Number"
											placeholder="Your phone number"
											value={form.values.phone}
											onChange={(event) =>
												form.setFieldValue("phone", event.currentTarget.value)
											}
											error={form.errors.code && "Invalid phone number"}
											radius="md"
											style={{ flex: 1 }}
										/>
										<Button radius="xl" onClick={loginWithNumber}>
											Sent
										</Button>
									</Group>

									<Group justify="space-between" align="flex-end">
										<TextInput
											required
											label="Verification code"
											placeholder="Your code"
											value={form.values.code}
											onChange={(event) =>
												form.setFieldValue("code", event.currentTarget.value)
											}
											error={form.errors.code && "Invalid code"}
											radius="md"
											style={{ flex: 1 }}
										/>
										<Button
											radius="xl"
											onClick={OTPVerify}
											disabled={isVerified}
										>
											Confirm
										</Button>
									</Group>
								</Stack>
							)}

							{type === "register" && (
								<Checkbox
									label="I accept terms and conditions"
									checked={form.values.terms}
									onChange={(event) =>
										form.setFieldValue("terms", event.currentTarget.checked)
									}
								/>
							)}
						</Stack>

						<Group justify="space-between" mt="xl">
							<Anchor
								component="button"
								type="button"
								c="dimmed"
								onClick={() => toggle()}
								size="xs"
							>
								{type === "register"
									? "Already have an account? Login"
									: "Don't have an account? Register"}
							</Anchor>
							{method === "email" ? (
								<Button
									disabled={isSubmitDisabled}
									type="submit"
									radius="xl"
									onClick={loginHandle}
								>
									{upperFirst(type)}
								</Button>
							) : (
								""
							)}
						</Group>
					</form>
				</Paper>
			</Box>
		</>
	);
}

export default Login;
