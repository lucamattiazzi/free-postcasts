/* eslint-disable react-hooks/exhaustive-deps */
import { Info } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Modal } from './Modal'
import { Podcast } from './Podcast'
import { PodcastButton } from './PodcastButton'
import { getConfig } from './utils'

export const App = () => {
  const [selectedPodcast, setSelectedPodcast] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState(null)
  const [podcasts, setPodcasts] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const audioRef = useRef(null)

  const handlePodcastClick = (podcast) => setSelectedPodcast(podcast)

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setSelectedPodcast(null)
    setCurrentEpisode(null)
    setIsPlaying(false)
  }

  const togglePlayPause = (episode) => {
    if (currentEpisode?.id === episode.id) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setCurrentEpisode(episode)
      setIsPlaying(true)
      setTimeout(() => {
        audioRef.current.play()
      }, 100)
    }
  }

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime)

  const handleLoadedMetadata = () => setDuration(audioRef.current.duration)

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
  }


  useEffect(() => {
    getConfig().then(config => {
      const rawPodcasts = config.config.PodcastParameters
      const podcastList = Object.entries(rawPodcasts).map(([id, podcast]) => {
        return {
          id,
          title: podcast.title,
        }
      })
      setPodcasts(podcastList)
    })
  }, [setPodcasts])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])


  const content = selectedPodcast ?
    <Podcast
      podcast={selectedPodcast}
      handleBack={handleBack}
      togglePlayPause={togglePlayPause}
      isPlaying={isPlaying}
      currentEpisode={currentEpisode}
      audioRef={audioRef}
      handleSliderChange={handleSliderChange}
      handleTimeUpdate={handleTimeUpdate}
      handleLoadedMetadata={handleLoadedMetadata}
      currentTime={currentTime}
      duration={duration}
      setIsPlaying={setIsPlaying}
    /> :
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">I podcast de Il Post gratuiti finchè non mettono a posto i loro server</h1>
      <div className="grid gap-4">
        {podcasts.map((podcast) => (
          <PodcastButton podcast={podcast} handlePodcastClick={handlePodcastClick} key={podcast.id}/>
        ))}
      </div>
    </div>

  return (
    <>
      {content}
      <button
        onClick={() => setModalOpen(true)}
        className="absolute top-0 right-0 p-4 rounded-full hover:bg-gray-200"
      >
        <Info className="w-12 h-12 text-gray-600" />
      </button>
      { modalOpen && <Modal onClose={() => setModalOpen(false)} /> }
    </>
  )
}