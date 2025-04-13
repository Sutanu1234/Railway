import { GalleryVerticalEnd, TrainFront } from "lucide-react"
import { SignUpForm } from "./signup-form"


export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/login" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <TrainFront className="size-4" />
            </div>
            Railway Reservation
          </a>
        </div>
        <div className="flex items-center justify-center relative overflow-visible">
          <div className="w-full">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/signup.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover grayscale-100"
        />
      </div>
    </div>
  )
}
