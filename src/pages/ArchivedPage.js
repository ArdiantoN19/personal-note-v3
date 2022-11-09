import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getArchivedNotes } from "../utils/api";
import SearchBar from '../components/SearchBar';
import LocaleContext from '../contexts/LocaleContexts';

function ArchivedPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [keyword, setKeyword] = useState(() => {
        return searchParams.get('keyword') || ''
    });
    const [loading, setLoading] = useState(true);
    const { locale } = useContext(LocaleContext);

    useEffect(() => {
        async function fetchNotes() {
            const { data } = await getArchivedNotes();
            setInterval(() => {
                setNotes(data);
                setLoading(false);
            }, 3000);
        }
        fetchNotes();
    },[])

    function onSearchHandler(keyword) {
        setKeyword(keyword);
        setSearchParams({keyword});
    }

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLowerCase());
    })

    if(loading) {
        return (
            <div className='loading-page'>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <section>
            <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archive Notes'}</h2>
            <SearchBar search={keyword} onSearch={onSearchHandler}/>
            <NoteList notes={filteredNotes}/>
        </section>
    )
}

export default ArchivedPage;