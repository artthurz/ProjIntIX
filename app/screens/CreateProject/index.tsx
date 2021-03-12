import * as React from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import DateInput from "../../components/DateInput";

import {
  SubmitButton,
  FormInput,
  Form,
} from "./styles";

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Text, View } from "../../components/Themed";
import { useState } from "react";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date);
  const [deliveryDate, setDeliveryDate] = useState(new Date);
  const [id, setId] = useState(1);
  const [projects, setProjects] = useState([{id: "0", name: "Projetão", startDate: dateFormatted(new Date), deliveryDate: dateFormatted(new Date)}]);

  const [nameRequired, setNameRequired] = useState(false);
  
  function dateFormatted(date: Date) {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt })
  }

  function handleSubmit() {
    if (name === "" || name === null || name === undefined){
      setNameRequired(true);
    } else {
      setId(id + 1);
      setProjects([...projects, {id: `${id}`, name, startDate: dateFormatted(startDate), deliveryDate: dateFormatted(deliveryDate)}]);
      setNameRequired(false);
      setName("");
    }
  }

  const rederItem = ({ item }) => (
    <>
      <Text style={styles.messageTitle}>{item.name}</Text>
        <Text style={styles.message}>Data de início: {item.startDate}</Text>
        <Text style={styles.message}>Data Estimada de Entrega: {item.deliveryDate}</Text>
        <View
        style={styles.separator2}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        />
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Projeto</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Form>
        <FormInput
          icon="person"
          placeholder="Nome do Projeto"
          value={name}
          onChangeText={setName}
        />
        {nameRequired && 
          <Text style={styles.required}>O campo Nome é obrigatório</Text>
        }
        <Text style={styles.message}>Data de início</Text>
        <DateInput date={startDate} onChange={setStartDate} />
        <Text style={styles.message}>Data estimada de entrega final</Text>
        <DateInput date={deliveryDate} onChange={setDeliveryDate} />
        <SubmitButton onPress={handleSubmit}>Criar</SubmitButton>
      </Form>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        data={projects}
        renderItem={rederItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 80
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  separator2: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
  message: {
    marginTop: 5,
  },

  messageTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  required: {
    marginTop: 5,
    marginBottom: 5,
    color: "red",
  },
});
