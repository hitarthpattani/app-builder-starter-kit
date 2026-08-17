/*
 * <license header>
 */

import React from 'react'
import { createExtensionApp } from '@adobe/aio-commerce-lib-admin-ui/web'
import '@react-spectrum/s2/page.css'

import config from '#app.commerce.config'
import App from './components/App'
import './index.css'

createExtensionApp({
  menu: <App />,
  metadata: {
    extensionId: config.metadata.id
  }
})
