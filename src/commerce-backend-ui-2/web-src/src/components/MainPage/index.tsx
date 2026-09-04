/*
 * <license header>
 */

import React from 'react'
import { View, Text, Provider, lightTheme, Heading } from '@adobe/react-spectrum'
import type { MainPageProps } from './types'
import { MainContainer } from '@adobe-commerce/aio-experience-kit'
import HomeIcon from '@spectrum-icons/workflow/Home'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ActionsForm from '../ActionsForm'
import { ToastContainer } from '@react-spectrum/toast'

export const MainPage: React.FC<MainPageProps> = ({
  runtime: runtime,
  ims,
  useActionsForm = false
}) => {
  const navigationButtons = [
    {
      label: 'Home',
      path: '/',
      icon: <HomeIcon size={'S'} gridArea="Home" marginEnd={'size-100'} />
    }
  ]
  const appRoutes = [
    {
      paths: ['/'],
      component: (
        <View>
          <Heading level={1}>Home</Heading>
          <Text>Welcome to the Home page</Text>
        </View>
      )
    }
  ]

  const renderActionsForm = () => (
    <HashRouter>
      <Provider theme={lightTheme} colorScheme={'light'}>
        <Routes>
          <Route index element={<ActionsForm ims={ims} runtime={runtime} />} />
        </Routes>
      </Provider>
    </HashRouter>
  )

  const renderMainContainer = () => (
    <Provider theme={lightTheme} colorScheme={'light'}>
      <MainContainer
        buttons={navigationButtons}
        routes={appRoutes}
        padding={'size-0'}
        navigationMarginTop={'size-250'}
        navigationMarginBottom={'size-250'}
      />
      <ToastContainer placement="top end" />
    </Provider>
  )

  // Switch between ActionsForm and MainContainer views
  const renderView = () => (useActionsForm ? renderActionsForm() : renderMainContainer())

  return <View width="size-6000">{renderView()}</View>
}
