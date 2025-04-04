import { useState } from "react";

function App() {
    const [value, setValue] = useState("");
    const [url, setUrl] = useState("");

    const handleChange = (e: any) => {
        setValue(e.target.value)
    }

    const keyHandle = (e: any) => {
        if (e.key === "Enter") {
            post();
            setValue("");
        }
    }

    const copy = () => {
        navigator.clipboard.writeText(url);
    }

    function post() {
        fetch("http://localhost:3333", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: value
            })
        })
            .then(response => response.json())
            .then(data => setUrl(data.shortUrl))
            .catch(err => console.log(err));
    }

    return (
        <main className="h-screen flex justify-center items-center bg-zinc-300 text-zinc-700 flex-col">
            <h1 className="text-[5em]">Shortner Url</h1>

            <div className="w-120 h-15 my-15 bg-zinc-200 rounded-lg shadow-xl">
                <input 
                        className="h-15 w-120 px-4 text-[1.2em] outline-none" 
                        type="text" 
                        placeholder="https://url.com"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={keyHandle}
                    />
            </div>

            <div className="flex items-center justify-between">
                <a className="text-[1.2em] cursor-pointer mx-10">{url}</a>
                <button onClick={copy} className="w-15 h-10 rounded-lg text-zinc-300 hover:text-zinc-700 hover:bg-zinc-200">copy</button>
            </div>

        </main>
    )
}

export default App
