import fakeDdata from '../fakeData/index.js'

export const resolvers = {
    Query: {
        authors: () => fakeDdata.authors,
        folders: () => fakeDdata.folders,
        folder: (parent, agrs) => {
            const folderId = agrs.folderId
            return fakeDdata.folders.find(folder => folder.id == folderId)
        },
        note: (parent, agrs) => {
            const noteId = agrs.noteId
            return fakeDdata.notes.find(note => note.id == noteId)
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