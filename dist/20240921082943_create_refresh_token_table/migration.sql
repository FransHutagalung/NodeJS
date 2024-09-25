-- CreateTable
CREATE TABLE "RefrehToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefrehToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefrehToken" ADD CONSTRAINT "RefrehToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
