import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg'
import { useEffect, useRef, useState } from 'react'
// const ffmpegCli = createFFmpeg({ corePath: '/ffmpeg-core.js', log: true })

const About = () => {
  const [ready, setReady] = useState(false)
  const [video, setVideo] = useState()
  const [gif, setGif] = useState<string>()

  // 此处是记录了一个ffmpeg的实例
  const ffmpegCli = useRef<FFmpeg | null>(null)

  const loadFFmpeg = async () => {
    if (!ffmpegCli.current) {
      ffmpegCli.current = createFFmpeg({ corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js', log: true })
    }

    if (!ffmpegCli.current.isLoaded()) {
      await ffmpegCli.current.load()
    }

    setReady(true)
  }
  useEffect(() => {
    loadFFmpeg()
    console.log('load')
  }, [])

  const convertToGif = async () => {
    // Write the file to memory
    if (ffmpegCli.current) {
      ffmpegCli.current.FS('writeFile', 'test.mp4', await fetchFile(video))

      // Run the FFMpeg command
      await ffmpegCli.current.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif')

      // Read the result
      const data = ffmpegCli.current.FS('readFile', 'out.gif')

      // Create a URL
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
      setGif(url)
    }
  }

  return (
    <div>
      {/* <Button type="primary" onClick={() => Demo.init()}>
        发送消息
      </Button> */}
      {ready ? (
        <div className="App">
          {video && <video controls width="250" src={URL.createObjectURL(video)}></video>}

          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files)
              console.log(e.target.files?.item(0))
              setVideo(e.target.files?.item(0))
            }}
          />

          <h3>Result</h3>

          <button onClick={convertToGif}>Convert</button>

          {gif && <img src={gif} width="250" />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default About
