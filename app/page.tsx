"use client";

import { Container, Grid } from "@mantine/core";
import { ProductCard } from "../components/card/page";
import { HeaderSearch } from "./shopfront/page";

export default function HomePage() {
	return (
		<>
			<HeaderSearch />
			<Container size="md">
				<Grid
					gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}
					justify="space-between"
				>
					<Grid.Col span={4}>
						<ProductCard />
					</Grid.Col>
					<Grid.Col span={4}>
						<ProductCard />
					</Grid.Col>
					<Grid.Col span={4}>
						<ProductCard />
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
}
