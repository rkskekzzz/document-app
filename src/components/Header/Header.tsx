import { CancelIcon, ChevronDownIcon } from '@channel.io/bezier-icons'
import {
  Stack,
  Text,
  Button,
  Overlay,
  ListItem,
} from '@channel.io/bezier-react'
import { useRef } from 'react'
import { LanguageKeys } from '../../hooks/useLanguage'

type HeaderProps = {
  setLanguage: (language: LanguageKeys) => void
  language: string
}

const Header = ({ language, setLanguage }: HeaderProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  return (
    <Stack
      direction="horizontal"
      justify="between"
    >
      <Stack
        direction="horizontal"
        align="center"
      >
        <Text
          bold
          color="txt-black-darkest"
          typo="24"
        >
          사용 가이드 검색
        </Text>
        <Button
          ref={buttonRef}
          styleVariant="tertiary"
          colorVariant="monochrome-dark"
          rightContent={ChevronDownIcon}
          text={language}
        />
      </Stack>
      <Button
        styleVariant="tertiary"
        colorVariant="monochrome-dark"
        leftContent={CancelIcon}
        onClick={() => window.ChannelIOWam?.close()}
      />
      <Overlay target={buttonRef.current}>
        <Stack
          direction="vertical"
          spacing={8}
        >
          <ListItem
            onClick={() => setLanguage('ko')}
            content="한국어"
          />
        </Stack>
      </Overlay>
    </Stack>
  )
}

export default Header
