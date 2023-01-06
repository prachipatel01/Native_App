import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {cards} from '../assets/cards';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AddressScreenStyle} from './AddressScreen';

function ActionButtons({defaultPayment}) {
  if (defaultPayment) {
    return (
      <View style={PaymentScreenStyle.alignRowButtons}>
        <Pressable style={PaymentScreenStyle.rowButtons}>
          <Text style={PaymentScreenStyle.buttonText}>EDIT</Text>
        </Pressable>
        <Pressable style={PaymentScreenStyle.rowButtons}>
          <Text style={PaymentScreenStyle.buttonText}>REMOVE</Text>
        </Pressable>
      </View>
    );
  } else {
    return <View />;
  }
}

function Payment({bank, type, cardNo, defaultPayment}) {
  return (
    <View>
      <View style={PaymentScreenStyle.innerContainer}>
        <View style={PaymentScreenStyle.alignRow}>
          <Text>{bank}</Text>
          <Text style={PaymentScreenStyle.type}>{type}</Text>
        </View>
        <View>
          <Text>CARD NUMBER: {cardNo}</Text>
        </View>
        <ActionButtons defaultPayment={defaultPayment} />
      </View>
    </View>
  );
}

export function PaymentScreen() {
  return (
    <ScrollView>
      <Pressable style={PaymentScreenStyle.button}>
        <Icon
          name="credit-card"
          size={20}
          color="black"
          style={PaymentScreenStyle.buttonText}
        />
        <Text style={PaymentScreenStyle.buttonText}>ADD NEW CARD</Text>
      </Pressable>
      <View>
        <View style={PaymentScreenStyle.innerContainer}>
          <Text style={PaymentScreenStyle.buttonText}>DEFAULT CARD</Text>
        </View>
        {cards.map((card, key) => {
          if (card.default) {
            return (
              <Payment
                bank={card.bank}
                type={card.type}
                cardNo={card.CardNo}
                defaultPayment={card.default}
                key={key}
              />
            );
          }
        })}
      </View>
      <View>
        <View style={PaymentScreenStyle.innerContainer}>
          <Text style={PaymentScreenStyle.buttonText}>OTHER CARDS</Text>
        </View>
        {cards.map((card, key) => {
          if (!card.default) {
            return (
              <Payment
                bank={card.bank}
                type={card.type}
                cardNo={card.CardNo}
                defaultPayment={card.default}
                key={key}
              />
            );
          }
        })}
      </View>
    </ScrollView>
  );
}

export const PaymentScreenStyle = AddressScreenStyle;
