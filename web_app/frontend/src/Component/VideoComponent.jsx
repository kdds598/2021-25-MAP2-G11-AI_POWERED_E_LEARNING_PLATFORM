import { useEffect, useState,useRef,useLayoutEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import styles from "../Styles/VideoComponent.module.css"; // Import CSS module

const VideoPlayer = () => {
    const navigate = useNavigate()
    const { videoId, courseId } = useParams(); // Get video & course ID from URL
    const [video, setVideo] = useState(null);
    const [course, setCourse] = useState(null);
    const [coursevideos, setCoursevideos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [transcript,setTranscript]=useState(null)
    const [transcriptLoading,setTranscriptLoading]=useState(true)
    const [sDiv, setsDiv] = useState('playlist');
    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    const [quizData, setQuizData] = useState(null);
    const [quizLoading, setQuizLoading] = useState(false);


    const move = () => {
        if(quizData!==null){
            navigate('/quiz', { state: { status: quizData } });
        }
        else{
            return ;
        }

    }


    useLayoutEffect(() => {
        const updateDimensions = () => {
  
          setPageWidth(window.innerWidth);
        };
      
        updateDimensions(); // Set dimensions immediately
      
        window.addEventListener("load", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
      }, []);
    useEffect(() => {
        const fetchVideoAndCourse = async () => {
            try {
                setLoading(true);
    
                // Fetch Video Data
                const videoRes = await fetch(`http://localhost:5000/api/videos/id/${videoId}`);
                if (!videoRes.ok) throw new Error("Failed to fetch video data");
                const videoData = await videoRes.json();
    
                // Fetch Course Data
                const courseRes = await fetch(`http://localhost:5000/api/courses/id/${courseId}`);
                if (!courseRes.ok) throw new Error("Failed to fetch course data");
                const courseData = await courseRes.json();
    
                // Fetch Course Videos
                const videosRes = await fetch(`http://localhost:5000/api/videos/courseid/${courseId}`);
                if (!videosRes.ok) throw new Error("Failed to fetch course videos");
                const videosData = await videosRes.json();
    
                setCoursevideos(videosData.videos);
                setVideo(videoData.video);
                setCourse(courseData.course);
    
                if (videoData.video?.videoUrl) {
                    setLoading(false);

                    await uploadData(videoData.video.videoUrl);
                }
    
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
            }
        };
    
        const uploadData = async (videoUrl) => {

            setTranscriptLoading(true)


            const hasUploaded = sessionStorage.getItem(`transcript_${videoId}`);
            setTranscript(hasUploaded)
            
            if(hasUploaded){
                setTranscriptLoading(false)  

            return;
            }


            try {
                const response = await fetch("http://127.0.0.1:8000/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ video_url: videoUrl }),
                    mode: "cors", // Enable cross-origin requests

                });
    
                if (!response.ok) throw new Error("Upload failed");
    
                const result = await response.json();
                setTranscript(result.transcript)

                sessionStorage.setItem(`transcript_${videoId}`, result.transcript);

                
                
            } catch (error) {
                console.error("Error uploading video URL:", error);
            }finally{
                setTranscriptLoading(false)
            }
        };
    
        fetchVideoAndCourse();
    }, [videoId, courseId]); // Removed selectedFile as it's no longer needed
    


    // quiz data
    const loadQuiz = async () => {
         if(quizData!==null){
            navigate('/quiz', { state: { status: quizData } });
            return;
        }

        setQuizLoading(true)
        try {
            const response = await fetch(`http://127.0.0.1:8000/quiz/`);
            if (!response.ok) throw new Error("Failed to fetch quiz data");     
            const data = await response.json();


            setQuizData(data);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
                }
                finally{
                    setQuizLoading(false)

                }
    };
        
        
        
        
    if (loading) return <div className={styles.loader}>Loading...</div>;

    return (
        <div style={{background:"#f8f9fa"}}>
       <div className={styles.pageContainer}>
 

                    <div 
                     className={styles.container}>
                        {/* Video Section */}
                        <div 
                         className={styles.videoSection}>
                            <video controls poster={video.thumbnail}>
                                <source src={video.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                 
                         
                        </div>
                        {
                    
                    pageWidth<=1024 &&
                    <div className={styles.videoDetails} 
                    style={{width:"100%"}}
                    // style={{}}



                    >
                                <h2>{video.title}</h2>
                                <p>{video.description}</p>
                                {
                                }
                                <div className={styles.buttons}>
                                <button className={styles.btn} onClick={()=>setsDiv('transcript')} disabled={transcriptLoading} >{transcriptLoading?"Generating...":"Generate Transcript"}</button>
                                <button className={styles.btn} onClick={()=>setsDiv('chat')} disabled={transcriptLoading}>{transcriptLoading?"Loading...":"Chatboat"}</button>
                                <button className={styles.btn} onClick={()=>{loadQuiz() 
                                move()            
                                }
                                } disabled={quizLoading}> {quizLoading?"fetching...":"take quiz"}</button>
                                
                                </div>
                            </div>}

        
                        <div className={styles.playlist} 
                       >
                           
                          
                           { sDiv==='playlist' && (<><h3 >Playlist</h3>
                            
                            <hr/>
                            {coursevideos.filter(v => v._id !== videoId).map((v) => (
                                <Link key={v._id} to={`/video/${courseId}/${v._id}`} className={styles.playlistItem}>
                                    <img src={v.thumbnail} alt={v.title} />
                                    <p>{v.title}</p>
                                </Link>
                            ))}</> )
                            }
                            {sDiv==='transcript' && (
                                <div style={{height:pageWidth<1023?"300px":"100%",padding:"10px"}} className={styles.transcript}>
                                    <div
                                    style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}
                                    ><h3>Transcript</h3><span onClick={()=>setsDiv('playlist')} style={{backgroundColor:"red",color:"white",padding:"0px 3px",borderRadius:"2px",justifySelf:"center"}}>x</span></div>
                                    <hr/>
                                    
                                    {sessionStorage.getItem(`transcript_${videoId}`)===null?
                                    ( <div style={{textAlign:"center"}}>Transcript not available</div>)
                                    :
                                    (transcriptLoading?(<div>Loading...</div>):<TranscriptPlayer transcriptText={sessionStorage.getItem(`transcript_${videoId}`)} />)}
                                  
                                  
                                </div>
                            )}

                            {
                                sDiv==='chat' && (<>
                                    <div
                                    style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}
                                    ><h3>Chatboat</h3><span onClick={()=>setsDiv('playlist')} style={{backgroundColor:"red",color:"white",padding:"0px 3px",borderRadius:"2px",justifySelf:"center"}}>x</span></div>

                                    <Chatbot/>
                                  
                                    </>)
                            }



                        </div>
                    </div>
                  
                </div>   {
                    
                    pageWidth>1024 &&
                    <div className={styles.videoDetails} 
                    style={{marginBottom:"20px"}}

                    >
                                <h2>{video.title}</h2>
                                <p>{video.description}</p>
                                {
                                }
                                <div className={styles.buttons}>
                                <button className={styles.btn} onClick={()=>setsDiv('transcript')} disabled={transcriptLoading} >{transcriptLoading?"Generating...":"Generate Transcript"}</button>
                                <button className={styles.btn}onClick={()=>setsDiv('chat')} disabled={transcriptLoading}>{transcriptLoading?"Loading...":"Chatboat"}</button>
                                <button className={styles.btn} onClick={()=>{loadQuiz() }
                                } disabled={quizLoading}> {quizLoading?"fetching...":"take quiz"}</button>
                                </div>
                            </div>}


                </div>
    );
};

export default VideoPlayer;



//trancsript
import React from "react";
import Chatbot from "./Chatbot";

const parseTranscript = (raw) => {
  const entries = raw.split("||").map((line) => {
    const [time, ...textParts] = line.trim().split(": ");
    const text = textParts.join(": ");
    const [start, end] = time.split(" --> ").map((t) => t.trim());
    return { start, end, text };
  });
  return entries;
};

const formatTime = (timestamp) => {
  const [h, m, s] = timestamp.split(":");
  const totalSeconds = parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  return totalSeconds;
};

export const TranscriptPlayer = ({ transcriptText }) => {
  const transcript = parseTranscript(transcriptText);

  return (
    <div>
      <ul >
        {transcript.map(({ start, end, text }, idx) => (
          <li key={idx} >
            
            <div><span style={{color: "#3ea6ff",backgroundColor: "#def1ff",padding:"1px",borderRadius:"6px"}}>{start}</span> {text}</div>
            <hr/>
          </li>
        ))}
      </ul>
    </div>
  );
};

