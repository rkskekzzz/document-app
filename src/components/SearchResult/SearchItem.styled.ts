import { Button, ButtonGroup as _ButtonGroup } from '@channel.io/bezier-react'
import styled from 'styled-components'

export const PlainLink = styled.a`
  all: unset;

  em {
    all: unset;
    color: var(--bgtxt-blue-normal);
  }
`

export const CoverImage = styled.img`
  flex-shrink: 0;
  width: 152px;
  height: 80px;

  border-radius: 4px;

  @media (max-width: 699px) {
    display: none;
  }
`

export const CopyButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
`

export const ButtonGroup = styled(_ButtonGroup)`
  z-index: 1;
  position: absolute;
  top: 14px;
  right: 14px;

  padding: 3px;

  background-color: var(--bg-white-normal);
  border-radius: 8px;
  box-shadow: var(--ev-3);
`
