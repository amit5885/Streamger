import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Searchbar() {
  const [shouldShowSearchBar, setShouldShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState(searchValue)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchValue])

  useEffect(() => {
    if (debouncedValue.trim() !== '') {
      navigate({ to: '/search', search: { movie: debouncedValue } })
    }
  }, [debouncedValue, navigate])

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
    setSearchValue(value)
  }

  const handleBlur = () => {
    setTimeout(() => setShouldShowSearch(false), 200)
  }

  const handleSearchClick = () => {
    setShouldShowSearch(true)
  }

  return (
    <div className="flex items-center">
      {shouldShowSearchBar ? (
        <div className="flex items-center bg-black/80 border border-white/20 rounded-sm px-3 py-2 sm:w-full md:min-w-70 backdrop-blur-sm">
          <Search size={20} className="text-white/70 mr-3 shrink-0" />
          <input
            className="bg-transparent text-white placeholder:text-white/70 text-sm focus:outline-none flex-1 font-normal"
            type="text"
            placeholder="Search for movies or TV shows"
            aria-label="Search"
            value={searchValue}
            onChange={handleSearchQueryChange}
            onBlur={handleBlur}
            autoFocus
          />
        </div>
      ) : (
        <button
          onClick={handleSearchClick}
          className="p-2 hover:bg-white/10 rounded-sm transition-colors duration-200"
          aria-label="Search"
        >
          <Search size={24} className="text-white" />
        </button>
      )}
    </div>
  )
}
