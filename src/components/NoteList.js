import React, { useContext } from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContexts';

function NoteList({notes}) {
    const { locale } = useContext(LocaleContext);

    if(!notes.length) {
        return (
            <div className="notes-list-empty">
                <p>{locale === 'id' ? 'Catatan tidak ditemukan' : 'Notes couldn\'t find'}</p>
            </div>
        );
    }
    
    return (
        <div className="notes-list">
            {
                notes.map((note) => (
                    <NoteItem key={note.id} {...note}/>
                ))
            }
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default NoteList;