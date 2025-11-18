import { forwardRef, SVGProps } from 'react'

interface SearchIconProps extends SVGProps<SVGSVGElement> {
  width?: number | string
  height?: number | string
}

const SearchIcon = forwardRef<SVGSVGElement, SearchIconProps>(
  ({ width, height, className, ...props }, ref) => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
          stroke="#929EAE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.9999 19L14.6499 14.65"
          stroke="#929EAE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

SearchIcon.displayName = 'SearchIcon'
export default SearchIcon
