import React from "react";
import { withTheme, Button } from "react-native-paper";
import theme from "../styles/theme";

function SaveButton({ contentStyle, style, onPress }) {
	const [isSaved, setIsSaved] = React.useState(false);
	const onToggleSave = () => setIsSaved(!isSaved);

	const pressButton = () => {
		onToggleSave();
		onPress;
	};

	return isSaved ? (
		<Button
			dark
			mode='contained'
			onPress={pressButton}
			contentStyle={contentStyle}
			style={style}
			color={theme.colors.accent}
		>
			Saved
		</Button>
	) : (
		<Button
			mode='contained'
			onPress={pressButton}
			contentStyle={contentStyle}
			style={style}
		>
			Save
		</Button>
	);
}

export default withTheme(SaveButton);
