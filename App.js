/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	FlatList,
	ActivityIndicator
} from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class App extends Component {
	count = 0;
	constructor(props) {
		super(props);
		this.state = {
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15],
			refreshing: false,
			noMoreList: false
		};
	}

	flatListFooter() {
		return (
			<View
				style={{
					width: deviceWidth,
					height: 180,
					alignItems: "center",
					paddingTop: 20
				}}
			>
				{this.state.noMoreList ? (
					<Text>No more data to load ~</Text>
				) : (
					<ActivityIndicator color="#3498db" />
				)}
			</View>
		);
	}

	reachedEnd() {
		console.log("reachedEnd");
		console.log("count", this.count);

		if (!this.state.noMoreList) {
			setTimeout(() => {
				if (this.count <= 4) {
					this.setState({
						list: [...this.state.list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15]
					});
				} else {
					this.setState({
						list: [...this.state.list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15],
						noMoreList: true
					});
				}
				console.log("state: ",this.state)

				this.count += 1;
			}, 1000);
		}
	}

	refreshList() {
		this.setState({ refreshing: true });
		setTimeout(() => {
			this.setState({
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				refreshing: false,
				noMoreList: false
			});
			this.count = 0;
		}, 1000);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.topBar}>
					<Text style={styles.navText}>
						Refreshable And Infinite Scroll FlatList
					</Text>
				</View>
				<FlatList
					style={{ flex: 1, backgroundColor:"rgba(189, 195, 199,.4)" }}
					data={this.state.list}
					renderItem={({ item, index }) => <Text style={styles.row}>{index}</Text>}
					keyExtractor={(item, index) => index.toString()}
					ListFooterComponent={this.flatListFooter()}
					onEndReached={() => this.reachedEnd()}
					onEndReachedThreshold={0.5}
					onRefresh={() => this.refreshList()}
					refreshing={this.state.refreshing}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	topBar: {
		backgroundColor: "#F7F7F8",
		height: 128,
		zIndex: 10
	},
	row: {
		padding: 10,
		height: 64,
		width: deviceWidth,
		backgroundColor: "#ffffff",
		borderTopWidth: 1,
		marginBottom: -1,
		borderBottomColor: "#E5EDF5",
		borderTopColor: "#E5EDF5",
		borderBottomWidth: 1,
		justifyContent: "center"
	},
	navText: {
		color: "#6da3d0",
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
		paddingTop: 30
	}
});
