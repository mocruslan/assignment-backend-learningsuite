-- CreateTable
CREATE TABLE "Item"
(
    "id"        SERIAL       NOT NULL,
    "name"      TEXT         NOT NULL,
    "done"      BOOLEAN      NOT NULL DEFAULT false,
    "columnId"  INTEGER      NOT NULL,
    "index"     INTEGER      NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Column"
(
    "id"        SERIAL       NOT NULL,
    "name"      TEXT         NOT NULL,
    "index"     INTEGER      NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item"
    ADD CONSTRAINT "Item_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
