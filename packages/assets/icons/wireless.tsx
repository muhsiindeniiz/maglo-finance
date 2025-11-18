import { forwardRef } from 'react'

interface WirelessProps {
  width?: number | string
  height?: number | string
}

const Wireless = forwardRef<SVGSVGElement, WirelessProps>(
  ({ width = 34, height = 33, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 23 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M11.3558 5.00134C16.0591 10.9138 16.0591 18.6 11.3558 24.5125M16.2858 1.00005C22.9158 9.33255 22.9158 20.1675 16.2858 28.5M6.18494 7.58635C9.64161 11.9176 9.6416 17.5688 6.18494 21.9M0.999939 11.1751C2.72827 13.3475 2.72827 16.1663 0.999939 18.3388"
          stroke="#363B41"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

Wireless.displayName = 'Wireless'

export default Wireless
