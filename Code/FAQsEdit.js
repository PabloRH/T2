import React, { Fragment } from 'react'
import { Button } from 'react-native-paper'

import { Colors, ActivityIndicator, DataTable } from 'react-native-paper'
import { TextInput } from 'react-native-paper'
import { View, ScrollView, Picker } from 'react-native'

import MyHeader from './Header'
import MyStyles from './Styles'

import UserDataContext from './App/UserDataContext'

class FAQsEdit extends React.Component {
  state = { questions: [] }

  componentDidMount() {
    console.log(this.props.data)
    this.setState({ loading: true })

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }

    fetch('http://pablorosas.pythonanywhere.com/GetPreg', options)
      .then(response => {
        this.setState({ loading: false })
        if (response.ok) return response.json()
        else alert('Algo fue mal con el ')
      })
      .then(questions => this.setState({ questions }))
  }

  sendToDB = () => {
    const data = { ...this.state }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    console.log(options)

    fetch('http://pablorosas.pythonanywhere.com/UpdatePreg', options)
      .then(response => {
        this.setState({ loading: false })

        if (response.ok) return response.json()
        else alert('Algo fue mal con el servidor')
      })
      .then(() => {
        this.setState({ loading: false })
      })
    this.setState({ loading: true })
  }

  render() {
    return (
      <Fragment>
        <MyHeader
          text="FAQ's"
          subtitle={this.props.data.Type}
          link="/"
          hasSetting
        />
        <View style={{ marginBottom: 85 }}>
          <ScrollView contentContainerStyle={MyStyles.content}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Pregunta</DataTable.Title>
                <DataTable.Title >Respuesta</DataTable.Title>
                <DataTable.Title numeric>Likes</DataTable.Title>
                <DataTable.Title numeric>Dislikes</DataTable.Title>
                <DataTable.Title numeric>#</DataTable.Title>
              </DataTable.Header>

              {this.state.questions.map(question => {
                console.log(question)
                return (
                  <DataTable.Row
                    key={question.IDPregu}
                    onPress={() => {
                      this.setState({ ...question })
                    }}
                  >
                    <DataTable.Cell>{question.Pregunta}</DataTable.Cell>
                    <DataTable.Cell >{question.Respuesta}</DataTable.Cell>
                    <DataTable.Cell numeric>{question.Likes}</DataTable.Cell>
                    <DataTable.Cell numeric>{question.Dislikes}</DataTable.Cell>
                    <DataTable.Cell numeric>{question.NoPregu}</DataTable.Cell>
                  </DataTable.Row>
                )
              }
              )}
            </DataTable>

            <View>
              <View style={MyStyles.sideIcon}>
                <TextInput
                  label="Numero de Pregunta"
                  mode="outlined"
                  keyboardType="numeric"
                  style={MyStyles.input}
                  value={this.state.NoPregu && this.state.NoPregu.toString()}
                  onChange={e => this.setState({ NoPregu: e.nativeEvent.text })}
                />
              </View>

              <View style={MyStyles.sideIcon}>
                <TextInput
                  label="Pregunta"
                  mode="outlined"
                  multiline
                  style={MyStyles.input}
                  value={this.state.Pregunta}
                  onChange={e => this.setState({ Pregunta: e.nativeEvent.text })}
                />
              </View>

              <View style={MyStyles.sideIcon}>
                <TextInput
                  label="Respuesta"
                  mode="outlined"
                  multiline
                  style={MyStyles.input}
                  value={this.state.Respuesta}
                  onChange={e => this.setState({ Respuesta: e.nativeEvent.text })}
                />
              </View>
            </View>

            <Button
              icon="refresh"
              mode="outlined"
              style={MyStyles.btn}
              onPress={this.sendToDB}
            >
              Refresh FAQs
            </Button>

            {this.state.loading && (
              <ActivityIndicator
                animating={true}
                size={'large'}
                color={Colors.red800}
              />
            )}
          </ScrollView>
        </View>
      </Fragment>
    )
  }
}

const ContextWrapper = props => (
  <UserDataContext.Consumer>
    {({ data }) => <FAQsEdit {...props} data={data} />}
  </UserDataContext.Consumer>
)

export default ContextWrapper
