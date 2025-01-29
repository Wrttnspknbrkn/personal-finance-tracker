export function BackgroundPattern() {
  return (
    <svg
      className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 0)"
        >
          <circle cx="25" cy="25" r="8" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern-circles)" />
    </svg>
  )
}

