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
            const folders = await FolderModel.find();

            return folders.find(folder => folder.id == folderId)
        },
        note: async (parent, agrs) => {
            const noteId = agrs.noteId;
            const notes = await NoteModel.find();

            return notes.find(note => note.id == noteId)
        }
    },
    Folder: {
        author: (parent, agrs) => {
            const authorId = parent.authorId
            return fakeDdata.authors.find(author => author.id == authorId)
        },
        note: (parent, agrs) => {
            return fakeDdata.notes.filter(note => note.folderId === parent.id)
        }
    },

};