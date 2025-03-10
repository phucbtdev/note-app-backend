export const typeDefs = `#graphql
    type Folder {
        id: String,
        name: String,
        createdAt: String,
        author: Author
        note: [Note]
    }

    type Author {
        id: String,
        name: String,
    }

    type Note{
        id: String,
        content: String,
    }

    type Query {
        authors:[Author],
        folders: [Folder],
        folder(folderId: String): Folder,
        note(noteId: String): Note
    }
`;