import * as React from "react";
import { StyleSheet, FlatList } from "react-native";

import { SubmitButton, FormInput, Form } from "./styles";

import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import { Text, View } from "../../components/Themed";
import { useState } from "react";

export default function CreateRequirement() {
  const [description, setDescription] = useState("");
  const [importanceLevel, setImportanceLevel] = useState("Baixa");
  const [difficultyLevel, setDifficultyLevel] = useState("Fácil");
  const [hours, setHours] = useState("");
  const [id, setId] = useState(1);
  
  const [requirements, setRequirement] = useState([
    { id: "0", description: "RF - Construir uma interface para recebimento de requisitos", registerDate: dateFormatted(new Date()), importanceLevel: "Baixa", difficultyLevel: "Fácil", hours: "24" },
  ]);

  const [descriptionRequired, setDescriptionRequired] = useState(false);
  const [hoursRequired, setHoursRequired] = useState(false);

  function dateFormatted(date: Date) {
    return format(date, "dd 'de' MMMM 'de' yyyy 'as' k':'m", { locale: pt });
  }

  function handleSubmit() {
    if (description === "" || description === null || description === undefined){
      setDescriptionRequired(true);
      setHoursRequired(false);
    }else if (hours === "" || hours === null || hours === undefined) {
      setHoursRequired(true);
      setDescriptionRequired(false);
    }else {
      setId(id + 1);
      setRequirement([
        ...requirements,
        { id: `${id}`, description, registerDate: dateFormatted(new Date()), importanceLevel, difficultyLevel, hours },
      ]);
      setDescription("");
      setImportanceLevel("Baixa");
      setDifficultyLevel("Fácil");
      setHours("");
      setDescriptionRequired(false);
      setHoursRequired(false);
    }
  }

  const rederItem = ({ item }) => (
    <>
      <Text style={styles.messageTitle}>{item.description}</Text>
      <Text style={styles.message}>Registrado: {item.registerDate}</Text>
      <Text style={styles.message}>Importancia: {item.importanceLevel}</Text>
      <Text style={styles.message}>Dificuldade: {item.difficultyLevel}</Text>
      <Text style={styles.message}>Horas para realizar: {item.hours}</Text>
      <View
        style={styles.separator2}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Requisito</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Form>
        <FormInput
          icon="person"
          required
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        {descriptionRequired &&
          <Text style={styles.required}>O campo Descrição é obrigatório</Text>
        }
        <Text style={styles.message}>Nível de importância deste requisito</Text>
        <Picker
          selectedValue={importanceLevel}
          mode="dropdown"
          style={{ height: 46, backgroundColor: "rgba(209, 209, 214, 0.2);"}}
          onValueChange={(itemValue, itemIndex) =>
          setImportanceLevel(itemValue)
        }>
          <Picker.Item label="Baixa" value="1" />
          <Picker.Item label="Média" value="2" />
          <Picker.Item label="Alta" value="3" />
        </Picker>
        <Text style={styles.message}>Nível de dificuldade de implementar</Text>
        <Picker
          selectedValue={difficultyLevel}
          mode="dropdown"
          style={{ height: 46, backgroundColor: "rgba(209, 209, 214, 0.2);"}}
          onValueChange={(itemValue, itemIndex) =>
            setDifficultyLevel(itemValue)
        }>
          <Picker.Item label="Fácil" value="1" />
          <Picker.Item label="Médio" value="2" />
          <Picker.Item label="Dfícil" value="3" />
        </Picker>
        <Text style={styles.message}>Tempo Estimado para Construção e Entrega</Text>
        <FormInput
          icon="timelapse"
          placeholder="Horas"
          keyboardType="number-pad"
          value={hours}
          onChangeText={setHours}
        />
        {hoursRequired &&
          <Text style={styles.required}>O campo Horas é obrigatório</Text>
        }
        <SubmitButton disabled onPress={handleSubmit}>Criar</SubmitButton>
      </Form>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
        <FlatList
          data={requirements}
          style={{ marginLeft: 40, marginRight: 40}}
          renderItem={rederItem}
          keyExtractor={(item) => item.id}
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
    marginTop: 80,
  },
  messageTitle: {
    fontSize: 14,
    fontWeight: "bold",
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
    marginBottom: 5,
  },
  required: {
    marginTop: 5,
    marginBottom: 5,
    color: "red",
  },
});
