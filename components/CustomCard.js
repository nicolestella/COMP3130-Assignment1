// This is the card that will show a travel spot.

import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function CustomCard({ travelSpot, onPress, listingItem, onEdit }) {
	const imgSrc = () => {

		if (travelSpot.collection) {
			return { uri: "https://source.unsplash.com/collection/" + travelSpot.collection };
		}

		else {
			return travelSpot.img;
		}
	}

	return (
		<Card
			key={travelSpot.id}
			style={{ marginTop: 20, width: 370 }}
			onPress={onPress}
		>
			{/* The image */}
			<Card.Cover source={imgSrc()} />
			<Card.Title title={travelSpot.title} subtitle={travelSpot.country} />
			<Card.Content>
				{/* The description */}
				<Paragraph numberOfLines={2}>{travelSpot.description}</Paragraph>
			</Card.Content>
			<Card.Actions>
				{listingItem ? null : <Button onPress={onPress}>Learn more</Button>}
				{travelSpot.custom ? <Button mode='contained' onPress={onEdit}>Edit</Button> : null}
			</Card.Actions>
		</Card>
	);
}
