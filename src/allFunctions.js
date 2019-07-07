export const countNotesForFolders = (notes, folderId) => {
  return notes.filter(note => note.folderId === folderId).length;
};

export const getNotesForFolder = (notes, folderId) => {
  return !folderId ? notes : notes.filter(note => note.folderId === folderId);
};

export const findNote = (notes, noteId) => {
  return notes.find(note => note.id === noteId);
};
