import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'

import UserDataContext from '../App/UserDataContext'

import ReportsUser from './ReportsUser'
import ShowReportsAndEdit from './ShowReportsAndEdit'
import FAQsEdit from '../FAQsEdit'
import AddQuestion from '../AddQuestion'

const Reports = () => {
  return (
    <UserDataContext.Consumer>
      {({ data }) => {
        switch (data.Type) {
          case 'Usuario':
          case 'Fotografo':
            return <ReportsUser />
          case 'Operador':
          case 'Gerente Soporte':
          case 'Ing. Soporte':
          case 'Ing. Mantenimiento':
          case 'Gerente Mantenimiento':
            return <ShowReportsAndEdit />

          case 'Administrador':
            return 'Administrador'

          case 'Editor':
            return (
              <ScrollView>
                <FAQsEdit />
                <AddQuestion />
              </ScrollView>
            )
        }
      }}
    </UserDataContext.Consumer>
  )
}

export default Reports
