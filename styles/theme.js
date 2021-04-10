import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: "#ffb703",
		accent: "#333333",
		background: "#ededed",
	},
};

export default theme;
