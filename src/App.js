
import './index.css';

function App() {
    return (
        <div>
            <nav className={"rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"}>
                <h1 className={"text-3xl font-bold underline"}>My Public Diary</h1>
            </nav>
            <div>
                <div className="md:container lg:w-50 md:mx-auto">
                    <div className="mt-10 mb-5 flex flex-row space-x-4">
                        <input className="" type="text" placeholder={"what did you do today?"}/>
                        <button className="bg-black text-white p-2 rounded hover:bg-gray-700">Submit</button>
                    </div>
                    <div className="flex flex-col">
                        <div className="rounded-lg p-4 box-border md:box-content w-100 md:w-100 lg:w-50 bg-slate-700 text-white hover:bg-slate-500">
                            <h1 className="text-lg inline-block">
                                Title
                            </h1>
                            <p className="text-amber-50">
                                Hello world
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
