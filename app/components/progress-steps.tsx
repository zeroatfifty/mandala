import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  steps: string[]
  currentStep: number
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="flex justify-between w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                index <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-gray-600">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-[2px] w-12 mx-2",
                index < currentStep ? "bg-blue-500" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

