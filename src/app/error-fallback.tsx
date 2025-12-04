import { useNavigate, useRouteError } from "react-router";
import { Bug, RefreshCw } from "lucide-react";
import brokenHeart from "../assets/error.svg";

// Development mode check
const isDev = import.meta.env.DEV;

/**
 * Dev-only stack info box
 */
const DevErrorDetails = ({ error }: { error: Error }) => (
  <div className="mb-6 rounded-md border border-red-300 bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-100">
    <div className="mb-2 flex items-center gap-2 font-semibold">
      <Bug className="size-4" />
      Development Error Info
    </div>

    <div className="mb-2">
      <strong>Message:</strong> {error.message}
    </div>

    {error.stack && (
      <pre className="max-h-96 whitespace-pre-wrap wrap-break-word overflow-y-auto rounded bg-red-100 p-2 text-sm dark:bg-red-800/30">
        {error.stack}
      </pre>
    )}
  </div>
);

/**
 * Action buttons (pure Tailwind)
 */
const ErrorActions = ({
  onRetry,
  onHome,
}: {
  onRetry?: () => void;
  onHome: () => void;
}) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex cursor-pointer items-center gap-2 rounded-md bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm"
        >
          <RefreshCw className="size-4" />
          {isDev ? "Try Again" : "Retry"}
        </button>
      )}

      <button
        onClick={onHome}
        className="rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100 px-4 py-2 text-sm"
      >
        {isDev ? "Return Home" : "Go Home"}
      </button>
    </div>
  );
};

/**
 * Basic heading + info wrapper
 */
const ErrorInfo = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) => (
  <>
    <h1 className="mb-2 text-2xl font-bold">{title}</h1>
    <h2 className="mb-4 text-gray-600">{subtitle}</h2>
    {!isDev && (
      <p className="text-sm text-gray-500 mb-2">
        If the issue continues, you may contact support.
      </p>
    )}
    {children}
  </>
);

/**
 * Main Error Fallback component
 */
export const ErrorFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary?: () => void;
}) => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  const handleRetry = () => {
    if (resetErrorBoundary) return resetErrorBoundary();
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row">
        {/* Left section */}
        <div className="flex-1">
          <ErrorInfo
            title={
              isDev
                ? "Oops! A wild bug appeared!"
                : "Something went wrong :("
            }
            subtitle={
              isDev
                ? "This error occurred during development. Check logs for details."
                : "We encountered an unexpected problem."
            }
          >
            {isDev ? (
              <DevErrorDetails error={error} />
            ) : (
              <p className="text-gray-600 text-sm mb-6">
                Please try again or return to the homepage.
              </p>
            )}

            <ErrorActions
              onRetry={handleRetry}
              onHome={() => navigate("/")}
            />
          </ErrorInfo>
        </div>

        {/* Right section (image only in prod) */}
        {!isDev && (
          <div className="w-full max-w-[260px] md:max-w-[380px]">
            <img src={brokenHeart} alt="Error Illustration" className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};
