import { Box, Spinner, Stack, Text } from '@channel.io/bezier-react'
import { Command } from 'cmdk'

import type { SearchResultType } from '../../model/search'

import SearchItem from './SearchItem'
import { useTranslation } from 'react-i18next'

import * as Styled from './SearchResult.styled'

function SearchResult({
  hasSearchQuery,
  searchResult,
  isLoading,
}: {
  hasSearchQuery: boolean
  searchResult: SearchResultType[] | null
  isLoading: boolean
}) {
  const { t } = useTranslation()

  return (
    <Styled.Container>
      {hasSearchQuery && (
        <Command.List>
          {isLoading ? (
            <Command.Loading>
              <Box
                position="absolute"
                left="50%"
                top="50%"
              >
                <Spinner
                  size="xl"
                  color="bg-black-dark"
                />
              </Box>
            </Command.Loading>
          ) : (
            <Command.Group
            // heading={t('search.result', {
            //   replace: searchResult?.length.toString() || '0',
            // })}
            >
              <Command.Empty>
                <Stack
                  direction="vertical"
                  align="center"
                  justify="center"
                  spacing={20}
                >
                  {/* <img
                    width={120}
                    alt="search-result-empty"
                    src={SearchResultEmpty}
                  /> */}
                  <Text
                    typo="14"
                    color="txt-black-dark"
                    align="center"
                    style={{ lineHeight: '20px' }}
                  >
                    {t('search.no_result')}
                  </Text>
                </Stack>
              </Command.Empty>
              {searchResult?.map((searchItem) => (
                <SearchItem
                  key={searchItem.hit.source.id}
                  searchItem={searchItem}
                />
              ))}
            </Command.Group>
          )}
        </Command.List>
      )}
    </Styled.Container>
  )
}

export default SearchResult
