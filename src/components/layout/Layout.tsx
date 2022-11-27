import React from 'react'
import styled, { css } from 'styled-components'
import Head from 'next/head'

import { EN_NAME } from '@/domain/owner/constant'

import Navbar, { NAVBAR_HEIGHT } from './Navbar'
import Footer, { FOOTER_HEIGHT } from './Footer'
import Frame from './Frame'

type Props = {
  children: React.ReactNode
  title?: string
  resetFrameStyle?: boolean
}

const Layout = ({ children, title, resetFrameStyle }: Props) => {
  return (
    <LayoutFrame>
      <Head>
        {!!title && <title>{`${title} | ${EN_NAME.first}'s log`}</title>}
        {/* @todo add meta tag */}
        {/* <meta name="meta name" content="meta content" /> */}
      </Head>
      <Navbar />

      {resetFrameStyle ? (
        <main>{children}</main>
      ) : (
        <Main css={mainStyle} asTag="main">
          {children}
        </Main>
      )}

      <Footer />
    </LayoutFrame>
  )
}

export default Layout

const LayoutFrame = styled.div`
  display: flex;
  flex-direction: column;
`
const mainStyle = css`
  padding-top: calc(${NAVBAR_HEIGHT}px + 40px);
`

/**
 * @note styled-component를 '컴포넌트'로 확장해서 사용할 때, 태그의 타입을 변경하면 className을 전달해주어도 스타일이 상속되지 않음.
 * 컴포넌트를 확장했을 때 props를 as로 넘기지 않고 다른 이름으로 넘기면 가능
 * styled-component를 확장하여 사용할 때는 태그 변경해도 상속 가능
 */
const Main = styled(Frame)`
  display: flex;
  flex-direction: column;
  min-height: calc((100vh - ${FOOTER_HEIGHT}px));
`
