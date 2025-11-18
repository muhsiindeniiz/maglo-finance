import { forwardRef, SVGProps } from 'react';

interface SearchIconProps extends SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
}

const SearchIcon = forwardRef<SVGSVGElement, SearchIconProps>(
    ({ width, height, className, ...props }, ref) => {
        return (
            <svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ref={ref}
                className={className}
                {...props}
            >
                <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20.9999 21L16.6499 16.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
);

SearchIcon.displayName = 'SearchIcon';
export default SearchIcon;