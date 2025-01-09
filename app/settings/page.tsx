import { NavBar } from "@/app/components/nav-bar"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[60px] relative overflow-hidden shadow-xl border-8 border-gray-900">
        <div className="h-6 w-40 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl" />
        <div className="h-full pt-8 pb-8 flex flex-col">
          <div className="text-center font-semibold mb-4">9:41</div>
          <div className="flex-1 overflow-auto px-4 space-y-4 pb-24">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p>This is the settings page. Implement your settings functionality here.</p>
          </div>
          <NavBar onCreateNew={() => {}} />
        </div>
        <div className="h-1 w-32 bg-black rounded-full mx-auto absolute bottom-2 left-1/2 transform -translate-x-1/2" />
      </div>
    </div>
  )
}

