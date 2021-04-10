// This is the card that will show a travel spot in the travels screen.

import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function CustomCard({ travelSpot, onPress }) {
	const imgSrc =
		"https://source.unsplash.com/collection/" + travelSpot.collection;

	return (
		<Card style={{ marginBottom: 20, width: "95%" }} onPress={onPress}>
			{/* The image */}
			<Card.Cover source={{ uri: imgSrc }} />
			<Card.Content>
				{/* The title */}
				<Title>{travelSpot.title}</Title>
				{/* The description */}
				<Paragraph numberOfLines={2}>{travelSpot.description}</Paragraph>
			</Card.Content>
			<Card.Actions>
				{/* The save button */}
				<Button mode='contained'>Save</Button>
				<Button>Learn more</Button>
			</Card.Actions>
		</Card>
	);
}
