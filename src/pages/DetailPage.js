import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import NoteDetail from '../components/NoteDetail';
import DeleteNote from '../components/DeleteNote';
import ArchivedNote from '../components/ArchivedNote';
import PageNotFound from './404Pages';

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetailNote() {
            const { data } = await getNote(id);
            setInterval(() => {
                setNote(data);
                setLoading(false);
            }, 3000);
        }

        fetchDetailNote();
    },[id]);

    async function onDeleteHandler(id) {
        await deleteNote(id);
        navigate('/');
    }

    async function onArchivedHandler(id) {
        await archiveNote(id)
        navigate('/');
    }

    async function onUnarchicedHandler(id) {
        await unarchiveNote(id);
        navigate('/');
    }

    if(loading) {
        return (
            <div className='loading-page'>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        note === null ?
        <PageNotFound/> :
        <section>
            <NoteDetail {...note}/>
            <div className="detail-page__action">
                {
                    note.archived === true ? 
                    <ArchivedNote id={id} onArchive={onUnarchicedHandler} text="Aktifkan"/> :
                    <ArchivedNote id={id} onArchive={onArchivedHandler} text="Arsipkan"/>
                }
                <DeleteNote id={id} onDelete={onDeleteHandler}/>
            </div>
        </section>
    );
}

export default DetailPage;