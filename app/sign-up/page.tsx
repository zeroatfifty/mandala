import { SignUpForm } from "@/app/components/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[60px] relative overflow-hidden shadow-xl border-8 border-gray-900">
        <div className="h-6 w-40 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl" />
        <SignUpForm />
        <div className="h-1 w-32 bg-black rounded-full mx-auto absolute bottom-2 left-1/2 transform -translate-x-1/2" />
      </div>
    </div>
  )
}

