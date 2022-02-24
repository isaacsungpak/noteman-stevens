{
    session: {
        user: {
            id: 1,
            username: "some_username",
            email: "user@example.io"
        }
    },
    notes: {
        entities: {
            notes: {
                2: {
                    id: 2,
                    title: "note title",
                    content: "wow this is a note",
                    userId: 1,
                    notebook_id: 7,
                    createdAt: date,
                    updatedAt: date,
                    user: {
                        id: 1,
                        username: "some_username",
                        email: "user@example.io"
                    }
                },
                5: {
                    id: 5,
                    title: "also note title",
                    content: "wow this is also a note",
                    userId: 1,
                    notebook_id: 8,
                    createdAt: date,
                    updatedAt: date,
                    user: {
                        id: 1,
                        username: "some_username",
                        email: "user@example.io"
                    }
                }
            },
            noteTags: {
                2: {
                    1: {
                        noteId: 2,
                        tagId: 1
                        createdAt: datetime,
                        updatedAt: datetime
                    }
                }
            }
        }
    },
    notebooks: {
        notebooks: {
            7: {
                id: 7,
                title: "notebook title",
                userId: 1,
                createdAt: datetime,
                updatedAt: datetime,
                user: {
                    id: 1,
                    username: "some_username",
                    email: "user@example.io"
                }
            },
            8: {
                id: 8,
                title: "notebook title 2",
                userId: 1,
                createdAt: datetime,
                updatedAt: datetime,
                user: {
                    id: 1,
                    username: "some_username",
                    email: "user@example.io"
                }
            }
        }
    },
    tags: {
        tags: {
            1: {
                id: 1
                title: "example tag",
                userId: 1,
                createdAt: datetime,
                updatedAt: datetime,
                user: {
                    id: 1,
                    username: "some_username",
                    email: "user@example.io"
                }
            }
        }
    }
}
