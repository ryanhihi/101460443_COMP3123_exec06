const noteModel = require('../models/NotesModel.js');

// TODO - Create a new Note
// http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'MEDIUM',
        dateAdded: Date.now(),
        dateUpdated: Date.now()
    });

    // Save the note
    try {
        await note.save();
        console.log('Note saved successfully');
        res.status(201).send(note); // Respond with the saved note
    } catch (err) {
        console.error('Error saving note:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// TODO - Retrieve all Notes
// http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    // Retrieve all notes
    try {
        const fetchedNotes = await noteModel.find();
        res.json(fetchedNotes);
    } catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// TODO - Retrieve a single Note with noteId
// http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    // Retrieve note by ID
    try {
        const noteId = req.params.noteId;
        const fetchedNote = await noteModel.findById(noteId);

        if (!fetchedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(fetchedNote); // Respond with the fetched note as JSON
    } catch (err) {
        console.error('Error fetching note:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// TODO - Update a Note with noteId
// http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if (!req.body.noteTitle && !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title or description must be provided to update"
        });
    }

    // Update the note
    try {
        const noteId = req.params.noteId;
        const updatedNote = await noteModel.findByIdAndUpdate(noteId, {
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority || 'MEDIUM', // optional field
            dateUpdated: Date.now(),
        }, { new: true });

        if (!updatedNote) {
            return res.status(404).send("No Note Found");
        }

        res.status(200).send(updatedNote);
        console.log("Note has been updated");
    } catch (err) {
        console.error('Error updating note:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// TODO - Delete a Note with noteId
// http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    // Delete the note
    try {
        const noteId = req.params.noteId;
        const deletedNote = await noteModel.findByIdAndDelete(noteId);
        
        if (!deletedNote) {
            return res.status(404).send("No Note Found");
        }

        res.status(200).send();
        console.log("The Note has been deleted");
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
