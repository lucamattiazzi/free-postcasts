/* eslint-disable react/prop-types */
import { decode } from "he"
import { Pause, Play } from 'lucide-react'

import { useEffect, useState } from "react"
import { formatTime, getPodcast } from './utils'

export function Podcast(props) {
  const {
    podcast,
    handleBack,
    togglePlayPause,
    isPlaying,
    currentEpisode,
    audioRef,
    handleSliderChange,
    handleTimeUpdate,
    handleLoadedMetadata,
    currentTime,
    duration,
    setIsPlaying
  } = props
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    getPodcast(podcast.id).then(response => {
      const rawEpisodes = response.data
      const episodeList = rawEpisodes.map(episode => {
        return {
          id: episode.id,
          title: episode.title,
          date: episode.date,
          duration: formatTime(episode.milliseconds),
          audioUrl: episode.episode_raw_url
        }
      })
      setEpisodes(episodeList)
    })
  }, [setEpisodes, podcast])


  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button 
        onClick={handleBack}
        className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Back to Podcasts
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold">{podcast.title}</h2>
          <p className="mt-2 text-gray-600">{podcast.description}</p>
        </div>
        
        <div className="p-6 pt-0">
          <h3 className="text-lg font-semibold mb-2">Latest Episodes</h3>
          <div className="space-y-2">
            {episodes.map((episode) => (
              <div 
                key={episode.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex-grow">
                  <h4 className="font-medium">{decode(episode.title)}</h4>
                  <p className="text-sm text-gray-600">
                    {episode.date} • {episode.duration}
                  </p>
                  
                  {currentEpisode?.id === episode.id && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-sm text-gray-500 flex justify-between">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => togglePlayPause(episode)}
                  className="p-2 rounded-full hover:bg-gray-200 ml-4"
                >
                  {isPlaying && currentEpisode?.id === episode.id ? 
                    <Pause className="w-6 h-6" /> : 
                    <Play className="w-6 h-6" />
                  }
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentEpisode?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}