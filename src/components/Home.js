import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

function Home() {

    let baseUrl = "https://route-egypt-api.herokuapp.com/";
    const [allnotes, setAllnotes] = useState([]);
    let token = localStorage.getItem("notesToken");
    let decoded = jwt_decode(token);
    const [notes, setNotes] = useState({
        title: "",
        desc: "",
        userID: decoded._id,
        token
    });


    const [noteID, setNoteID] = useState("");
    const [updateNoteID, setUpdateNoteID] = useState("");

    const [updatedNote, setUpdatedNote] = useState({
        title: "",
        desc: "",
        NoteID: updateNoteID,
        token
    });
    const [getNotesLoading, setgetNotesLoading] = useState(false);

    const getAllNotes = async () => {
        setgetNotesLoading(true);
        let { data } = await axios.get(baseUrl + "getUserNotes", {
            headers: {
                token,
                userID: decoded._id
            }
        })
        if(data.message === "success"){
            setgetNotesLoading(false);
            setAllnotes(data.Notes);
        }
        
    }

    useEffect(() => {

        getAllNotes();
        // eslint-disable-next-line
    }, []);

    const deleteNote = async () => {
        setgetNotesLoading(true)
        let { data } = await axios.delete(baseUrl + "deleteNote", {
            data: {
                NoteID: noteID,
                token
            }
        })
        if (data.message === "deleted") {
            getAllNotes();
        }
    }

    const getId = (id) => {
        setNoteID(id);
    }

    const getNote = ({ target }) => {
        setNotes({ ...notes, [target.name]: target.value })
    }

    const addNote = async (e) => {
        e.preventDefault();
        let { data } = await axios.post(baseUrl + "addNote", notes);
        if (data.message === "success") {
            getAllNotes();
        }
    }

    const getUpdateId = (id, title, desc) => {
        setUpdateNoteID(id);
        document.getElementById("updateInput1").value = title;
        document.getElementById("updateInput2").value = desc;
    }
    const getUpdateNote = ({ target }) => {
        setUpdatedNote({ ...updatedNote, [target.name]: target.value, NoteID: updateNoteID });
    }

    const updateNote = async (e) => {
        e.preventDefault();
        let { data } = await axios.put(baseUrl + "updateNote", updatedNote);
        if (data.message === "updated") {
            getAllNotes();
        }
    }

    return (
        <div className="home">
            <div className="container my-5">
                <div className="col-md-12 m-auto text-end ">
                    <a href="d" className="add btn-primary p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle" ></i> Add
                        New</a>
                </div>
            </div>



            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={addNote}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-end justify-content-end">
                                <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input placeholder="Type Title" name="title" id="daddadad" className="form-control" type="text" onChange={getNote} />
                                <textarea className="form-control my-2" placeholder="Type your note" name="desc" onChange={getNote} id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-info" data-bs-dismiss="modal"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="modal fade" id="updatemodal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={updateNote}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header text-end justify-content-end">
                                <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input placeholder="Type Title" name="title" id="updateInput1" className="form-control" type="text" onChange={getUpdateNote} />
                                <textarea className="form-control my-2" placeholder="Type your note" name="desc" onChange={getUpdateNote} id="updateInput2" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-info" data-bs-dismiss="modal"><i className="fas fa-plus-circle"></i> Update Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            {/* ----------- */}


            <div className="modal fade" id="deletemodal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are u sure?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteNote}>yes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------- */}


            <div className="container">
                <div className="row">
                    {
                        getNotesLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div>: "" 
                    }
                    {
                        allnotes && allnotes.map((note, idx) => {
                            return (
                                <div className="col-md-4 my-3" key={note._id}>

                                    <div className="note p-4 bg-white">
                                        <h3 className="float-start">{note.title} </h3>
                                        <i className="fas fa-edit float-end edit text-info" data-bs-toggle="modal" data-bs-target="#updatemodal" onClick={() => getUpdateId(note._id, note.title, note.desc)}></i>
                                        <i onClick={() => getId(note._id)} data-bs-toggle="modal" data-bs-target="#deletemodal" className="fas fa-trash-alt float-end px-3 del text-danger " ></i>
                                        <span className="clearfix"></span>
                                        <p> {note.desc} </p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Home
