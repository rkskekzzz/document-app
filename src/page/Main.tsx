import Search from './Search'
import SearchEmbed from './SearchEmbed'

const Main = () => {
  if (window.ChannelIOWam?.getWamData('type') === 'plain') return <Search />
  return <SearchEmbed />
}

export default Main
