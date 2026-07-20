interface AppleLogoProps {
  size?: number
  className?: string
}

const APPLE_PATH =
  'M16.365 1.43c0 1.14-.462 2.096-1.386 2.87-.924.773-1.938 1.216-3.043 1.33-.114-1.128.348-2.213 1.386-3.255C14.36.87 15.552.37 16.365.13c.03.202.045.404.045.607v.693zM20.94 17.324c-.507 1.166-.767 1.688-1.435 2.72-.933 1.44-2.25 3.234-3.878 3.25-1.446.013-1.82-.943-3.784-.93-1.964.012-2.378.945-3.826.933-1.628-.016-2.87-1.63-3.803-3.07-2.6-3.997-2.874-8.687-1.27-11.184C4.98 7.334 6.7 6.32 8.313 6.32c1.64 0 2.67 1.006 4.026 1.006 1.313 0 2.11-1.006 4-1.006 1.437 0 2.958.784 4.043 2.135-3.556 1.947-2.977 6.964.558 8.868z'

export default function AppleLogo({ size = 14, className = '' }: AppleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={APPLE_PATH} />
    </svg>
  )
}
