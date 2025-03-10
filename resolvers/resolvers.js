import fakeDdata from '../fakeData/index.js'
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';

export const resolvers = {
    Query: {
        authors: async () => await AuthorModel.find(),
        folders: async () => {
            const folders = await FolderModel.find();

            return folders
        },
        folder: async (parent, agrs) => {
            const folderId = agrs.folderId;
            const folder = await FolderModel.findOne({ _id: folderId });

            return folder
        },
        note: async (parent, agrs) => {
            const noteId = agrs.noteId;
            const note = await NoteModel.find({ id: noteId });

            return note
        }
    },
    Folder: {
        author: async (parent, agrs) => {
            const authorId = parent.authorId
            const author = await AuthorModel.find(author => author.id == authorId)
            return author
        },
        note: (parent, agrs) => {
            const folderId = parent.id
            return fakeDdata.notes.filter(note => note.folderId === folderId)
        }
    },

    Mutation: {
        addFolder: async (parent, agrs) => {
            const newfolder = new FolderModel({ ...agrs, authorId: '123' });
            await newfolder.save();
            return newfolder;
        }
    }
};