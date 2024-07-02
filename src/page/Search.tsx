import { useEffect, useState } from 'react'
import { Box, Button, Stack, Text, TextField } from '@channel.io/bezier-react'
import { Command } from 'cmdk'
import { CancelIcon } from '@channel.io/bezier-icons'
import { useDebouncedCallback } from 'use-debounce'
import { searchDocument } from '../api/space'
import { SearchResult } from '..//components/SearchResult'
import { SearchResultType, deserialize } from '../model/search'

function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<SearchResultType[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setIsError] = useState<boolean>(false)

  const debounced = useDebouncedCallback((value: string) => {
    setIsLoading(true)
    searchDocument({
      query: { keyword: value },
      systemDomain: 'help',
      languageCode: 'ko',
    })
      .then((res) => {
        setSearchResult(deserialize(res))
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, 500)

  useEffect(function initialize() {
    window.ChannelIOWam?.setSize({
      width: 700,
      height: 700,
    })
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    debounced(e.target.value)
  }

  return (
    <Command shouldFilter={false}>
      <Box
        padding={24}
        height={700}
      >
        <Stack
          direction="vertical"
          spacing={24}
          height="100%"
        >
          <Stack
            direction="horizontal"
            justify="between"
          >
            <Text
              bold
              color="txt-black-darkest"
              typo="24"
            >
              사용 가이드 검색
            </Text>
            <Button
              styleVariant="tertiary"
              colorVariant="monochrome-dark"
              leftContent={CancelIcon}
              onClick={() => window.ChannelIOWam?.close()}
            />
          </Stack>
          <TextField
            size="m"
            allowClear
            wrapperStyle={{ flexShrink: 0 }}
            placeholder="검색어를 입력하세요"
            autoFocus
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) {
                e.stopPropagation()
              }
            }}
          />
          {searchResult && (
            <SearchResult
              hasSearchQuery={searchQuery.length > 0}
              searchResult={searchResult}
              isLoading={isLoading}
            />
          )}
        </Stack>
      </Box>
    </Command>
  )
}

export default Search
