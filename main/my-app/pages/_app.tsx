import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import MainLayout from '../components/layout'
import 'antd/dist/antd.less'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider direction="ltr">
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ConfigProvider>
  )
}

export default MyApp
