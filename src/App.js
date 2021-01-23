import React, {useState, useEffect} from 'react';
import './App.css';


function App() {
    const [value, setValue] = useState('');
    const [albums, setAlbums] = useState([]);
    const [selectedAlbums, setSelectedAlbums] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(res => res.json())
            .then(res => (setAlbums(res)))
    }, [])


    function handleChange(e) {
        const value = e.target.value
        setValue(value)
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + value)
            .then(res => res.json())
            .then(res => setSelectedAlbums(res))
    }


    return (
        <div className="App">
            <h1>Select an album:</h1>
            <form>
                <select value={value} onChange={handleChange}>
                    <option>Please select</option>

                    {albums.map((album) => {
                        return <option key={album.id} value={album.id}>{album.title}</option>
                    })}
                </select>
            </form>
            <div className="img">
                <div className="container">{selectedAlbums.map((img, index) => (
                    <div key={index}>
                        <img src={img.url} alt={img.title}/>
                    </div>

                ))}</div>
            </div>
        </div>
    );


}

export default App;
