-- CreateTable
CREATE TABLE "TreePhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "treeRecordId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TreePhoto_treeRecordId_fkey" FOREIGN KEY ("treeRecordId") REFERENCES "TreeRecord" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreeAudioNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "treeRecordId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "rawTranscription" TEXT,
    "cleanedTranscription" TEXT,
    "durationSeconds" REAL,
    "status" TEXT NOT NULL DEFAULT 'uploading',
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TreeAudioNote_treeRecordId_fkey" FOREIGN KEY ("treeRecordId") REFERENCES "TreeRecord" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
