import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import styled, { css } from 'styled-components'
import rangeParser from 'parse-numeric-range'
import { useCallback } from 'react'
import Image from 'next/image'

import { copyToClipboard } from 'application/utils/copy'
import { COPY_FAILURE, COPY_SUCCESS } from 'application/constants/common'

type Props = {
  children: string
  className: string
}

const Code = ({ className, children }: Props) => {
  const match = /language-(\w+)/.exec(className || '')

  /**
   * @description
   * ```jsx{1,2,3-5}
   * ```
   * 다음의 경우, 1,2,3,4,5 줄에서 true를 반환합니다.
   */
  const isHighlightLine = useCallback(
    (index: number) => {
      const RE = /{([\d,-]+)}/
      const strlineNumbers = RE.exec(className)?.[1]

      if (strlineNumbers) {
        const lineNumbers = rangeParser(strlineNumbers)

        return lineNumbers.includes(index + 1)
      }

      return false
    },
    [className]
  )

  const copyCode = () => {
    copyToClipboard({
      text: children,
      onSuccess: () => alert(COPY_SUCCESS),
      onFailure: () => alert(COPY_FAILURE),
    })
  }

  return match ? (
    <Wrapper>
      <CopyCodeButton onClick={copyCode}>
        <Image
          src="/copy.svg"
          alt="code-copy_icon"
          width="24px"
          height="24px"
        />
      </CopyCodeButton>
      <HighlightWrapper>
        <Highlight
          {...defaultProps}
          language={match[1] as Language}
          code={children}
          theme={theme}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <LineContainer>
              {tokens.map((line, i) => (
                <Line
                  key={`code-line_${i}`}
                  {...getLineProps({
                    line,
                    key: i,
                  })}
                  $isHighlight={isHighlightLine(i)}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </Line>
              ))}
            </LineContainer>
          )}
        </Highlight>
      </HighlightWrapper>
    </Wrapper>
  ) : (
    <code>{children}</code>
  )
}
export default Code

const PADDING_X = {
  pc: '15px',
  tablet: '10px',
} as const

const Wrapper = styled.div`
  position: relative;
`

const HighlightWrapper = styled.pre`
  padding: ${PADDING_X.pc};
  border-radius: 10px;
  background-color: #212121;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      padding: ${PADDING_X.tablet};
    }
  `}
`

const CopyCodeButton = styled.button`
  position: absolute;
  top: ${PADDING_X.pc};
  right: ${PADDING_X.pc};
  width: 32px;
  height: 32px;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.color.darkGray};
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.color.gray};
  }

  ${({ theme }) => css`
    ${theme.media.tablet} {
      top: ${PADDING_X.tablet};
      right: ${PADDING_X.tablet};
    }
  `}
`

const LineContainer = styled.div`
  width: 100%;

  ${({ theme }) => theme.font.body_1};
  padding: 0;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      ${theme.font.body_2}
    }
  `}

  .comment {
    color: #999 !important;
  }
  .imports.maybe-class-name {
    color: #f8f8f2 !important;
  }
  .keyword {
    color: #c490e5 !important;
  }
  .function {
    color: #81a9fd !important;
  }
  .parameter,
  .maybe-class-name {
    color: #ffcb6b !important;
  }
  .module {
    color: #88deff !important;
  }
  .string {
    color: #c0e58b !important;
  }

  .literal-property {
    color: #f8f8f2 !important;
  }
  .plain {
    color: #e8f8f9 !important;
  }
`

const Line = styled.div<{ $isHighlight: boolean }>`
  display: flex;
  flex-wrap: wrap;

  ${({ $isHighlight }) =>
    $isHighlight &&
    css`
      background-color: rgb(47, 53, 60);
    `}

  &:hover {
    background-color: rgb(53, 59, 69);
  }
`
