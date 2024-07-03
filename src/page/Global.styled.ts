import { Box } from '@channel.io/bezier-react'
import styled from 'styled-components'

export const DynamicBox = styled(Box)`
  padding: 24px;

  @media (width < 700) {
    padding: 12px;
  }
`
