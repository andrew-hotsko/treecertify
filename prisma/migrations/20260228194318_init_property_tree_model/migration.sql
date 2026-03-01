-- CreateTable
CREATE TABLE "Arborist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isaCertificationNum" TEXT NOT NULL,
    "isaExpirationDate" DATETIME NOT NULL,
    "companyName" TEXT,
    "phone" TEXT,
    "citiesServed" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arboristId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'CA',
    "zip" TEXT,
    "county" TEXT NOT NULL DEFAULT 'San Mateo',
    "parcelNumber" TEXT,
    "lat" REAL,
    "lng" REAL,
    "lotSizeSqft" REAL,
    "homeownerName" TEXT,
    "homeownerEmail" TEXT,
    "homeownerPhone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Property_arboristId_fkey" FOREIGN KEY ("arboristId") REFERENCES "Arborist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreeRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "treeNumber" INTEGER NOT NULL,
    "pinLat" REAL,
    "pinLng" REAL,
    "speciesCommon" TEXT NOT NULL DEFAULT '',
    "speciesScientific" TEXT NOT NULL DEFAULT '',
    "dbhInches" REAL NOT NULL DEFAULT 0,
    "heightFt" REAL,
    "canopySpreadFt" REAL,
    "conditionRating" INTEGER NOT NULL DEFAULT 0,
    "healthNotes" TEXT,
    "structuralNotes" TEXT,
    "isProtected" BOOLEAN NOT NULL DEFAULT false,
    "protectionReason" TEXT,
    "recommendedAction" TEXT NOT NULL DEFAULT 'retain',
    "mitigationRequired" TEXT,
    "photos" TEXT NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TreeRecord_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MunicipalOrdinance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cityName" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'CA',
    "protectedSpecies" TEXT NOT NULL DEFAULT '[]',
    "defaultDbhThresholdNative" REAL,
    "defaultDbhThresholdNonnative" REAL,
    "certifierRequirement" TEXT,
    "mitigationRules" TEXT NOT NULL DEFAULT '{}',
    "heritageTreeRules" TEXT NOT NULL DEFAULT '{}',
    "permitProcessNotes" TEXT,
    "ordinanceUrl" TEXT,
    "codeReference" TEXT,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "arboristId" TEXT NOT NULL,
    "reportType" TEXT NOT NULL,
    "aiDraftContent" TEXT,
    "finalContent" TEXT,
    "citySections" TEXT NOT NULL DEFAULT '{}',
    "eSignatureText" TEXT,
    "certifiedAt" DATETIME,
    "pdfUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Report_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_arboristId_fkey" FOREIGN KEY ("arboristId") REFERENCES "Arborist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Arborist_email_key" ON "Arborist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MunicipalOrdinance_cityName_key" ON "MunicipalOrdinance"("cityName");
