import { FlatList } from "react-native";
import { useColorScheme } from "react-native";
import React from "react";
import RenderText from "./RenderText";
import { HStack } from "native-base";
import PureUnsentMessages from "./UnsentMessages/PureUnsentMessages";

class PureMessageChat extends React.PureComponent {
  render() {
    const { items, unsent } = this.props;
    const renderItem = ({ item }) => (
      <HStack
        justifyContent={item?.uid == "openai" ? "flex-start" : "flex-end"}
      >
        <RenderText item={item} messages={item?.message} />
      </HStack>
    );
    return (
      <FlatList
        data={items}
        initialNumToRender={8}
        inverted
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        // ListFooterComponent={<PureUnsentMessages items={unsent} />}
      />
    );
  }
}

export default PureMessageChat;
