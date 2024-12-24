
/* eslint-disable react/prop-types */
import { ChevronRight } from 'lucide-react'

export function PodcastButton(props) {
  const { podcast, handlePodcastClick } = props
  return (
    <div 
      key={podcast.id}
      onClick={() => handlePodcastClick(podcast)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{podcast.title}</h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <p className="mt-2 text-gray-600">{podcast.description}</p>
      </div>
    </div>
  )
}