import {useState, useEffect} from 'react';
import './index.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebaseConfig';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const Card = ({title, author, content, date}) => {
    return (
        <div className="rounded-lg p-4 box-border mt-5 w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 bg-slate-100 text-black hover:bg-slate-50 shadow-md hover:drop-shadow-xl">
            <h1 className="text-lg font-bold mb-5 block">
                {title}
            </h1>
            <p className="text-gray-700">
                {content}
            </p>
            <div className="flex  text-xs right-5 justify-end block text-gray-500">
                <p className="ml-5">@{`${author}  ${date}`}</p>
            </div>
        </div>
    )
}


function App(props) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [data, setData] = useState([]);
    const current = new Date();
    const currentOffset = current.getTimezoneOffset();
    const {
        user,
        signOut,
        signInWithGoogle,
    } = props;
    const handleSubmit = () => {
        if(title !== "" && content !== "" && user){
            const today = new Date(current.getTime() + (330 + currentOffset)*60000);
            let dat = [];
            dat.push(...data)
            let cont = {
                title: title,
                content: content,
                author: author,
                date: `${today.toLocaleTimeString()} ${today.toLocaleDateString()}`
            }
            dat.push(cont)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title,  content: content, author: author})
            };
            fetch("https://3c8eql.deta.dev/store", requestOptions).then(resp => {
            }).then(() => {
                setContent("");
                setTitle("");
                setAuthor("");
            })
            setData(dat);
        }else if(!user){
            alert("Please login!")
        }
    }
    useEffect(() => {
        fetch("https://3c8eql.deta.dev/get").then(res => res.json()).then(json => {
            setData(json.resp);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [null])
    return (
        <div>
            <nav className={"rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"}>
                <div className="flex flex-wrap justify-between items-left mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <a href='https://my-public-diary.netlify.app'>
                        <h1 className={"text-3xl font-bold"}>My Public Diary</h1>
                    </a>
                    <div className="flex items-center">
                        {user ? <button onClick={signOut} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign out</button> : <button onClick={signInWithGoogle} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign in</button>}
                    </div>
                </div>
            </nav>
            <div>
                <div className="sm:container lg:w-3/5 md:w-3/5 sm:w-3/5 mx-3 sm:mx-auto">
                    <div className="mt-10 mb-5 flex flex-col  space-y-4  justify-items-center">
                        {user ? <input className="border-solid border-2 py-2 px-3 rounded border-gray-600" onChange={(e) => {
                            setAuthor(user.displayName);
                            console.log(author)
                        }} value={user.displayName} type="text" placeholder={"author"}/> : <input className="border-solid border-2 py-2 px-3 rounded border-gray-600" onChange={(e) => {
                            setAuthor(user.displayName);
                            console.log(author)
                        }} value={author} type="text" placeholder={"author"}/>}
                        <input className="border-solid border-2 py-2 px-3 rounded border-gray-600" onChange={(e) => {setTitle(e.target.value)}} value={title} type="text" placeholder={"Title"}/>
                        <textarea className="border-solid pt-5 border-2 py-4 px-3 rounded border-gray-600" onChange={(e) => {setContent(e.target.value)}} value={content} type="text" placeholder={"what did you do today?"}/>
                        <button onClick={() => {
                            handleSubmit()
                        }} className="bg-black  place-self-center w-2/3 text-white p-2 rounded hover:bg-gray-700">Submit</button>
                        
                    </div>
                    { user ? <div className="flex mt-20 flex-col-reverse items-center">
                        {data.map(blogs => {
                            let today = new Date(blogs.date)
                            let resp_date = `${today.toLocaleTimeString()} ${today.toLocaleDateString()}`
                            return (resp_date === "Invalid Date Invalid Date") ?
                                <Card title={blogs.title} content={blogs.content} author={blogs.author}
                                      date={blogs.date}/> :
                                <Card title={blogs.title} content={blogs.content} author={blogs.author}
                                      date={resp_date}/>
                        })}
                    </div> : <h1>Please Login to see the contents</h1>}

                   
                </div>
            </div>
        </div>

    );
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(App);
