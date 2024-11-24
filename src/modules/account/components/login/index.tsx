// src/modules/account/components/login/index.tsx

import { useState } from "react"
import HCaptcha from "@hcaptcha/react-hcaptcha"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

type FormData = {
  email: string
  password: string
}

const Login = ({ setCurrentView }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [message, setMessage] = useState<string | null>(null)
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleHCaptchaVerify = (token: string | null) => {
    setHCaptchaToken(token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!hCaptchaToken) {
      setMessage("Please complete the hCaptcha challenge.")
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      // Send form data along with hCaptcha token to the server
      const response = await login({
        email: formData.email,
        password: formData.password,
        "h-captcha-response": hCaptchaToken,
      })

      if (response.success) {
        // Handle successful login, e.g., redirect or update UI
      } else {
        setMessage(response.error || "Login failed. Please try again.")
        // Optionally reset hCaptcha
        setHCaptchaToken(null)
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.")
      // Optionally reset hCaptcha
      setHCaptchaToken(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            data-testid="password-input"
          />
        </div>

        {/* hCaptcha Widget */}
        <div className="my-4 w-full">
          <HCaptcha
            sitekey="YOUR_HCAPTCHA_SITE_KEY"
            onVerify={handleHCaptchaVerify}
          />
        </div>

        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6"
          disabled={!hCaptchaToken || isSubmitting} // Disable until hCaptcha is completed or during submission
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
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
    </div>
  )
}

export default Login
