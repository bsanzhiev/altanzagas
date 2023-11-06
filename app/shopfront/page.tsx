"use client";

import {
	Autocomplete,
	Group,
	Burger,
	rem,
	Title,
	TextInput,
	Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconSearch,
	IconShoppingCart,
	IconUser,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import { IconFish } from "@tabler/icons-react";
import classes from "./HeaderSearch.module.css";

const links = [
	{ link: "/about", label: "Features" },
	{ link: "/pricing", label: "Pricing" },
	{ link: "/learn", label: "Learn" },
	{ link: "/community", label: "Community" },
];

export function HeaderSearch() {
	const [opened, { toggle }] = useDisclosure(false);

	const items = links.map((link) => (
		<a
			key={link.label}
			href={link.link}
			className={classes.link}
			onClick={(event) => event.preventDefault()}
		>
			{link.label}
		</a>
	));

	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group gap={3}>
					<IconFish size={36} />
					<Title order={5}>Altanzagas</Title>
				</Group>

				<Group>
					{/* <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
						{items}
					</Group> */}
					<TextInput
						miw={440}
						// className={classes.search}
						placeholder="Search"
						leftSection={
							<IconSearch
								style={{ width: rem(16), height: rem(16) }}
								stroke={1.5}
							/>
						}
						visibleFrom="xs"
					/>
				</Group>

				<Group>
					<Button radius={12} size="compact-sm">
						<IconUser size={24} />
					</Button>
					<Button radius={12} size="compact-sm">
						<IconShoppingCart size={24} />
					</Button>
				</Group>
			</div>
		</header>
	);
}
