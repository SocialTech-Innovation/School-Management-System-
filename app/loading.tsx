export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Graduation Cap Animation */}
        <div className="relative w-24 h-24">
          <svg
            className="w-24 h-24 text-blue-600 dark:text-blue-500 animate-bounce"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cap Top */}
            <path
              d="M2 9L12 4L22 9L12 14L2 9Z"
              fill="currentColor"
              className="opacity-90"
            />
            {/* Cap Base */}
            <path
              d="M4 10V14C4 15.1046 7.58172 17 12 17C16.4183 17 20 15.1046 20 14V10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-90"
            />
            {/* Tassel */}
            <path
              d="M12 14V18M12 18L11 20M12 18L13 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Loading Dots */}
        <div className="flex gap-1 justify-center">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
