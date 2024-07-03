import {
  CancelIcon,
  ChevronDownIcon,
  MobileIcon,
  TabletIcon,
} from '@channel.io/bezier-icons'
import {
  Stack,
  Text,
  Button,
  Overlay,
  ListItem,
  ButtonGroup,
  Tooltip,
} from '@channel.io/bezier-react'
import { useRef, useState } from 'react'
import { LanguageKeys, languages } from '../../hooks/useLanguage'
import { styled } from 'styled-components'

const sizes = {
  mobile: {
    width: 375,
    height: 667,
  },
  tablet: {
    width: 700,
    height: 700,
  },
}

type HeaderProps = {
  setLanguage: (language: LanguageKeys) => void
  language: LanguageKeys
}

const changeSize = (width: number, height: number) => {
  window.ChannelIOWam?.setSize({
    width,
    height,
  })
}

const Header = ({ language, setLanguage }: HeaderProps) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toMobileSize = () => {
    setIsMobile(true)
    changeSize(sizes.mobile.width, sizes.mobile.height)
  }

  const toTabletSize = () => {
    setIsMobile(false)
    changeSize(sizes.tablet.width, sizes.tablet.height)
  }

  return (
    <Stack
      direction="horizontal"
      justify="between"
      wrap
    >
      <Stack
        direction="horizontal"
        align="center"
        spacing={4}
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
          text={languages[language]}
          onClick={() => setIsShow(!isShow)}
        />
      </Stack>
      <ButtonGroup
        style={{
          alignSelf: 'flex-end',
        }}
      >
        {isMobile ? (
          <Tooltip content="태블릿 사이즈로 변경">
            <Button
              styleVariant="tertiary"
              colorVariant="monochrome-dark"
              leftContent={TabletIcon}
              onClick={toTabletSize}
            />
          </Tooltip>
        ) : (
          <Tooltip content="모바일 사이즈로 변경">
            <Button
              styleVariant="tertiary"
              colorVariant="monochrome-dark"
              leftContent={MobileIcon}
              onClick={toMobileSize}
            />
          </Tooltip>
        )}
        <Button
          styleVariant="tertiary"
          colorVariant="monochrome-dark"
          leftContent={CancelIcon}
          onClick={() => window.ChannelIOWam?.close()}
        />
      </ButtonGroup>
      <Overlay
        style={{ zIndex: 100 }}
        show={isShow}
        onHide={() => setIsShow(false)}
        target={buttonRef.current}
        position="bottom-left"
      >
        <OverlayWrapper>
          <Stack
            direction="vertical"
            width={100}
          >
            {Object.entries(languages).map(([key, value]) => (
              <ListItem
                key={key}
                active={language === key}
                onClick={() => {
                  setLanguage(key as LanguageKeys)
                  setIsShow(false)
                }}
                content={value}
              />
            ))}
          </Stack>
        </OverlayWrapper>
      </Overlay>
    </Stack>
  )
}

export default Header

const OverlayWrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  background-color: white;
`
