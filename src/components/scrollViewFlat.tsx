import React from 'react';
import {FlatList} from 'react-native';


export default function ScrollViewFlat(props: any) {
    return (
        <FlatList
            style={{flex: 1, flexGrow: 1}}
            data={[]}
            ListEmptyComponent={null}
            keyExtractor={() => "dummy"}
            renderItem={null}
            ListHeaderComponent={() => (
                <React.Fragment>{props.children}</React.Fragment>
            )}
        />
    );
}