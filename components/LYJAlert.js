/*
* Created by lyj on 2020-05-19 18:07:40
*
* User liuyj
*
* Class LYJAlert.js
*
* Description - Modal - Alert - 弹框
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import RootSiblings from 'react-native-root-siblings';

let elements = [];
export default class LYJAlert extends Component {

    static alert = (title: string, message: string, buttons: []) => {
        let siblings = new RootSiblings(
            <ModalView title={title} message={message} buttons={buttons}/>
        );
        elements.push(siblings);
    }
}


class ModalView extends Component {

    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        buttons: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let title = this.props.title;
        let message = this.props.message;
        let buttons = this.props.buttons;

        let buttonStyle = null;
        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

        if (buttons) {
            if (buttons.length === 1) {
                buttonStyle = buttons.map((value, index, arr) => {
                    let text = value.text;
                    let style = value.style;
                    let action = value.onPress;
                    return (
                        <View key={index} style={{backgroundColor: '#e8e9ea'}}>
                            <TouchableOpacity style={{height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 1, backgroundColor: '#fff'}} 
                                              onPress={() => {
                                                  this._handleHideAction();
                                                  setTimeout(()=> {
                                                    if (action) action();
                                                  }, 200);
                                              }}>
                                <Text style={{color: '#007aff', fontSize: 17, fontWeight: (isEmpty(style) ? 'normal' : 'bold'), lineHeight: 19, textAlign: 'center'}}>{text}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                });
            }

            if (buttons.length === 2) {
                buttonStyle = (
                    <View style={{backgroundColor: '#e8e9ea', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        {
                             buttons.map((value, index, arr) => {
                                let text = value.text;
                                let style = value.style;
                                let action = value.onPress;
                                let marginLeft = (index === (arr.length - 1)) ? 1 : 0;
                                return (
                                    <View key={index} style={{flex: 1, backgroundColor: '#fff', marginTop: 1, marginLeft: marginLeft}}>
                                        <TouchableOpacity style={{height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}} 
                                                          onPress={() => {
                                                              this._handleHideAction();
                                                              setTimeout(()=> {
                                                                if (action) action();
                                                              }, 200);
                                                          }}>
                                            <Text style={{color: '#007aff', fontSize: 17, fontWeight: (isEmpty(style) ? 'normal' : 'bold'), lineHeight: 19, textAlign: 'center'}}>{text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }
                    </View>
                );
            }

            if (buttons.length > 2) {
                buttonStyle = (
                    <View style={{backgroundColor: '#e8e9ea'}}>
                        {
                             buttons.map((value, index, arr) => {
                                let text = value.text;
                                let style = value.style;
                                let action = value.onPress;
                                return (
                                    <View key={index} style={{backgroundColor: '#fff', marginTop: 1}}>
                                        <TouchableOpacity style={{height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}} 
                                                          onPress={() => {
                                                              this._handleHideAction();
                                                              setTimeout(()=> {
                                                                if (action) action();
                                                              }, 200);
                                                          }}>
                                            <Text style={{color: '#007aff', fontSize: 17, fontWeight: (isEmpty(style) ? 'normal' : 'bold'), lineHeight: 19, textAlign: 'center'}}>{text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }
                    </View>
                );
            }
        }


        return(
            <TouchableOpacity style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.25)', justifyContent: 'center'}} 
                              activeOpacity={1}
                              onPress={() => this._handleHideAction()}>
                <TouchableOpacity style={{marginHorizontal: 30, minHeight: 80, borderRadius: 9, overflow: 'hidden', backgroundColor: '#fff'}} activeOpacity={1} onPress={() => {}}>
                    <View style={{alignItems: 'center', padding: 25}}>
                        {
                            !isEmpty(title) ? (
                                <Text style={{color: '#333', fontSize: 17, fontWeight: 'bold', textAlign: 'center', lineHeight: 19}}>{title}</Text>
                            ) : (null)
                        }
                        {
                            !isEmpty(message) ? (
                                <Text style={{color: '#333', fontSize: 15, textAlign: 'center', lineHeight: 17, marginTop: 6}}>{message}</Text>
                            ) : (null)
                        }
                    </View>
                    {buttonStyle}
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    _handleHideAction = () => {
        let lastSibling = elements.pop();
        lastSibling && lastSibling.destroy();
    }
    
    
}

function isEmpty(obj) {
    /* 判断字符是否为空的方法 */
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        let str1 = obj.replace(/\s+$/,'');
        let str2 = str1.replace(/^\s+/,'');
        if(typeof str2 == "undefined" || str2 == null || str2 == ""){
            return true;
        }else{
            return false;
        }
    }
}


