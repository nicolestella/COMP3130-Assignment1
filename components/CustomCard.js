// This is the card that will show a travel spot in the travels screen.

import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function CustomCard({
	travelSpot,
	onPress,
	listingItem,
	isSaved,
}) {
	const imgSrc =
		"https://source.unsplash.com/collection/" + travelSpot.collection;

	return (
		<Card
			key={travelSpot.id}
			style={{ marginTop: 20, width: "95%" }}
			onPress={onPress}
		>
			{/* The image */}
			<Card.Cover source={{ uri: imgSrc }} />
			<Card.Title title={travelSpot.title} subtitle={travelSpot.country} />
			<Card.Content>
				{/* The description */}
				<Paragraph numberOfLines={2}>{travelSpot.description}</Paragraph>
			</Card.Content>
			<Card.Actions>
				{listingItem ? null : <Button onPress={onPress}>Learn more</Button>}
				{isSaved ? <Button mode='contained'>Saved</Button> : null}
			</Card.Actions>
		</Card>
	);
}
