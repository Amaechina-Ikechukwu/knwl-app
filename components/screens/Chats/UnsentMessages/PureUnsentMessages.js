import { FlatList } from "react-native";
import { useColorScheme } from "react-native";
import React from "react";

import { HStack } from "native-base";
import RenderUnsentText from "./RenderUnsentText";

class PureUnsentMessages extends React.PureComponent {
  render() {
    const { items } = this.props;
    console.log({ items });
    return (
      <FlatList
        data={items}
        initialNumToRender={8}
        inverted
        renderItem={({ item, index }) => (
          <HStack justifyContent={"flex-end"}>
            <RenderUnsentText item={item} messages={item?.messages} />
          </HStack>
        )}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

export default PureUnsentMessages;
