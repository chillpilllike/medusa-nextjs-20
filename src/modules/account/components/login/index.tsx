import { useState, useEffect } from "react"
import Script from "next/script"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null)

  // Optional: Reset hCaptcha token on form submission or error
  useEffect(() => {
    if (message) {
      setHCaptchaToken(null)
    }
  }, [message])

  const handleHCaptcha = (token: string | null) => {
    setHCaptchaToken(token)
  }

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      {/* Load hCaptcha script */}
      <Script
        src="https://hcaptcha.com/1/api.js"
        strategy="lazyOnload"
        onLoad={() => console.log("hCaptcha script loaded")}
      />

      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form
        className="w-full"
        action={formAction}
        method="POST"
        onSubmit={(e) => {
          if (!hCaptchaToken) {
            e.preventDefault()
            alert("Please complete the hCaptcha challenge.")
          }
        }}
      >
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        {/* hCaptcha Widget */}
        <div
          className="h-captcha my-4"
          data-sitekey="dfe03066-e8da-48da-a954-b578e0d672e4"
          data-callback="onHCaptchaSuccess"
          data-expired-callback="onHCaptchaExpired"
        ></div>

        {/* Hidden input to store hCaptcha token */}
        <input
          type="hidden"
          name="h-captcha-response"
          value={hCaptchaToken || ""}
        />

        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6"
          disabled={!hCaptchaToken} // Disable button until hCaptcha is completed
        >
          Sign in
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>

      {/* hCaptcha Callback Handlers */}
      <Script id="hcaptcha-callback">
        {`
          function onHCaptchaSuccess(token) {
            // Notify React component about the token
            window.dispatchEvent(new CustomEvent('hcaptcha-success', { detail: token }));
          }

          function onHCaptchaExpired() {
            // Notify React component that hCaptcha expired
            window.dispatchEvent(new CustomEvent('hcaptcha-expired'));
          }
        `}
      </Script>

      {/* Event Listeners for hCaptcha Callbacks */}
      <Script
        id="hcaptcha-event-listeners"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('hcaptcha-success', function(e) {
              const event = new CustomEvent('set-hcaptcha-token', { detail: e.detail });
              window.dispatchEvent(event);
            });

            window.addEventListener('hcaptcha-expired', function() {
              const event = new CustomEvent('set-hcaptcha-token', { detail: null });
              window.dispatchEvent(event);
            });
          `,
        }}
      />

      {/* React-side event handling */}
      <Script
        id="react-hcaptcha-handler"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function handleHCaptchaEvents(event) {
                if (event.type === 'set-hcaptcha-token') {
                  window.dispatchEvent(new CustomEvent('react-set-hcaptcha-token', { detail: event.detail }));
                }
              }

              window.addEventListener('set-hcaptcha-token', handleHCaptchaEvents);
            })();
          `,
        }}
      />

      {/* React useEffect to listen for hCaptcha events */}
      <Script
        id="react-listener"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              window.addEventListener('react-set-hcaptcha-token', function(e) {
                if (typeof window.setHCaptchaToken === 'function') {
                  window.setHCaptchaToken(e.detail);
                }
              });
            })();
          `,
        }}
      />
    </div>
  )
}

export default Login
