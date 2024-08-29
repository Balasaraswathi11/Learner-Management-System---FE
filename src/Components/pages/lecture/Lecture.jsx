import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../../../main'
import Loadingpg from '../../loading/Loadingpg'
import axios from 'axios'
import "./lecture.css"
import toast from 'react-hot-toast'
import { TiTick } from "react-icons/ti";
import Quiz from '../../Quiz/Quiz'
const Lecture = ({user}) => {
    const[lectures,setLectures]=useState([])
    const[lecture,setLecture]=useState([])
    const[loading,setLoading]=useState(true)
    const[lecloading,setlecloading]=useState(false)
    const [show,setShow]=useState(false)
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[video,setVideo]=useState("")
    const[videoPrev,setVideoprev]=useState("")
    const[btnLoading,setBtnLoading]=useState(false)
    
const params=useParams()


//fetching all lectures
async function fetchlectures() {
try {
    setlecloading(true);
       const {data}=await axios.get(`${server}/api/course/fetchlectures/${params.id}`,{
    
        headers:{
            token:localStorage.getItem("token") 
        },

    }
       )
   setLectures(data.lectures)
   setLoading(false)
            
        
} catch (error) {
    console.log(error)
    setLoading(false)
}}

//fetch a lecture by id 
async function fetchAlecture(id){
    setlecloading(true)
    try {
        const {data}=await axios.get(`${server}/api/course/fetchalecture/${id}`,
            {headers: {
                token:localStorage.getItem("token")
            }}
        )
        setLecture(data.lecture)
        setlecloading(false)
    } catch (error) {
        console.log(error)
        setlecloading(false)
    }
}

const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete the lecture?")) {
        try {
            const { data } = await axios.delete(`${server}/api/admin/lecture/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            toast.success(data.message);
            fetchlectures(); // Refresh the lectures list after deletion
        } catch (error) {
            console.log(error.response.data.message); // Correct error logging
            toast.error(error.response.data.message); // Display error message
        }
    }
};


const [completed, setCompleted] = useState("");
const [completedLec, setCompletedLec] = useState("");
const [lectLength, setLectLength] = useState("");
const [progress, setProgress] = useState([]);

async function fetchProgress(){{
    try {
        const{data}=await axios.get(
            `${server}/api/user/getprogress/${params.id}`,
            {
                headers: {
                    token: localStorage.getItem("token"),}
            },
        )

        setCompleted(data.courseProgressPercentage);
        setCompletedLec(data.completedLectures);
        setLectLength(data.allLectures);
        setProgress(data.progress);
    } catch (error) {
        console.log(error)
    }


}}



const addProgress=async(id)=>{
    try {
        console.log(id)
        const {data}=await axios.post(`${server}/api/user/progress?course=${params.id}&lectureId=${id}`,{},{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        console.log(data.message)
    } catch (error) {
        console.log(error)
    }
}

const submitHandler = async (e) => {
    setBtnLoading(true); // Start loading
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("file", video);

    try {
        const { data } = await axios.post(`${server}/api/admin/course/${params.id}`, form, {
            headers: {
                token: localStorage.getItem('token')
            }
        });

        toast.success(data.message);
        setBtnLoading(false); // Stop loading immediately after success
        setShow(false); // Hide the form
        fetchlectures(); // Refresh the lectures list

        // Reset form fields
        setTitle('');
        setDescription('');
        setVideo('');
        setVideoprev('');

    } catch (error) {
        console.log(error.response.data.message);
        setBtnLoading(false); // Stop loading in case of an error
    }
};


const changeVideoHandler= (e) =>{
const file=e.target.files[0]//selecting the file 
const reader= new FileReader()//js obj that reads the file from the users device asynchronosly
reader.readAsDataURL(file)//using the file in the web directly by reading it as data url
reader.onloadend=()=>{//after  the operation completes show the result
    setVideoprev(reader.result)
    setVideo(file)
}
}



useEffect(()=>
    { fetchlectures()
        fetchProgress();
    },[])



return(
    <>
    {loading? <Loadingpg />:
    (<>
       <div className="progress">
            Lecture completed - {completedLec} out of {lectLength} <br />
            <progress value={completed} max={100}></progress> {completed} %
          </div>
    <div className="lecture-page">
        <div className='left'>
         
        {lecture.video ? (
                    <>
                      <video
                        src={`${server}/${lecture.video}`}
                        width={"100%"}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        onEnded={() => addProgress(lecture._id)}
                      ></video>
                      <h1>{lecture.title}</h1>
                      <h3>{lecture.description}</h3>
                    </>
                  ) : (<>
                    <h1>Please Select a Lecture</h1>
                    
                    </>)}
                
            </div>
            <div className="right">
               
              {user&&user.role==="admin"&& (<button className='common-btn' onClick={()=>setShow(!show)}>{show? "close":"Add lecture"}</button>)}
 {/* //creating form for adding lecture */}
{show &&(
 <div className='lecture-form'>
    <h2>Add lecture</h2>
<form onSubmit={submitHandler}>
<label htmlFor="text">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />

                    <label htmlFor="text">Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />

                    <input
                      type="file"
                      placeholder="choose video"
                      onChange={changeVideoHandler}
                      required
                    />
                    

                    {videoPrev && <video src={videoPrev} width={"300px"} controls />} 

                    
  <button type='submit' disabled={btnLoading} className='common-btn'>
    {btnLoading?"Please wait..":"Add"}
    </button>


</form>

     </div>)}

     {
        lectures && lectures.length>0? 
        lectures.map((e,index)=>
        (<>
          <div
              onClick={() => fetchAlecture(e._id)}
              key={index}
              className={`lecture-number ${lecture._id===e._id && "active"}`}
            >
              {index + 1}.{e.title}{""}{progress[0] &&
                        progress[0].completedLectures.includes(e._id) &&(
                <span>
                    <TiTick />
                </span>
              )}
            </div>

            {user&& user.role==="admin" &&(
       <button className='common-btn' onClick={()=>deleteHandler(e._id)} style={{background:"red"}}>Delete</button>
            )}

        </>)):
        <p>No lectures yet</p>

     }

            </div>
        </div>
      
    
    </>)}
    </>
)
}
export default Lecture