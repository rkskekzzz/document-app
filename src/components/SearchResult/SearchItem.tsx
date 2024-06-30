import { FolderIcon, LinkCopyIcon, PageIcon } from '@channel.io/bezier-icons'
import {
  Button,
  Icon,
  Stack,
  Text,
  ToastProvider,
  Tooltip,
  useToast,
} from '@channel.io/bezier-react'
import { Command } from 'cmdk'

import {
  SearchResultType,
  getDescription,
  getTitle,
  isCategory,
} from '../../model/search'
import { getWebsiteUrl as getArticleWebsiteUrl } from '../../model/article'
import { getWebsiteUrl as getCategoryWebsiteUrl } from '../../model/category'
import { getCoverImageUrl as getArticleCoverImageUrl } from '../../model/article'
import { getCoverImageUrl as getCategoryCoverImageUrl } from '../../model/category'
import * as Styled from './SearchItem.styled'
import { useState } from 'react'

const removeHTMLTags = (str: string) => str.replace(/<[^>]*>?/gm, '')

export default function SearchItem({
  searchItem,
}: {
  searchItem: SearchResultType
}) {
  const toast = useToast()
  const [isHover, setIsHover] = useState(false)
  const title = getTitle(searchItem.hit)
  const description = getDescription(searchItem.hit)

  const coverImageUrl =
    'category' in searchItem
      ? getCategoryCoverImageUrl(searchItem.category)
      : getArticleCoverImageUrl(searchItem.article)
  const websiteUrl =
    'category' in searchItem
      ? getCategoryWebsiteUrl(searchItem.category)
      : getArticleWebsiteUrl(searchItem.article)

  const plainText = removeHTMLTags(description)
  const encodedText = encodeURIComponent(plainText)

  return (
    <Styled.PlainLink
      href={`${websiteUrl}#:~:text=${encodedText}`}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Command.Item
        key={searchItem.hit.source.id}
        value={searchItem.hit.source.id}
      >
        <Stack
          direction="horizontal"
          align="center"
          justify="between"
        >
          <Stack
            direction="vertical"
            spacing={2}
          >
            <Stack
              direction="horizontal"
              spacing={4}
            >
              <Icon
                source={isCategory(searchItem.hit) ? FolderIcon : PageIcon}
                size="s"
                color="bg-black-darkest"
              />
              <Text
                typo="16"
                bold
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </Stack>
            <Stack
              direction="horizontal"
              paddingHorizontal={24}
            >
              <Stack
                direction="vertical"
                paddingLeft={2}
                paddingTop={2}
                spacing={8}
              >
                <Text
                  typo="14"
                  style={{ lineHeight: '20px', maxHeight: '40px' }}
                  truncated={2}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          {coverImageUrl && (
            <Styled.CoverImage
              alt="preview"
              src={coverImageUrl}
            />
          )}
        </Stack>

        {isHover && (
          <Styled.ButtonGroup withoutSpacing>
            <Tooltip
              placement="bottom-center"
              content={'링크 복사'}
            >
              <Button
                leftContent={LinkCopyIcon}
                styleVariant="tertiary"
                colorVariant="monochrome-dark"
                size="s"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  navigator.clipboard.writeText(
                    `${websiteUrl}#:~:text=${encodedText}`
                  )
                  toast.addToast('링크가 복사되었습니다.', {
                    preset: 'success',
                  })
                }}
              />
            </Tooltip>
          </Styled.ButtonGroup>
        )}
      </Command.Item>
    </Styled.PlainLink>
  )
}
