import { useEffect } from 'react'
import { Stack } from '@channel.io/bezier-react'
import { Command } from 'cmdk'
import styled from 'styled-components'
import { Header } from '../components/Header'
import { useLanguage } from '../hooks/useLanguage'
import { DynamicBox } from './Global.styled'

const Iframe = styled.iframe`
  all: unset;
  height: 100%;
  width: 100%;
`

function SearchEmbed() {
  const { language, setLanguage } = useLanguage()

  useEffect(function initialize() {
    window.ChannelIOWam?.setSize({
      width: 700,
      height: 700,
    })
  }, [])

  return (
    <Command shouldFilter={false}>
      <DynamicBox height={700}>
        <Stack
          direction="vertical"
          spacing={24}
          height="100%"
        >
          <Header
            language={language}
            setLanguage={setLanguage}
          />
          <Iframe src={`https://docs.channel.io/help/${language}?query=`} />
        </Stack>
      </DynamicBox>
    </Command>
  )
}

export default SearchEmbed
