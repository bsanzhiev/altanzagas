"use client";

import React, { useState } from "react";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
	Anchor,
	Box,
	Button,
	Checkbox,
	Divider,
	Group,
	NumberInput,
	Paper,
	PaperProps,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { TwitterButton } from "./TwitterButton";
import styles from "./Login.module.css";

import { getAuth, RecaptchaVerifier } from "firebase/auth";

function Login(props: PaperProps) {
	const [type, toggle] = useToggle(["login", "register"]);
	const [method, setMethod] = useState("email");
	const form = useForm({
		initialValues: {
			email: "",
			name: "",
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
      // phone: (val) => ()
		},
	});

  const isSubmitDisabled = method === "phone" && form.values.code === "";

  const auth = getAuth();
  // auth.languageCode = "en";
  auth.useDeviceLanguage();

  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  })

	console.log("method", method);
	return (
		<>
			<Box className={styles.CenteredBox}>
				<Paper w={420} radius="md" p="xl" withBorder {...props}>
					<Text size="lg" fw={500}>
						Welcome to Altanzagas, {type} with
					</Text>
					<Group grow mb="md" mt="md">
						<GoogleButton radius="xl">Google</GoogleButton>
						<TwitterButton radius="xl">Twitter</TwitterButton>
					</Group>

					<Divider
						label="Or continue with"
						labelPosition="center"
						my="lg"
					/>

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
								<TextInput
									label="Name"
									placeholder="Your name"
									value={form.values.name}
									onChange={(event) =>
										form.setFieldValue("name", event.currentTarget.value)
									}
								/>
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
									<Button radius="xl" >Sent</Button>
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
							<Button disabled={isSubmitDisabled} type="submit" radius="xl">
								{upperFirst(type)}
							</Button>
						</Group>
					</form>
				</Paper>
			</Box>
		</>
	);
}

export default Login;
