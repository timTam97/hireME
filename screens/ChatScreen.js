import React from 'react'
import { SafeAreaView, View, StyleSheet, Text, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-gifted-chat';
import Fire from '../Fire';

class ChatScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title')
    });

    state = {
        messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
    };

    render() {
        return(
            <View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={Fire.shared.send}
                    user={this.user}
                />
                { Platform.OS ==='android' ? <KeyboardSpacer /> : null}
            </View>

        );
    }

    componentDidMount() {
        Fire.shared.on(message => this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }

    componentWillUnmount() {
        Fire.shared.off();
    }

    get user() {
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.shared.uid,
        };
    }
}

export default ChatScreen;