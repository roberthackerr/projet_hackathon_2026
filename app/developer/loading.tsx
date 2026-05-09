export default function Loading() {

  return (
    <div className="animate-pulse">

      <div className="h-10 w-72 bg-slate-200 rounded mb-6" />

      <div className="grid grid-cols-3 gap-6">

        <div className="h-40 bg-slate-200 rounded-2xl" />
        <div className="h-40 bg-slate-200 rounded-2xl" />
        <div className="h-40 bg-slate-200 rounded-2xl" />

      </div>

    </div>
  )
}