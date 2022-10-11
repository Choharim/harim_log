import { InferGetStaticPropsType } from 'next'
import styled from 'styled-components'

import { NextPageWithLayout } from './_app'
import { getAllPosts } from 'domain/post/util'

import PostCardLink from 'application/components/post/PostCardLink'
import Layout from 'application/components/layout/Layout'

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  return (
    <CardList>
      {posts?.map(({ data, slug }) => (
        <PostCardLink key={slug} data={data} slug={slug} />
      ))}
    </CardList>
  )
}

export default Home

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout title="홈">{page}</Layout>
}

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: { posts },
  }
}

const CardList = styled.div`
  margin-top: 59px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`
